"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Product } from "@prisma/client";
import { CheckBadge } from "@/utils/icons/layout";
import { COLOR_MAP, COLOR_TEXTURES } from "@/utils/filter-textures";
import { slugify } from "@/utils/slug_url";
import { SiblingProduct } from "@/app/(shop)/[category]/[subcategory]/[slug]/ProductDetailClient";

interface ProductInfoProps {
  product: Product & { variants: any[] };
  finalPrice: number;
  selectedVariant: any;
  onVariantChange: (variant: any) => void;
  siblingProducts?: SiblingProduct[];
  selectedColor?: string | null;
  onColorChange?: (color: string) => void;
}

export function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
  siblingProducts = [],
  selectedColor = null,
  onColorChange,
}: ProductInfoProps) {
  const variantColors = useMemo(() => {
    if (!product.variants?.length) return [];
    const seen = new Set<string>();
    const result: { color: string; variant: any }[] = [];
    for (const v of product.variants) {
      if (v.color && !seen.has(v.color)) {
        seen.add(v.color);
        result.push({ color: v.color, variant: v });
      }
    }
    return result;
  }, [product.variants]);

  const activeColor = selectedColor ?? selectedVariant?.color ?? null;
  const showColorSection = variantColors.length > 0 || siblingProducts.length > 0;

  const getColorData = (colorName: string) => {
    if (!colorName) return { hex: "#E4E4E7", texture: null };

    const normalized = colorName
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const mapKey = Object.keys(COLOR_MAP).find(
      (key) =>
        key
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === normalized,
    );

    let textureUrl: string | null = null;
    for (const brand of Object.values(COLOR_TEXTURES)) {
      const textureKey = Object.keys(brand).find(
        (key) =>
          key
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") === normalized,
      );
      if (textureKey && (brand as any)[textureKey]) {
        textureUrl = (brand as any)[textureKey];
        break;
      }
    }

    return {
      hex: mapKey ? COLOR_MAP[mapKey] : "#E4E4E7",
      texture: textureUrl,
    };
  };

  const handleColorSelect = (color: string) => {
    if (!product.variants?.length) return;
    const candidates = product.variants.filter((v) => v.color === color);
    if (!candidates.length) return;
    const bestMatch =
      candidates.find(
        (v) =>
          v.sizeLabel === selectedVariant?.sizeLabel &&
          v.dimensionLabel === selectedVariant?.dimensionLabel,
      ) ||
      candidates.find((v) => v.sizeLabel === selectedVariant?.sizeLabel) ||
      candidates.find((v) => v.dimensionLabel === selectedVariant?.dimensionLabel) ||
      candidates[0];

    onVariantChange(bestMatch);
  };

  const currentDimensions = selectedVariant?.dimensions || null;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.20em] text-[#4A3728] dark:text-zinc-400">
            <span className="opacity-80 hover:opacity-100 transition-opacity">
              {product.category}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span className="text-zinc-600 dark:text-zinc-200">
              {product.subcategory}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-zinc-900 dark:text-white transition-colors duration-300">
            {selectedVariant?.name || product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-[12px] font-bold tracking-widest text-zinc-500 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 px-3 py-1.5 rounded-full uppercase">
              SKU: {selectedVariant?.sku || product.sku}
            </span>
            <div className="flex items-center gap-1.5 text-[12px] font-bold tracking-widest text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-500/30 uppercase">
              <CheckBadge className="w-4 h-4" />
              <span>Bajo pedido</span>
            </div>
          </div>

          <div className="pt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed text-base font-medium max-w-2xl">
            <p>{product.description}</p>
          </div>
        </div>

        {showColorSection && (
          <div className="space-y-4">
            <p className="text-base font-bold  text-zinc-900 dark:text-white">
              Acabado:
              <span className="text-[#4A3728] dark:text-amber-200 ml-2">
                {activeColor || "Seleccionar"}
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              {variantColors.map(({ color, variant }) => {
                const isSelected = activeColor === color;
                const { hex, texture } = getColorData(color);

                return (
                  <div key={color} className="relative group">
                    <button
                      onClick={() => handleColorSelect(color)}
                      className={`relative w-11 h-11 rounded-full transition-all duration-300 ${
                        isSelected
                          ? "ring-2 ring-[#4A3728] ring-offset-4 dark:ring-offset-zinc-950 scale-105"
                          : "hover:scale-110 ring-1 ring-zinc-300 dark:ring-zinc-700 hover:ring-[#4A3728] dark:hover:ring-amber-400"
                      }`}
                      title={color}
                      aria-label={`Seleccionar color ${color}`}
                    >
                      <div
                        className="absolute inset-0 rounded-full overflow-hidden"
                        style={{
                          backgroundColor: hex,
                          backgroundImage: texture ? `url(${texture})` : "none",
                          backgroundSize: "cover",
                        }}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/5 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow" />
                        </div>
                      )}
                    </button>
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 flex flex-col items-center">
                      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-2 w-32 md:w-40 border border-zinc-200 dark:border-zinc-800">
                        <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: hex,
                              backgroundImage: texture
                                ? `url(${texture})`
                                : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        </div>
                        <p className="text-[10px] md:text-[11px] font-bold text-center uppercase tracking-wider text-zinc-900 dark:text-white truncate">
                          {color}
                        </p>
                        {variant?.sku && (
                          <p className="text-[9px] text-center text-zinc-400 mt-0.5 font-mono">
                            {variant.sku}
                          </p>
                        )}
                      </div>
                      <div className="w-3 h-3 bg-white dark:bg-zinc-900 border-b border-r border-zinc-200 dark:border-zinc-800 rotate-45 -mt-2" />
                    </div>
                  </div>
                );
              })}
              {siblingProducts.map((sibling) => {
                const siblingColorFromField = sibling.colors?.[0];
                const dashIdx = sibling.name.lastIndexOf(" - ");
                const siblingColorFromName =
                  dashIdx !== -1
                    ? sibling.name.substring(dashIdx + 3).trim()
                    : sibling.name.trim();
                const siblingColor =
                  siblingColorFromField || siblingColorFromName;

                const { hex, texture } = getColorData(siblingColor);
                const isSelected = activeColor === siblingColor;

                return (
                  <div key={sibling.id} className="relative group">
                    <button
                      onClick={() => onColorChange?.(siblingColor)}
                      className={`relative w-11 h-11 rounded-full transition-all duration-300 ${
                        isSelected
                          ? "ring-2 ring-[#4A3728] ring-offset-4 dark:ring-offset-zinc-950 scale-105"
                          : "hover:scale-110 ring-1 ring-zinc-300 dark:ring-zinc-700 hover:ring-[#4A3728] dark:hover:ring-amber-400"
                      }`}
                      title={`Ver en ${siblingColor}`}
                      aria-label={`Seleccionar color ${siblingColor}`}
                    >
                      <div
                        className="absolute inset-0 rounded-full overflow-hidden"
                        style={{
                          backgroundColor: hex,
                          backgroundImage: texture ? `url(${texture})` : "none",
                          backgroundSize: "cover",
                        }}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/5 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow" />
                        </div>
                      )}
                    </button>
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 flex flex-col items-center">
                      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-2 w-32 md:w-40 border border-zinc-200 dark:border-zinc-800">
                        <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: hex,
                              backgroundImage: texture
                                ? `url(${texture})`
                                : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        </div>
                        <p className="text-[10px] md:text-[11px] font-bold text-center uppercase tracking-wider text-zinc-900 dark:text-white truncate">
                          {siblingColor}
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-white dark:bg-zinc-900 border-b border-r border-zinc-200 dark:border-zinc-800 rotate-45 -mt-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 py-2 border-zinc-100 dark:border-zinc-800">
          <div className="space-y-1">
            <p className="text-base font-bold  text-zinc-900 dark:text-white">
              Material Base:{" "}
              <span className="text-[#4A3728] dark:text-amber-200 ml-1">
                {selectedVariant?.material ||
                  product.materials?.[0] ||
                  "Estándar"}
              </span>
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
}
