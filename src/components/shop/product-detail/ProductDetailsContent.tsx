"use client";

import { useMemo } from "react";
import { ProductWithRelations } from "@/types/product-service";
import { getProductHighlights } from "@/utils/product-highlights";

interface ProductDetailsContentProps {
  product: ProductWithRelations;
  selectedVariant: any;
  selectedColor?: string | null;
  selectedSize?: string | null;
}

export function ProductDetailsContent({
  product,
  selectedVariant,
  selectedColor,
  selectedSize,
}: ProductDetailsContentProps) {
  const activeColor =
    selectedColor || selectedVariant?.color || "Seleccione un color";
  const activeSize =
    selectedSize || selectedVariant?.sizeLabel || "Seleccione un tamaño";
  const materialsText =
    selectedVariant?.material ||
    product.materials?.join(", ") ||
    "100% Poliéster / Estructura de Madera";

  const dimWidth = selectedVariant?.dimensions?.width ?? null;
  const dimHeight = selectedVariant?.dimensions?.height ?? null;
  const dimDepth = selectedVariant?.dimensions?.depth ?? null;

  const highlights = useMemo(
    () =>
      getProductHighlights(
        product.category,
        product.subcategory,
        product.description,
      ),
    [product.category, product.subcategory, product.description],
  );

  return (
    <div className="space-y-10 pt-8 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-3">
        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-white uppercase -wide">
          Lo que lo hace único
        </h3>
        <ul className="space-y-2">
          {highlights.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div id="descripcion" className="space-y-3 scroll-mt-28">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white uppercase -wide">
          Descripción
        </h2>
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p className="font-medium text-zinc-900 dark:text-white">
            {product.name}
          </p>
          <p className="whitespace-pre-line">
            {product.description ||
              "Práctico, estético y duradero, combina ahorro de espacio y elegancia contemporánea. La elección perfecta para quienes buscan un diseño moderno sin comprometer el estilo."}
          </p>
        </div>
      </div>
      <div
        id="dimensiones"
        className="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 scroll-mt-28"
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white uppercase -wide">
          Características &amp; Dimensiones
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-[13px] font-medium text-zinc-900 dark:text-white uppercase -wide">
              <svg
                className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Características
            </p>
            <div className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
              <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  Color:{" "}
                </span>
                <span className="capitalize">{activeColor}</span>
              </p>
              <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  Material:{" "}
                </span>
                <span>{materialsText}</span>
              </p>
              <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  Tamaño:{" "}
                </span>
                <span>{activeSize}</span>
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-[13px] font-medium text-zinc-900 dark:text-white uppercase -wide">
              <svg
                className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              Dimensiones
            </p>
            <div className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
              {dimWidth !== null ? (
                <p>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Largo / Ancho:{" "}
                  </span>
                  {dimWidth} cm
                </p>
              ) : null}
              {dimHeight !== null ? (
                <p>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Alto:{" "}
                  </span>
                  {dimHeight} cm
                </p>
              ) : null}
              {dimDepth !== null ? (
                <p>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Profundidad:{" "}
                  </span>
                  {dimDepth} cm
                </p>
              ) : null}
              {dimWidth === null && dimHeight === null && dimDepth === null && (
                <p className="text-zinc-400 italic text-xs">
                  Dimensiones no disponibles para esta variante.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
