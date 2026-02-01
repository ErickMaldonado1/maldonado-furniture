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
  selectedVariant,
  onVariantChange,
}: ProductInfoProps) {
  // 1. Obtener colores únicos de las variantes
  const availableColors = useMemo(() => {
    if (product.variants?.length > 0) {
      return Array.from(
        new Set(product.variants.map((v) => v.color).filter(Boolean)),
      );
    }
    return (product as any).colors || [];
  }, [product]);

  // 2. Función para encontrar el color en los mapas (normalizada)
  const getColorData = (colorName: string) => {
    if (!colorName) return { hex: "#E4E4E7", texture: null };

    // Normalizamos: minúsculas, sin espacios extra y sin tildes
    const normalized = colorName
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Buscar en COLOR_MAP (usamos la misma normalización para las llaves)
    const mapKey = Object.keys(COLOR_MAP).find(
      (key) =>
        key
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === normalized,
    );

    // Buscar en COLOR_TEXTURES
    const textureKey = Object.keys(COLOR_TEXTURES).find(
      (key) =>
        key
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === normalized,
    );

    return {
      hex: mapKey ? COLOR_MAP[mapKey] : "#E4E4E7",
      texture: textureKey ? COLOR_TEXTURES[textureKey] : null,
    };
  };

  const handleColorSelect = (color: string) => {
    const variant = product.variants?.find((v) => v.color === color);
    if (variant) onVariantChange(variant);
  };

  const currentDimensions = selectedVariant?.dimensions || null;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-32 space-y-6">
        <div>
          <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] text-[#4A3728] mb-4">
            <span>{product.category}</span>
            <span className="text-zinc-300"> | </span>
            <span className="text-zinc-500">{product.subcategory}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 leading-tight text-zinc-900 dark:text-white">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
              SKU: {selectedVariant?.sku || product.sku}
            </span>
            {selectedVariant && (
              <span className="text-xs font-bold text-[#4A3728] bg-[#4A3728]/10 px-2 py-1 rounded capitalize">
                {selectedVariant.color}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-8">
            <div className="flex items-center gap-2 text-[11px] text-green-600 font-bold bg-green-50 dark:bg-green-900/10 w-fit px-2 py-0.5 rounded-full border border-green-200 dark:border-green-500/20">
              <CheckBadge className="text-sm w-5 h-5" />
              <span className="uppercase tracking-widest font-black">
                Bajo pedido
              </span>
            </div>
          </div>

          <div className="pt-2 pb-2 prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-500 leading-relaxed text-lg">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Variant Selector (Colors) */}
        {availableColors.length > 0 && (
          <div className="space-y-5 py-6 border-y border-zinc-100 dark:border-zinc-800/50">
            <div className="flex justify-between items-end">
              <p className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                Acabado:{" "}
                <span className="text-[#4A3728] ml-1 font-black">
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
                    className={`group relative w-12 h-12 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-[#4A3728] ring-offset-4 dark:ring-offset-zinc-950 scale-105"
                        : "hover:scale-110 ring-1 ring-zinc-200 dark:ring-zinc-800"
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
                    {/* Overlay sutil para ver el check si está seleccionado */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/5 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tech Specs Accordion (Simple) */}
        <div className="pt-2 mb-2 border rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
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
