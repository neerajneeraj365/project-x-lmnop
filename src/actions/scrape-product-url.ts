"use server";

import { scrapeProductFromUrl } from "@/lib/scrape-product";
import { inngest } from "@/inngest/client";

export type ScrapedProductForForm = {
  name: string;
  description: string;
  price: string;
  brand: string;
  images?: string[];
};

export async function scrapeProductUrl(url: string) {
  try {
    const scraped = await scrapeProductFromUrl(url);
    const forForm: ScrapedProductForForm = {
      name: scraped.name || "",
      description: scraped.description || "",
      price: scraped.price || "",
      brand: scraped.brand || "",
      images: scraped.images?.length ? scraped.images : undefined,
    };

    // Trigger Inngest scrape job (background) for your pipeline
    await inngest.send({
      name: "product/scrape.requested",
      data: { url },
    });

    return { success: true as const, product: forForm };
  } catch (error) {
    console.error("Scrape error:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to scrape URL",
    };
  }
}