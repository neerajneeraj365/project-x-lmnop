"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronsUpDown,
  FileImage,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { type CategoryConfig, CATEGORIES } from "@/lib/category-config";
import { CategorySelector } from "./CategorySelector";
import { buildProductSchema } from "@/schema/input-schema";

// ── Searchable Select (Popover + Command) ───────────────────────────

function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  label,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal bg-transparent border-primary"
        >
          {value || (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading={label}>
              {options.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === opt ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// ── Multi-Select Control ────────────────────────────────────────────

function MultiSelectControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((s) => s !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = value.includes(option);
        return (
          <Button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className="focus:outline-none bg-transparent border-primary"
          >
            <Badge
              variant={isActive ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-accent",
              )}
            >
              {option}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
}

// ── Schema Builders ─────────────────────────────────────────────────

/** Schema for product-detail fields only (no tone). Used to check if
 *  enough detail has been entered to enable both buttons. */
// function buildProductSchema(fields: CategoryConfig["fields"]) {
//   const shape: Record<string, z.ZodTypeAny> = {};
//   for (const field of fields) {
//     if (field.type === "multi-select") {
//       shape[field.id] = field.required
//         ? z.array(z.string()).min(1, {
//             message: `Select at least one ${field.label.toLowerCase()}`,
//           })
//         : z.array(z.string()).default([]);
//     } else {
//       shape[field.id] = field.required
//         ? z.string().min(1, { message: `${field.label} is required` })
//         : z.string().default("");
//     }
//   }
//   return z.object(shape);
// }

/** Full schema = product fields + required tone. Used when user clicks
 *  "Generate Description". */
// function buildFullSchema(fields: CategoryConfig["fields"]) {
//   const shape: Record<string, z.ZodTypeAny> = {};
//   for (const field of fields) {
//     if (field.type === "multi-select") {
//       shape[field.id] = field.required
//         ? z.array(z.string()).min(1, {
//             message: `Select at least one ${field.label.toLowerCase()}`,
//           })
//         : z.array(z.string()).default([]);
//     } else {
//       shape[field.id] = field.required
//         ? z.string().min(1, { message: `${field.label} is required` })
//         : z.string().default("");
//     }
//   }
//   shape.tone = z.string().min(1, { message: "Writing tone is required" });
//   shape.wordCount = z.string().min(1, { message: "Word count is required" });
//   return z.object(shape);
// }

// ── Props ───────────────────────────────────────────────────────────

interface DynamicFormProps {
  isGenerating: boolean;
  // onSubmit: (values: FormValues, tone: Tone, wordCount: WordCount) => void;
  // onGenerateFlyer: (productValues: FormValues) => void;
}

const steps = ["Product Details", "Target Audience"];

// ── Component ───────────────────────────────────────────────────────

export function DynamicForm({ isGenerating }: DynamicFormProps) {
  const [step, setStep] = useState(0);

  // Category selector
  const [category, setCategory] = useState<CategoryConfig>(CATEGORIES[0]);
  const productSchema = useMemo(
    () => buildProductSchema(category.fields),
    [category.fields],
  );

  type ProductFormType = z.infer<typeof productSchema>;

  const form = useFormContext<ProductFormType>();
  return (
    <>
      {/* Dynamic product fields grid */}

      {/* stepper component */}
      {/* <div className="">
        <div className="flex items-start gap-8 pb-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className="ml-4 h-px w-12 bg-zinc-700/50" />
              )}
            </div>
          ))}
        </div>
      </div> */}

      <CategorySelector
        selected={category}
        onSelect={(newCategory) => setCategory(newCategory)}
      />
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
        {category.fields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.id}
            control={form.control}
            name={fieldConfig.id as `dynamicFields.${string}`}
            render={({ field }) => (
              <FormItem
                className={cn(
                  (fieldConfig.type === "textarea" ||
                    fieldConfig.type === "multi-select") &&
                    "md:col-span-2",
                )}
              >
                <FormLabel>
                  {fieldConfig.label}
                  {fieldConfig.required && (
                    <span className="ml-0.5 text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  {fieldConfig.type === "text" ? (
                    <Input
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      value={field.value}
                      className="bg-transparent border-primary"
                    />
                  ) : fieldConfig.type === "textarea" ? (
                    <Textarea
                      placeholder={fieldConfig.placeholder}
                      className="min-h-[80px] bg-transparent border-primary resize-none"
                      {...field}
                      value={field.value}
                    />
                  ) : fieldConfig.type === "select" ? (
                    <SearchableSelect
                      options={fieldConfig.options || []}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder={`Select ${fieldConfig.label.toLowerCase()}`}
                      label={fieldConfig.label}
                    />
                  ) : fieldConfig.type === "multi-select" ? (
                    <MultiSelectControl
                      options={fieldConfig.options || []}
                      value={(field.value || []) as string[]}
                      onChange={field.onChange}
                    />
                  ) : null}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      
    </>
  );
}
