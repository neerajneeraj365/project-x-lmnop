"use server";

import { inngest } from "@/inngest/client";

export type ProductForKit = Record<string, unknown>;

export async function generateMarketingKit(product: ProductForKit) {
  try {
    await inngest.send({
      name: "marketing-kit/generate.requested",
      data: { product },
    });
    return { success: true as const };
  } catch (error) {
    console.error("Generate kit error:", error);
    return {
      success: false as const,
      error:
        error instanceof Error ? error.message : "Failed to start generation",
    };
  }
}
