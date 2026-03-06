"use server";

import { inngest } from "@/inngest/client";

export async function startScrape(url: string) {
  await inngest.send({
    name: "product/scrape.requested",
    data: { url },
  });

  return { success: true };
}
