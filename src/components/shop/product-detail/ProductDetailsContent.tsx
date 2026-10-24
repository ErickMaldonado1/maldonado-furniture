"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ProductWithRelations } from "@/types/product-service";
import { getProductHighlights } from "@/utils/product-highlights";
import { Sparkles } from "@/utils/icons/actions";
import { RealProjectsGallery } from "./RealProjectsGallery";

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
    "Melamina Pelikano RH / Estructura reforzada";

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
      <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm space-y-3">
        <h3 className="label-premium text-zinc-900 dark:text-white">
          Lo que lo hace único
        </h3>
        <ul className="space-y-2">
          {highlights.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div id="descripcion" className="space-y-3 scroll-mt-28">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-white uppercase tracking-wider">
          Descripción
        </h2>
        <div className="space-y-2 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p className="font-medium text-zinc-900 dark:text-white">
            {product.name}
          </p>
          <p className="whitespace-pre-line text-zinc-500 dark:text-zinc-400">
            {product.description ||
              "Práctico, estético y duradero, combina ahorro de espacio y elegancia contemporánea. Fabricado en melamina de alta calidad con garantía directa de taller."}
          </p>
        </div>
      </div>
      <div className="p-5 rounded-2xl bg-[#FDFCFB] dark:bg-zinc-900/40 border border-[#8B735B]/30 space-y-3">
        <div className="flex items-center gap-2 text-[#4A3728] dark:text-[#C4A482]">
          <Sparkles className="w-4 h-4" />
          <h3 className="label-premium text-[#4A3728] dark:text-[#C4A482]">
            Opciones de Personalización Disponibles
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Cada espacio tiene necesidades diferentes. En Muebles Maldonado fabricamos directamente en Quito y podemos personalizar:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1">
            <span className="font-medium text-zinc-900 dark:text-white block">📐 Medidas a tu Espacio:</span>
            <span>Ajustamos el ancho, alto y profundidad según las dimensiones de tu habitación.</span>
          </div>
          <div className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1">
            <span className="font-medium text-zinc-900 dark:text-white block">🎨 Acabados y Texturas:</span>
            <span>
              Más de 40 opciones de tableros Pelikano / Edimca / Masisa.{" "}
              <Link href="/catalogo-colores" className="text-[#8B735B] underline font-medium hover:opacity-80">
                Ver catálogo de colores →
              </Link>
            </span>
          </div>
          <div className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1">
            <span className="font-medium text-zinc-900 dark:text-white block">⚙️ Distribución Interior:</span>
            <span>Elección de gavetas adicionales, repisas regulables, pasacables o rieles telescópicos pesados.</span>
          </div>
          <div className="p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1">
            <span className="font-medium text-zinc-900 dark:text-white block">🛡️ Calidad Garantizada:</span>
            <span>Melamina RH resistente a humedad y rayones, cantos termoadheridos y garantía directa de fábrica.</span>
          </div>
        </div>
      </div>

      <div
        id="dimensiones"
        className="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 scroll-mt-28"
      >
        <h2 className="text-lg font-medium text-zinc-900 dark:text-white uppercase tracking-wider">
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
      <RealProjectsGallery
        category={product.category}
        subcategory={product.subcategory}
        productName={product.name}
      />
    </div>
  </div>
  );
}