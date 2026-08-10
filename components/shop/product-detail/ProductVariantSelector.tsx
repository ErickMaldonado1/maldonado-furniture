"use client";

import { useMemo } from "react";
import { SiblingProduct } from "@/app/(shop)/[category]/[subcategory]/[slug]/ProductDetailClient";

interface ProductVariantSelectorProps {
  variants: any[];
  selectedVariant: any;
  siblingProducts?: SiblingProduct[];
  selectedColor: string | null;
  selectedSize: string | null;
  selectedDimension: string | null;
  onOpenDrawer: (type: "color" | "size") => void;
}

export function ProductVariantSelector({
  variants = [],
  selectedVariant,
  siblingProducts = [],
  selectedColor,
  selectedSize,
  onOpenDrawer,
}: ProductVariantSelectorProps) {
  const totalColorsCount = useMemo(() => {
    const set = new Set<string>();
    variants.forEach((v) => {
      if (v.color) set.add(v.color.trim());
    });
    siblingProducts.forEach((s) => {
      if (s.colors?.[0]) set.add(s.colors[0].trim());
    });
    return Math.max(set.size, 1);
  }, [variants, siblingProducts]);

  const totalSizesCount = useMemo(() => {
    const set = new Set<string>();
    variants.forEach((v) => {
      if (v.sizeLabel) set.add(v.sizeLabel);
    });
    return Math.max(set.size, 1);
  }, [variants]);

  const activeColor =
    selectedColor ?? selectedVariant?.color ?? "Seleccione un color";
  const activeSize =
    selectedSize ?? selectedVariant?.sizeLabel ?? "Seleccione un tamaño";

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => onOpenDrawer("color")}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-900 dark:hover:border-white transition-all duration-200 group text-left shadow-sm"
      >
        <div className="flex items-center gap-1.5 text-[13px] truncate">
          <span className="font-medium text-zinc-900 dark:text-white uppercase tracking-wide">
            Color:
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 capitalize truncate">
            {activeColor}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
            {totalColorsCount}
          </span>
          <svg
            className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onOpenDrawer("size")}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-900 dark:hover:border-white transition-all duration-200 group text-left shadow-sm"
      >
        <div className="flex items-center gap-1.5 text-[13px] truncate">
          <span className="font-medium text-zinc-900 dark:text-white uppercase tracking-wide">
            Tamaño:
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 truncate">
            {activeSize}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="w-5 h-5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
            {totalSizesCount}
          </span>
          <svg
            className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
