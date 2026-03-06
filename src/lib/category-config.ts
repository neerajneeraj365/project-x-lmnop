import { z } from "zod";
import {
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

// ── Field Types ──────────────────────────────────────────────────────
export type FieldType = "text" | "textarea" | "select" | "multi-select";

export interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

// ── Dynamic Zod Schema Builder ──────────────────────────────────────
// Builds a Zod schema from a category's field config + adds tone field.

// export function buildFormSchema(fields: FieldConfig[]) {
//   const shape: Record<string, z.ZodTypeAny> = {}

//   for (const field of fields) {
//     if (field.type === "multi-select") {
//       const base = z.array(z.string())
//       shape[field.id] = field.required
//         ? base.min(1, { message: `Select at least one ${field.label.toLowerCase()}` })
//         : base.default([])
//     } else {
//       const base = z.string()
//       shape[field.id] = field.required
//         ? base.min(1, { message: `${field.label} is required` })
//         : base.default("")
//     }
//   }

//   // Tone is always required
//   shape.tone = z.string().min(1, { message: "Writing tone is required" })

//   return z.object(shape)
// }

// export type FormValues = Record<string, string | string[]>

// ── Category Definition ──────────────────────────────────────────────
export interface CategoryConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  fields: FieldConfig[];
}

// ── Shared Tones ─────────────────────────────────────────────────────
// export const TONES = ["Professional", "Casual", "Luxurious", "Technical"] as const
// export type Tone = (typeof TONES)[number]

// export const WORD_COUNTS = ["100", "200", "300", "400", "500", "600", "700"] as const
// export type WordCount = (typeof WORD_COUNTS)[number]

// ── Categories ───────────────────────────────────────────────────────
export const CATEGORIES: CategoryConfig[] = [
  {
    id: "fashion",
    label: "Fashion",
    icon: Shirt,
    description: "Clothing, shoes, accessories & apparel",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Silk Midi Dress",
        required: true,
      },
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        options: [
          "Dress",
          "Jacket",
          "Shoes",
          "T-Shirt",
          "Pants",
          "Accessories",
          "Bag",
          "Jewelry",
        ],
        required: true,
      },
      {
        id: "material",
        label: "Material / Fabric",
        type: "text",
        placeholder: "e.g. 100% Mulberry Silk",
      },
      {
        id: "color",
        label: "Color",
        type: "text",
        placeholder: "e.g. Midnight Navy",
      },
      {
        id: "sizeRange",
        label: "Size Range",
        type: "text",
        placeholder: "e.g. XS - XXL",
      },
      {
        id: "targetAudience",
        label: "Target Audience",
        type: "select",
        options: ["Women", "Men", "Kids", "Unisex"],
      },
      {
        id: "keyFeatures",
        label: "Key Features",
        type: "textarea",
        placeholder: "Describe standout features, design details, etc.",
      },
      {
        id: "priceRange",
        label: "Price Range",
        type: "text",
        placeholder: "e.g. $89 - $129",
      },
    ],
  },
  {
    id: "electronics",
    label: "Electronics / Tech",
    icon: Smartphone,
    description: "Gadgets, devices, smart products",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. NovaSound Pro Headphones",
        required: true,
      },
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        options: [
          "Laptop",
          "Phone",
          "Headphones",
          "Tablet",
          "Smartwatch",
          "Camera",
          "Speaker",
          "Accessory",
        ],
        required: true,
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. TechWave",
      },
      {
        id: "keySpecs",
        label: "Key Specifications",
        type: "textarea",
        placeholder: "Processor, RAM, display, storage, etc.",
      },
      {
        id: "connectivity",
        label: "Connectivity",
        type: "text",
        placeholder: "e.g. Bluetooth 5.3, Wi-Fi 6E, USB-C",
      },
      {
        id: "batteryLife",
        label: "Battery Life",
        type: "text",
        placeholder: "e.g. Up to 30 hours",
      },
      {
        id: "targetUser",
        label: "Target User",
        type: "select",
        options: [
          "Professionals",
          "Gamers",
          "Students",
          "Everyday Users",
          "Creatives",
        ],
      },
      {
        id: "priceRange",
        label: "Price Range",
        type: "text",
        placeholder: "e.g. $199 - $299",
      },
    ],
  },
  {
    id: "home",
    label: "Home & Furniture",
    icon: Sofa,
    description: "Furniture, decor, home essentials",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Oslo Linen Sectional Sofa",
        required: true,
      },
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        options: [
          "Sofa",
          "Table",
          "Chair",
          "Lamp",
          "Rug",
          "Shelf",
          "Bed Frame",
          "Decor",
        ],
        required: true,
      },
      {
        id: "material",
        label: "Material",
        type: "text",
        placeholder: "e.g. Solid Oak Wood, Linen Upholstery",
      },
      {
        id: "dimensions",
        label: "Dimensions",
        type: "text",
        placeholder: 'e.g. 84"W x 36"D x 32"H',
      },
      {
        id: "colorFinish",
        label: "Color / Finish",
        type: "text",
        placeholder: "e.g. Walnut / Matte",
      },
      {
        id: "roomType",
        label: "Room Type",
        type: "select",
        options: [
          "Living Room",
          "Bedroom",
          "Kitchen",
          "Bathroom",
          "Office",
          "Outdoor",
        ],
      },
      {
        id: "style",
        label: "Style",
        type: "select",
        options: [
          "Modern",
          "Rustic",
          "Minimalist",
          "Industrial",
          "Mid-Century",
          "Scandinavian",
          "Bohemian",
        ],
      },
      {
        id: "priceRange",
        label: "Price Range",
        type: "text",
        placeholder: "e.g. $899 - $1,299",
      },
    ],
  },
  {
    id: "beauty",
    label: "Beauty & Skincare",
    icon: Sparkles,
    description: "Skincare, cosmetics, wellness products",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Radiance Renewal Serum",
        required: true,
      },
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        options: [
          "Serum",
          "Moisturizer",
          "Cleanser",
          "Sunscreen",
          "Mask",
          "Lipstick",
          "Foundation",
          "Hair Care",
        ],
        required: true,
      },
      {
        id: "skinType",
        label: "Skin Type",
        type: "select",
        options: [
          "All Skin Types",
          "Oily",
          "Dry",
          "Combination",
          "Sensitive",
          "Normal",
        ],
      },
      {
        id: "keyIngredients",
        label: "Key Ingredients",
        type: "textarea",
        placeholder: "e.g. Hyaluronic Acid, Vitamin C, Niacinamide",
      },
      {
        id: "volumeSize",
        label: "Volume / Size",
        type: "text",
        placeholder: "e.g. 30ml / 1 fl oz",
      },
      {
        id: "benefits",
        label: "Benefits",
        type: "textarea",
        placeholder: "e.g. Brightens skin, reduces dark spots, deep hydration",
      },
      {
        id: "fragrance",
        label: "Fragrance",
        type: "text",
        placeholder: "e.g. Light floral / Fragrance-free",
      },
      {
        id: "priceRange",
        label: "Price Range",
        type: "text",
        placeholder: "e.g. $34 - $48",
      },
    ],
  },
  {
    id: "food",
    label: "Food & Beverage",
    icon: UtensilsCrossed,
    description: "Snacks, drinks, supplements, gourmet items",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Midnight Mocha Protein Blend",
        required: true,
      },
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        options: [
          "Snack",
          "Drink",
          "Supplement",
          "Condiment",
          "Meal Kit",
          "Coffee/Tea",
          "Baked Goods",
          "Frozen",
        ],
        required: true,
      },
      {
        id: "flavorVariety",
        label: "Flavor / Variety",
        type: "text",
        placeholder: "e.g. Dark Chocolate Mocha",
      },
      {
        id: "dietaryInfo",
        label: "Dietary Info",
        type: "multi-select",
        options: [
          "Vegan",
          "Gluten-Free",
          "Organic",
          "Keto",
          "Sugar-Free",
          "Non-GMO",
          "Dairy-Free",
          "Nut-Free",
        ],
      },
      {
        id: "netWeight",
        label: "Net Weight / Volume",
        type: "text",
        placeholder: "e.g. 16 oz / 454g",
      },
      {
        id: "ingredientsHighlight",
        label: "Ingredients Highlight",
        type: "textarea",
        placeholder: "Key ingredients, sourcing info, etc.",
      },
      {
        id: "priceRange",
        label: "Price Range",
        type: "text",
        placeholder: "e.g. $12 - $18",
      },
    ],
  },
  {
    id: "sports",
    label: "Sports & Outdoors",
    icon: Dumbbell,
    description: "Fitness gear, outdoor equipment, activewear",
    fields: [
      {
        id: "productName",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. TrailMaster Pro Hiking Boots",
        required: true,
      },
      {
        id: "productType",
        label: "Product Type",
        type: "select",
        options: [
          "Running Shoes",
          "Tent",
          "Yoga Mat",
          "Dumbbells",
          "Bike",
          "Backpack",
          "Jacket",
          "Fitness Tracker",
        ],
        required: true,
      },
      {
        id: "material",
        label: "Material",
        type: "text",
        placeholder: "e.g. Gore-Tex, Vibram Sole",
      },
      {
        id: "sportActivity",
        label: "Sport / Activity",
        type: "select",
        options: [
          "Running",
          "Hiking",
          "Yoga",
          "Cycling",
          "Swimming",
          "Gym/Fitness",
          "Camping",
          "Team Sports",
        ],
      },
      {
        id: "skillLevel",
        label: "Skill Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Professional"],
      },
      {
        id: "keyFeatures",
        label: "Key Features",
        type: "textarea",
        placeholder: "Describe performance features, technology, etc.",
      },
      {
        id: "weatherResistance",
        label: "Weather Resistance",
        type: "select",
        options: [
          "All Weather",
          "Waterproof",
          "Water Resistant",
          "UV Protected",
          "Windproof",
          "Indoor Only",
        ],
      },
      {
        id: "priceRange",
        label: "Price Range",
        type: "text",
        placeholder: "e.g. $149 - $219",
      },
    ],
  },
];

// ── Mock Description Templates ───────────────────────────────────────
// We interpolate values from the form using a simple template system.

// type TemplateMap = Record<string, Record<Tone, (fields: Record<string, string | string[]>) => string>>

// export const DESCRIPTION_TEMPLATES: TemplateMap = {
//   fashion: {
//     Professional: (f) =>
//       `Introducing the ${f.productName || "product"}${f.productType ? ` — a premium ${(f.productType as string).toLowerCase()}` : ""} designed with meticulous attention to detail.${f.material ? ` Crafted from ${f.material},` : ""} this piece delivers an impeccable balance of form and function${f.color ? ` in a stunning ${f.color} colorway` : ""}.\n\n${f.targetAudience ? `Tailored for ${f.targetAudience}, it` : "It"} offers a refined silhouette that transitions seamlessly from day to evening.${f.keyFeatures ? `\n\nKey Features:\n${f.keyFeatures}` : ""}${f.sizeRange ? `\n\nAvailable in sizes ${f.sizeRange}.` : ""}${f.priceRange ? ` Priced at ${f.priceRange}.` : ""}\n\nElevate your wardrobe with a piece that speaks to quality craftsmanship and timeless elegance.`,
//     Casual: (f) =>
//       `Meet your new favorite ${f.productType ? (f.productType as string).toLowerCase() : "piece"} — the ${f.productName || "product"}.${f.material ? ` Made with ${f.material} that feels as good as it looks.` : ""}\n\n${f.color ? `The ${f.color} shade pairs perfectly with just about anything. ` : ""}Easy to dress up or down, this one's all about effortless style${f.targetAudience ? ` for ${(f.targetAudience as string).toLowerCase()}` : ""}.${f.keyFeatures ? `\n\nWhat makes it special:\n${f.keyFeatures}` : ""}${f.sizeRange ? `\n\nGrab yours in sizes ${f.sizeRange}.` : ""}${f.priceRange ? ` Just ${f.priceRange}.` : ""}`,
//     Luxurious: (f) =>
//       `Indulge in the exquisite ${f.productName || "creation"}${f.productType ? ` — a ${(f.productType as string).toLowerCase()} of unparalleled distinction` : ""}.${f.material ? ` Fashioned from the finest ${f.material},` : ""} every stitch speaks to the art of luxury craftsmanship${f.color ? `, presented in an opulent ${f.color} hue` : ""}.\n\n${f.targetAudience ? `Designed for the discerning ${(f.targetAudience as string).toLowerCase()} consumer, this` : "This"} is not merely clothing — it is a statement of refined living.${f.keyFeatures ? `\n\nExceptional Details:\n${f.keyFeatures}` : ""}${f.sizeRange ? `\n\nAvailable in sizes ${f.sizeRange}.` : ""}${f.priceRange ? ` Investment: ${f.priceRange}.` : ""}`,
//     Technical: (f) =>
//       `${f.productName || "Product"}${f.productType ? ` | ${f.productType}` : ""}\n\nMaterial: ${f.material || "N/A"}\nColor: ${f.color || "N/A"}\nSize Range: ${f.sizeRange || "N/A"}\nTarget: ${f.targetAudience || "General"}${f.keyFeatures ? `\n\nFeatures:\n${f.keyFeatures}` : ""}${f.priceRange ? `\n\nPrice: ${f.priceRange}` : ""}\n\nA performance-oriented ${f.productType ? (f.productType as string).toLowerCase() : "garment"} engineered for durability, comfort, and modern aesthetics. Built to meet the demands of contemporary fashion while maintaining optimal quality standards.`,
//   },
//   electronics: {
//     Professional: (f) =>
//       `Introducing the ${f.productName || "device"}${f.brand ? ` by ${f.brand}` : ""} — a cutting-edge ${f.productType ? (f.productType as string).toLowerCase() : "technology solution"} engineered for peak performance.\n\n${f.keySpecs ? `Specifications:\n${f.keySpecs}\n\n` : ""}${f.connectivity ? `Stay connected with ${f.connectivity}. ` : ""}${f.batteryLife ? `Enjoy up to ${f.batteryLife} of uninterrupted use. ` : ""}${f.targetUser ? `Designed for ${(f.targetUser as string).toLowerCase()}, ` : ""}this device delivers the perfect balance of power, portability, and reliability.${f.priceRange ? `\n\nPriced at ${f.priceRange}.` : ""}`,
//     Casual: (f) =>
//       `Say hello to the ${f.productName || "device"}${f.brand ? ` from ${f.brand}` : ""} — your new go-to ${f.productType ? (f.productType as string).toLowerCase() : "gadget"}.\n\n${f.keySpecs ? `Here's what's under the hood:\n${f.keySpecs}\n\n` : ""}${f.batteryLife ? `The battery lasts ${f.batteryLife}, so you can go all day without worrying about charging. ` : ""}${f.connectivity ? `Plus, it comes with ${f.connectivity} for seamless connectivity. ` : ""}${f.targetUser ? `Perfect for ${(f.targetUser as string).toLowerCase()}. ` : ""}${f.priceRange ? `All this for ${f.priceRange}. ` : ""}Trust us, this one's a keeper.`,
//     Luxurious: (f) =>
//       `Experience technological excellence with the ${f.productName || "masterpiece"}${f.brand ? ` by ${f.brand}` : ""} — where innovation meets sophistication in a ${f.productType ? (f.productType as string).toLowerCase() : "device"} unlike any other.\n\n${f.keySpecs ? `Premium Specifications:\n${f.keySpecs}\n\n` : ""}${f.batteryLife ? `An extraordinary ${f.batteryLife} battery life ensures uninterrupted brilliance. ` : ""}${f.connectivity ? `Seamless ${f.connectivity} connectivity. ` : ""}${f.targetUser ? `Curated for ${(f.targetUser as string).toLowerCase()} who demand nothing but the best.` : ""}${f.priceRange ? `\n\nInvestment: ${f.priceRange}.` : ""}`,
//     Technical: (f) =>
//       `${f.productName || "Product"}${f.brand ? ` | ${f.brand}` : ""}${f.productType ? ` | ${f.productType}` : ""}\n\n${f.keySpecs ? `Specs:\n${f.keySpecs}\n\n` : ""}Connectivity: ${f.connectivity || "N/A"}\nBattery: ${f.batteryLife || "N/A"}\nTarget User: ${f.targetUser || "General"}${f.priceRange ? `\nPrice: ${f.priceRange}` : ""}\n\nA high-performance ${f.productType ? (f.productType as string).toLowerCase() : "device"} built with precision engineering and advanced components. Optimized for reliability and efficiency across demanding workloads.`,
//   },
//   home: {
//     Professional: (f) =>
//       `Transform your space with the ${f.productName || "piece"}${f.productType ? ` — a beautifully designed ${(f.productType as string).toLowerCase()}` : ""} that brings both style and substance to your ${f.roomType ? (f.roomType as string).toLowerCase() : "home"}.\n\n${f.material ? `Crafted from ${f.material}, ` : ""}${f.style ? `this ${(f.style as string).toLowerCase()} design` : "this piece"} offers timeless appeal${f.colorFinish ? ` in a refined ${f.colorFinish} finish` : ""}.${f.dimensions ? ` Dimensions: ${f.dimensions}.` : ""}${f.priceRange ? `\n\nPriced at ${f.priceRange}.` : ""}\n\nA thoughtful addition to any curated interior.`,
//     Casual: (f) =>
//       `The ${f.productName || "piece"} is that ${f.productType ? (f.productType as string).toLowerCase() : "item"} you've been looking for to make your ${f.roomType ? (f.roomType as string).toLowerCase() : "space"} feel like home.\n\n${f.material ? `Made with ${f.material}. ` : ""}${f.colorFinish ? `Comes in a gorgeous ${f.colorFinish} finish. ` : ""}${f.style ? `The ${(f.style as string).toLowerCase()} vibe? Chef's kiss. ` : ""}${f.dimensions ? `It measures ${f.dimensions}, so make sure you've got the spot ready!` : ""}${f.priceRange ? `\n\nAll yours for ${f.priceRange}.` : ""}`,
//     Luxurious: (f) =>
//       `Elevate your living space with the magnificent ${f.productName || "creation"} — a ${f.style ? (f.style as string).toLowerCase() : "distinguished"} ${f.productType ? (f.productType as string).toLowerCase() : "furnishing"} of extraordinary craftsmanship.\n\n${f.material ? `Meticulously constructed from ${f.material}, ` : ""}each detail has been considered to deliver an experience of refined elegance${f.colorFinish ? ` in a breathtaking ${f.colorFinish} presentation` : ""}.${f.roomType ? ` A magnificent centerpiece for your ${(f.roomType as string).toLowerCase()}.` : ""}${f.dimensions ? `\n\nDimensions: ${f.dimensions}.` : ""}${f.priceRange ? `\n\nInvestment: ${f.priceRange}.` : ""}`,
//     Technical: (f) =>
//       `${f.productName || "Product"}${f.productType ? ` | ${f.productType}` : ""}\n\nMaterial: ${f.material || "N/A"}\nDimensions: ${f.dimensions || "N/A"}\nColor/Finish: ${f.colorFinish || "N/A"}\nRoom: ${f.roomType || "General"}\nStyle: ${f.style || "N/A"}${f.priceRange ? `\nPrice: ${f.priceRange}` : ""}\n\nA structurally sound ${f.productType ? (f.productType as string).toLowerCase() : "furnishing"} engineered for durability and aesthetic consistency. Meets industry standards for material quality and dimensional accuracy.`,
//   },
//   beauty: {
//     Professional: (f) =>
//       `Discover the ${f.productName || "product"} — a ${f.productType ? `advanced ${(f.productType as string).toLowerCase()}` : "skincare solution"} formulated to deliver visible results.\n\n${f.keyIngredients ? `Powered by ${f.keyIngredients}, ` : ""}this ${f.skinType ? `${(f.skinType as string).toLowerCase()} skin formula` : "formula"}${f.benefits ? ` ${f.benefits.toString().toLowerCase().startsWith("help") ? "" : "helps "}${f.benefits}` : " targets key skin concerns for a healthier complexion"}.${f.volumeSize ? ` ${f.volumeSize}.` : ""}${f.fragrance ? ` ${f.fragrance}.` : ""}${f.priceRange ? `\n\nPriced at ${f.priceRange}.` : ""}\n\nClinically inspired. Dermatologist recommended.`,
//     Casual: (f) =>
//       `Your skin called — it wants the ${f.productName || "product"}.\n\nThis ${f.productType ? (f.productType as string).toLowerCase() : "beauty essential"}${f.keyIngredients ? ` packed with ${f.keyIngredients}` : ""} is seriously a game-changer.${f.benefits ? ` Say hello to skin that ${f.benefits.toString().toLowerCase()}.` : ""}${f.skinType ? ` Works beautifully on ${(f.skinType as string).toLowerCase()} skin.` : ""}${f.fragrance ? ` Smells like: ${f.fragrance}.` : ""}${f.volumeSize ? ` Comes in a handy ${f.volumeSize} size.` : ""}${f.priceRange ? `\n\nJust ${f.priceRange}. Your skin will thank you.` : ""}`,
//     Luxurious: (f) =>
//       `Unveil your most radiant self with ${f.productName || "this exquisite formulation"} — a ${f.productType ? `prestigious ${(f.productType as string).toLowerCase()}` : "luxury skincare creation"} born from the intersection of science and opulence.\n\n${f.keyIngredients ? `Infused with ${f.keyIngredients}, ` : ""}this extraordinary elixir${f.benefits ? ` ${f.benefits}` : " transforms your complexion"}.${f.skinType ? ` Exquisitely suited for ${(f.skinType as string).toLowerCase()} skin.` : ""}${f.fragrance ? ` Enveloped in ${f.fragrance}.` : ""}${f.volumeSize ? `\n\n${f.volumeSize}.` : ""}${f.priceRange ? ` Investment: ${f.priceRange}.` : ""}`,
//     Technical: (f) =>
//       `${f.productName || "Product"}${f.productType ? ` | ${f.productType}` : ""}\n\nSkin Type: ${f.skinType || "All"}\nKey Ingredients: ${f.keyIngredients || "N/A"}\nVolume: ${f.volumeSize || "N/A"}\nBenefits: ${f.benefits || "N/A"}\nFragrance: ${f.fragrance || "N/A"}${f.priceRange ? `\nPrice: ${f.priceRange}` : ""}\n\nA scientifically formulated ${f.productType ? (f.productType as string).toLowerCase() : "skincare product"} with active ingredients targeting specific dermatological concerns. Formulated for optimal absorption and efficacy.`,
//   },
//   food: {
//     Professional: (f) =>
//       `Introducing ${f.productName || "our latest product"} — a ${f.productType ? `premium ${(f.productType as string).toLowerCase()}` : "gourmet offering"} crafted for those who appreciate exceptional taste and quality.\n\n${f.flavorVariety ? `Flavor: ${f.flavorVariety}. ` : ""}${f.ingredientsHighlight ? `Made with ${f.ingredientsHighlight}. ` : ""}${Array.isArray(f.dietaryInfo) && f.dietaryInfo.length > 0 ? `${f.dietaryInfo.join(" | ")}. ` : ""}${f.netWeight ? `${f.netWeight}.` : ""}${f.priceRange ? `\n\nPriced at ${f.priceRange}.` : ""}\n\nA thoughtfully crafted product that delivers on both flavor and nutritional value.`,
//     Casual: (f) =>
//       `Get ready for ${f.productName || "something delicious"}! This ${f.productType ? (f.productType as string).toLowerCase() : "treat"} is about to become your new obsession.\n\n${f.flavorVariety ? `${f.flavorVariety} flavor? Yes please. ` : ""}${f.ingredientsHighlight ? `Made with ${f.ingredientsHighlight} — real ingredients you can feel good about. ` : ""}${Array.isArray(f.dietaryInfo) && f.dietaryInfo.length > 0 ? `Plus, it's ${f.dietaryInfo.join(", ").toLowerCase()}! ` : ""}${f.netWeight ? `${f.netWeight} of pure deliciousness.` : ""}${f.priceRange ? `\n\nGrab yours for ${f.priceRange}.` : ""}`,
//     Luxurious: (f) =>
//       `Savor the extraordinary with ${f.productName || "this artisanal creation"} — a ${f.productType ? `gourmet ${(f.productType as string).toLowerCase()}` : "culinary masterpiece"} that elevates the everyday into an experience of pure indulgence.\n\n${f.flavorVariety ? `The ${f.flavorVariety} profile dances across the palate. ` : ""}${f.ingredientsHighlight ? `Sourced from the finest: ${f.ingredientsHighlight}. ` : ""}${Array.isArray(f.dietaryInfo) && f.dietaryInfo.length > 0 ? `Consciously crafted: ${f.dietaryInfo.join(", ")}. ` : ""}${f.netWeight ? `${f.netWeight}.` : ""}${f.priceRange ? ` Investment: ${f.priceRange}.` : ""}`,
//     Technical: (f) =>
//       `${f.productName || "Product"}${f.productType ? ` | ${f.productType}` : ""}\n\nFlavor: ${f.flavorVariety || "N/A"}\nDietary: ${Array.isArray(f.dietaryInfo) && f.dietaryInfo.length > 0 ? f.dietaryInfo.join(", ") : "None specified"}\nNet Weight: ${f.netWeight || "N/A"}\nIngredients: ${f.ingredientsHighlight || "N/A"}${f.priceRange ? `\nPrice: ${f.priceRange}` : ""}\n\nA nutritionally considered ${f.productType ? (f.productType as string).toLowerCase() : "food product"} meeting specified dietary standards with optimized ingredient sourcing and quality control processes.`,
//   },
//   sports: {
//     Professional: (f) =>
//       `Take your ${f.sportActivity ? (f.sportActivity as string).toLowerCase() : "performance"} to the next level with the ${f.productName || "product"} — a ${f.productType ? `high-performance ${(f.productType as string).toLowerCase()}` : "premium piece of equipment"} built for athletes who demand excellence.\n\n${f.material ? `Constructed with ${f.material}. ` : ""}${f.keyFeatures ? `Features:\n${f.keyFeatures}\n\n` : ""}${f.skillLevel ? `Designed for ${(f.skillLevel as string).toLowerCase()}-level athletes. ` : ""}${f.weatherResistance ? `${f.weatherResistance} rated. ` : ""}${f.priceRange ? `Priced at ${f.priceRange}.` : ""}\n\nEngineer your best performance yet.`,
//     Casual: (f) =>
//       `Ready to crush your next ${f.sportActivity ? (f.sportActivity as string).toLowerCase() : "workout"}? Meet the ${f.productName || "gear you've been waiting for"}.\n\nThis ${f.productType ? (f.productType as string).toLowerCase() : "gear"}${f.material ? ` is made with ${f.material}` : " is built to last"} and it seriously delivers.${f.keyFeatures ? `\n\nWhat you'll love:\n${f.keyFeatures}` : ""}${f.skillLevel ? `\n\nGreat for ${(f.skillLevel as string).toLowerCase()}-level enthusiasts. ` : ""}${f.weatherResistance ? `${f.weatherResistance}. ` : ""}${f.priceRange ? `All for ${f.priceRange}.` : ""} Game on.`,
//     Luxurious: (f) =>
//       `Elevate your ${f.sportActivity ? (f.sportActivity as string).toLowerCase() : "athletic pursuits"} with the exceptional ${f.productName || "masterpiece"} — where premium craftsmanship meets athletic excellence in a ${f.productType ? (f.productType as string).toLowerCase() : "piece"} of distinction.\n\n${f.material ? `Fashioned from ${f.material}, ` : ""}this is equipment that reflects your commitment to the extraordinary.${f.keyFeatures ? `\n\nDistinguishing Features:\n${f.keyFeatures}` : ""}${f.skillLevel ? `\n\nCurated for the ${(f.skillLevel as string).toLowerCase()} athlete. ` : ""}${f.weatherResistance ? `${f.weatherResistance}. ` : ""}${f.priceRange ? `Investment: ${f.priceRange}.` : ""}`,
//     Technical: (f) =>
//       `${f.productName || "Product"}${f.productType ? ` | ${f.productType}` : ""}\n\nMaterial: ${f.material || "N/A"}\nSport: ${f.sportActivity || "General"}\nSkill Level: ${f.skillLevel || "All"}\nWeather: ${f.weatherResistance || "N/A"}${f.keyFeatures ? `\n\nFeatures:\n${f.keyFeatures}` : ""}${f.priceRange ? `\nPrice: ${f.priceRange}` : ""}\n\nA performance-engineered ${f.productType ? (f.productType as string).toLowerCase() : "product"} designed to meet the rigorous demands of ${f.sportActivity ? (f.sportActivity as string).toLowerCase() : "athletic"} activities. Built for durability, comfort, and optimal performance metrics.`,
//   },
// }

// // ── Platform Badges ──────────────────────────────────────────────────
// export const PLATFORMS = [
//   "Amazon",
//   "Shopify",
//   "Etsy",
//   "eBay",
//   "WooCommerce",
//   "BigCommerce",
// ] as const
