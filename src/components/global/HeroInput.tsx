"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUp, Plus, Link, PenLine, FileSpreadsheet } from "lucide-react";
import { motion } from "motion/react";
import ManualEntryFields from "./ManualEntry";
import { useForm, FormProvider, Resolver } from "react-hook-form";
import {
  ParentFormType,
  parentSchema,
  getParentDefaultValues,
  UrlFormType,
  urlSchema,
} from "@/schema/input-schema";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/category-config";

import { zodResolver } from "@hookform/resolvers/zod";
import { scrapeProductUrl } from "@/actions/scrape-product-url";
import { generateMarketingKit } from "@/actions/generate-marketing-kit";
import { Badge } from "../ui/badge";

type InputMode = "url" | "manual" | "csv";

export default function HeroInput() {
  // const form = useForm<UrlFormType>({
  //   resolver: zodResolver(urlSchema),
  //   defaultValues: { url: "" },
  //   mode: "onChange",
  // });
  const form = useForm<ParentFormType>({
    resolver: zodResolver(parentSchema) as Resolver<ParentFormType>,
    defaultValues: getParentDefaultValues(CATEGORIES[0].id),
    mode: "onChange",
  });
  const [inputMode, setInputMode] = useState<InputMode>("url");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: UrlFormType) => {
      if (inputMode === "url") {
        const result = await scrapeProductUrl(values.url);
        if (!result.success) {
          toast.error(result.error ?? "Failed to scrape URL");
          return;
        }
        const p = result.product;
        form.reset({
          ...getParentDefaultValues(form.getValues("categoryId")),
          url: values.url,
          name: p.name,
          description: p.description,
          price: p.price,
          brand: p.brand,
        });
        setInputMode("manual");
        toast.success(
          "Product loaded. Review and submit to generate your kit.",
        );
        return;
      } else if (inputMode === "manual") {
        const payload = form.getValues();
        const result = await generateMarketingKit(payload);
        if (!result.success) {
          toast.error(result.error ?? "Failed to start generation");
          return;
        }
        toast.success("Marketing kit generation started.");
        return;
      } else if (inputMode === "csv") {
        toast.error("CSV input mode not implemented");
        return;
      }
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });

  // Checking if field are valid
  // const url = form.watch("url");
  // const name = form.watch("name");
  // const description = form.watch("description");
  // const canSubmit =
  //   inputMode === "url"
  //     ? (url?.trim() ?? "").length > 0
  //     : inputMode === "manual"
  //       ? (name as string)?.trim()?.length > 0 &&
  //         (description as string)?.trim()?.length > 0
  //       : !!csvFile || (fileInputRef.current?.files?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto py-6"
    >
      <div className="relative backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-2 shadow-2xl shadow-black/40">
        <FormProvider {...form}>
          <form
            id="hero-input-form"
            onSubmit={form.handleSubmit((values) => {
              console.log("values", values);
              // if (inputMode === "url") {
              //   mutate(values);
              // } else if (inputMode === "manual") {
              //   mutate(values);
              // } else if (inputMode === "csv") {
              //   mutate(values);
              // }
              mutate({ url: values.url });
            })}
          >
            {inputMode === "url" && (
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <Input
                          {...field}
                          placeholder="Paste your product URL here..."
                          className="bg-transparent border-0 shadow-none text-base h-12 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 dark:bg-transparent"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            )}
            {inputMode === "manual" && <ManualEntryFields />}
            {inputMode === "csv" && (
              <motion.div
                className="py-4 px-2 space-y-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* <Label className="text-xs">Upload CSV</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => setCsvFile(e.target.files?.[0] ?? null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-zinc-600 border-dashed"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {csvFile ? csvFile.name : "Choose file"}
                </Button> */}
                {/* <FormField
                  control={form.control}
                  name="csv"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-full"
                        >
                          <Input
                            type="file"
                            accept=".csv"
                            onChange={(e) =>
                              setCsvFile(e.target.files?.[0] ?? null)
                            }
                            placeholder="Upload your CSV file here..."
                            className="bg-transparent border-0 shadow-none text-base h-12 focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                /> */}
              </motion.div>
            )}
          </form>

          <div className="flex items-center justify-between px-2 pb-1 pt-1">
            <div className="flex items-center gap-2">
              <Select
                value={inputMode}
                onValueChange={(v) => setInputMode(v as InputMode)}
              >
                <SelectTrigger className="w-auto border-zinc-700/50 rounded-full h-8 text-xs gap-1.5 px-3 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">
                    <span className="flex items-center gap-2">
                      <Link className="h-3 w-3" />
                      URL{" "}
                      <Badge variant="outline" className="text-[8px]">
                        Beta
                      </Badge>
                    </span>
                  </SelectItem>
                  <SelectItem value="manual">
                    <span className="flex items-center gap-2">
                      <PenLine className="h-3 w-3" />
                      Manual
                    </span>
                  </SelectItem>
                  <SelectItem value="csv">
                    <span className="flex items-center gap-2">
                      <FileSpreadsheet className="h-3 w-3" />
                      CSV
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              form="hero-input-form"
              disabled={isPending}
              className="rounded-full h-8 w-8 p-0 disabled:opacity-30 transition-all"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </FormProvider>
      </div>
    </motion.div>
  );
}
