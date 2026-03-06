import { inngest } from "@/inngest/client";
import axios from "axios";
import * as cheerio from "cheerio";
import { scrapeProductFromUrl } from "@/lib/scrape-product";

export const scrapeProduct = inngest.createFunction(
  { id: "scrape-product-url" },
  { event: "product/scrape.requested" },
  async ({ event, step }) => {
    const url = event.data.url;
    const product = await step.run("scrape-product", async () => {
      return scrapeProductFromUrl(url);
    });
    await step.run("save-product", async () => {
      console.log("Scraped product (background):", product);
    });
    return { success: true, product };
  },
);

export const generateMarketingKit = inngest.createFunction(
  { id: "generate-marketing-kit" },
  { event: "marketing-kit/generate.requested" },
  async ({ event, step }) => {
    const { product } = event.data;
    await step.run("generate-kit", async () => {
      console.log("Generate marketing kit for product:", product);
      // TODO: your real kit generation (copy, assets, etc.)
    });
    return { success: true };
  },
);
