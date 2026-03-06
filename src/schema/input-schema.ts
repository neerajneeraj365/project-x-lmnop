import { CategoryConfig } from "@/lib/category-config";
import * as z from "zod";

export const urlSchema = z.object({
  url: z.url("Please enter a valid URL"),
});

export function buildProductSchema(fields: CategoryConfig["fields"]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.type === "multi-select") {
      shape[field.id] = field.required
        ? z.array(z.string()).min(1, {
            message: `Select at least one ${field.label.toLowerCase()}`,
          })
        : z.array(z.string()).default([]);
    } else {
      shape[field.id] = field.required
        ? z.string().min(1, { message: `${field.label} is required` })
        : z.string().default("");
    }
  }
  return z.object(shape);
}

export const parentSchema = z.object({
  url: z.string().default(""),
  name: z.string().default(""),
  description: z.string().default(""),
  price: z.string().default(""),
  brand: z.string().default(""),
  categoryId: z.string().default("fashion"),
  dynamicFields: z
    .record(z.string(), z.union([z.string(), z.array(z.string())]))
    .default({}),
});

export type ParentFormType = z.infer<typeof parentSchema>;

export function getParentDefaultValues(categoryId: string): ParentFormType {
  return {
    url: "",
    name: "",
    description: "",
    price: "",
    brand: "",
    categoryId,
    dynamicFields: {},
  };
}

export type UrlFormType = z.infer<typeof urlSchema>;
