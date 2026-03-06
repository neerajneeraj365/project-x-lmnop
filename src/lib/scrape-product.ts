import axios from "axios";
import * as cheerio from "cheerio";

export type ScrapedProduct = {
  name: string;
  description: string;
  price: string;
  currency: string;
  brand: string;
  images: string[];
};

export async function scrapeProductFromUrl(url: string): Promise<ScrapedProduct> {
  const res = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
    timeout: 10000,
  });

  const $ = cheerio.load(res.data);
  const data: ScrapedProduct = {
    name: "",
    description: "",
    price: "",
    currency: "",
    brand: "",
    images: [],
  };

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || "{}");
      if (json["@type"] === "Product") {
        data.name = json.name || data.name;
        data.description = json.description || data.description;
        data.images = Array.isArray(json.image) ? json.image : json.image ? [json.image] : [];
        if (json.brand) {
          data.brand = typeof json.brand === "object" ? json.brand.name || "" : json.brand;
        }
        if (json.offers) {
          data.price = String(json.offers.price ?? "");
          data.currency = json.offers.priceCurrency || "";
        }
      }
    } catch {}
  });

  if (!data.name) data.name = $("h1").first().text().trim();
  if (!data.description) data.description = $('meta[name="description"]').attr("content") || "";
  if (!data.price) {
    data.price =
      $('[itemprop="price"]').attr("content") ||
      $(".price").first().text().trim() ||
      "";
  }

  return data;
}