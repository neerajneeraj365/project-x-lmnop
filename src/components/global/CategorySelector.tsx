"use client";

import { useState } from "react";
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
  CommandSeparator,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, type CategoryConfig } from "@/lib/category-config";

interface CategorySelectorProps {
  selected: CategoryConfig;
  onSelect: (category: CategoryConfig) => void;
}

// Group categories into logical sections
const physicalProducts = CATEGORIES.filter((c) =>
  ["fashion", "home", "beauty"].includes(c.id),
);
const consumablesAndTech = CATEGORIES.filter((c) =>
  ["electronics", "food", "sports"].includes(c.id),
);

export function CategorySelector({
  selected,
  onSelect,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between gap-2 sm:w-[280px] bg-transparent border-primary"
        >
          <span className="flex items-center gap-2">
            <selected.icon className="h-4 w-4 text-muted-foreground" />
            {selected.label}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup heading="Lifestyle & Home">
              {physicalProducts.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.label}
                  onSelect={() => {
                    onSelect(category);
                    setOpen(false);
                  }}
                >
                  <category.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm">{category.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.description}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected.id === category.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tech, Food & Sports">
              {consumablesAndTech.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.label}
                  onSelect={() => {
                    onSelect(category);
                    setOpen(false);
                  }}
                >
                  <category.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm">{category.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.description}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected.id === category.id ? "opacity-100" : "opacity-0",
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
