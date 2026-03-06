import { inngest } from "@/inngest/client";
import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeProduct = inngest.createFunction(
  { id: "scrape-product-url" },
  { event: "product/scrape.requested" },

  async ({ event, step }) => {
    const url = event.data.url;

    const html = await step.run("fetch-page", async () => {
      const res = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        },
        timeout: 10000,
      });

      return res.data;
    });

    const product = await step.run("extract-product-data", async () => {
      const $ = cheerio.load(html);

      let data = {
        name: "",
        description: "",
        price: "",
        currency: "",
        brand: "",
        images: [] as string[],
      };

      // JSON-LD extraction
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const json = JSON.parse($(el).html() || "");

          if (json["@type"] === "Product") {
            data.name = json.name || "";
            data.description = json.description || "";
            data.images = json.image || [];

            if (json.brand) {
              data.brand = json.brand.name || json.brand;
            }

            if (json.offers) {
              data.price = json.offers.price || "";
              data.currency = json.offers.priceCurrency || "";
            }
          }
        } catch {}
      });

      // fallback scraping
      if (!data.name) {
        data.name = $("h1").first().text().trim();
      }

      if (!data.description) {
        data.description = $('meta[name="description"]').attr("content") || "";
      }

      if (!data.price) {
        data.price =
          $('[itemprop="price"]').attr("content") ||
          $(".price").first().text().trim();
      }

      return data;
    });

    // save to database (example)
    await step.run("save-product", async () => {
      console.log("Scraped product:", product);

      // Example:
      // await db.product.create({
      //   data: { ...product }
      // })
    });

    return { success: true, product };
  },
);
