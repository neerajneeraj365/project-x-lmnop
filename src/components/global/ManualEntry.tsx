"use client";

import React, { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion } from "motion/react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
// import type { ManualFormValues } from "@/schema/input-schema";

import { DynamicForm } from "./DynamicForm";

export default function ManualEntryFields() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto py-4 px-2"
    >
      <div className="space-y-4">
        {/* {step === 0 && (
          <>
            <CategorySelector
              selected={category}
              onSelect={handleCategoryChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Product Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Wireless Earbuds Pro"
                        className="bg-transparent border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Brand</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. TechAudio"
                        className="bg-transparent border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className=" text-xs">Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Describe the product, its benefits, and what makes it unique..."
                      rows={3}
                      className="bg-transparent border-zinc-600 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. $49.99"
                        className="bg-transparent border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Category</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Electronics"
                        className="bg-transparent border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="key_features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xs">
                    Key Features (comma separated)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Noise cancellation, 24hr battery, IPX5 waterproof"
                      className="bg-transparent border-zinc-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={() => setStep(1)}
              variant="link"
              className="w-full underline"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="target_audience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Target Audience</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Young professionals who commute daily"
                        className="bg-transparent border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unique_selling_points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">
                      Unique Selling Points
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Young professionals who commute daily"
                        className="bg-transparent border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              onClick={() => setStep(0)}
              variant="link"
              className="w-full underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </>
        )} */}
        <DynamicForm isGenerating={false} />
      </div>
    </motion.div>
  );
}
