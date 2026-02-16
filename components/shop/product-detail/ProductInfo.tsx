"use client";

import { useMemo } from "react";
import { Product } from "@prisma/client";
import { CheckBadge } from "@/utils/icons/layout";
import { COLOR_MAP, COLOR_TEXTURES } from "@/utils/filter-textures";

interface ProductInfoProps {
  product: Product & { variants: any[] };
  finalPrice: number;
  selectedVariant: any;
  onVariantChange: (variant: any) => void;
}

export function ProductInfo({
  product,
  selectedVariant,
  onVariantChange,
}: ProductInfoProps) {
  const availableColors = useMemo(() => {
    if (product.variants?.length > 0) {
      return Array.from(
        new Set(product.variants.map((v) => v.color).filter(Boolean)),
      );
    }
    return (product as any).colors || [];
  }, [product]);

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

      if (textureKey && brand[textureKey]) {
        textureUrl = brand[textureKey];
        break;
      }
    }

    return {
      hex: mapKey ? COLOR_MAP[mapKey] : "#E4E4E7",
      texture: textureUrl,
    };
  };

  const handleColorSelect = (color: string) => {
    const variant = product.variants?.find((v) => v.color === color);
    if (variant) onVariantChange(variant);
  };

  const currentDimensions = selectedVariant?.dimensions || null;
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#4A3728] dark:text-zinc-400">
            <span className="opacity-80 hover:opacity-100 transition-opacity">
              {product.category}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span className="text-zinc-600 dark:text-zinc-200">
              {product.subcategory}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-zinc-900 dark:text-white uppercase">
            {product.name}
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

          <div className="pt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px] font-medium max-w-2xl">
            <p>{product.description}</p>
          </div>
        </div>

        {availableColors.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-bold  tracking-widest text-zinc-900 dark:text-white">
                Acabado:
                <span className="text-[#4A3728] dark:text-amber-200 ml-2">
                  {selectedVariant?.color || "Seleccionar"}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {availableColors.map((color: any) => {
                const isSelected = selectedVariant?.color === color;
                const { hex, texture } = getColorData(color);

                return (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`group relative w-11 h-11 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-[#4A3728] ring-offset-4 dark:ring-offset-zinc-950 scale-105"
                        : "hover:scale-110 ring-1 ring-zinc-300 dark:ring-zinc-700"
                    }`}
                    title={color}
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
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-6 border-y border-zinc-100 dark:border-zinc-800">
          <div className="space-y-1">
            <p className="text-zinc-400 text-[9px] uppercase font-black tracking-[0.2em]">
              Dimensiones
            </p>
            {currentDimensions ? (
              <p className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                {currentDimensions.height}x{currentDimensions.width}x
                {currentDimensions.depth}cm
              </p>
            ) : (
              <p className="text-[13px] font-bold text-zinc-400">---</p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-zinc-400 text-[9px] uppercase font-black tracking-[0.2em]">
              Material Base
            </p>
            <p className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 truncate">
              {selectedVariant?.material ||
                product.materials?.[0] ||
                "Estándar"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
