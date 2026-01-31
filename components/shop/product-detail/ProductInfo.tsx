"use client";

import { useMemo } from "react";
import { Product } from "@prisma/client";
import { CheckBadge } from "@/utils/icons/index";

import { COLOR_MAP, COLOR_TEXTURES } from "@/utils/filter-textures";

interface ProductInfoProps {
  product: Product & { variants: any[] };
  finalPrice: number;
  selectedVariant: any;
  onVariantChange: (variant: any) => void;
}

export function ProductInfo({
  product,
  finalPrice,
  selectedVariant,
  onVariantChange,
}: ProductInfoProps) {
  // Extract unique colors from variants or fallback to product colors
  const availableColors = useMemo(() => {
    if (product.variants?.length > 0) {
      // Get unique colors from variants
      const colors = Array.from(
        new Set(product.variants.map((v) => v.color).filter(Boolean)),
      );
      return colors;
    }
    return product.colors || [];
  }, [product]);

  // Handle color selection
  const handleColorSelect = (color: string) => {
    if (!product.variants?.length) return;
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      onVariantChange(variant);
    }
  };

  const currentDimensions = selectedVariant?.dimensions || null;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-32 space-y-8">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#4A3728] mb-6">
            <span>{product.category}</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-500">{product.subcategory}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 leading-tight text-zinc-900 dark:text-white">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
              SKU: {selectedVariant?.sku || product.sku}
            </span>
            {selectedVariant && (
              <span className="text-xs font-bold text-[#4A3728] bg-[#4A3728]/10 px-2 py-1 rounded capitalize">
                {selectedVariant.color}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="flex items-center gap-2 text-[11px] text-green-600 font-bold bg-green-50 dark:bg-green-900/10 w-fit px-2 py-0.5 rounded-full border border-green-200 dark:border-green-500/20">
              <CheckBadge className="text-sm" />
              <span className="uppercase tracking-widest font-black">
                Disponible
              </span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-500 leading-relaxed text-[13px]">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Variant Selector (Colors) */}
        {availableColors.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              Acabado:{" "}
              <span className="text-[#4A3728]">
                {selectedVariant?.color || "Seleccionar"}
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              {availableColors.map((color: any) => {
                const isSelected = selectedVariant?.color === color;
                const lowerColor = color.toLowerCase().trim();
                const texture = COLOR_TEXTURES[lowerColor];
                const hexKey = Object.keys(COLOR_MAP).find(
                  (k) => k.toLowerCase() === lowerColor,
                );
                const hexColor = hexKey ? COLOR_MAP[hexKey] : "#E4E4E7";

                return (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${
                      isSelected
                        ? "border-[#4A3728] scale-110 shadow-lg ring-2 ring-[#4A3728]/20"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                    }`}
                    title={color}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundColor: hexColor,
                        backgroundImage: texture ? `url(${texture})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tech Specs Accordion (Simple) */}
        <div className="border rounded-2xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
          <div className="p-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
              Especificaciones Técnicas
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              {currentDimensions && (
                <>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold mb-0.5">
                      Alto
                    </p>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {currentDimensions.height} cm
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold mb-0.5">
                      Ancho
                    </p>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {currentDimensions.width} cm
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold mb-0.5">
                      Profundidad
                    </p>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {currentDimensions.depth} cm
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-0.5">
                  Material
                </p>
                <p className="font-medium text-zinc-900 dark:text-white">
                  {selectedVariant?.material ||
                    product.materials?.[0] ||
                    "Estándar"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
