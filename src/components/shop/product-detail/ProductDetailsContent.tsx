"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ProductWithRelations } from "@/types/product-service";
import { getProductHighlights } from "@/utils/product-highlights";
import { Sparkles } from "@/utils/icons/actions";
import { RealProjectsGallery } from "./RealProjectsGallery";
import {
  FiMaximize,
  FiLayers,
  FiSliders,
  FiShield,
  FiFileText,
  FiMove,
} from "react-icons/fi";

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
      <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs space-y-3">
        <h3 className="label-premium text-zinc-900 dark:text-white">
          Lo que lo hace único
        </h3>
        <ul className="space-y-2.5">
          {highlights.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A3728] dark:bg-[#D4B896] shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div id="descripcion" className="space-y-3 scroll-mt-28">
        <h2 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white uppercase tracking-wider">
          Descripción
        </h2>
        <div className="space-y-2.5 text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p className="font-medium text-zinc-900 dark:text-white">
            {product.name}
          </p>
          <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-400">
            {product.description ||
              "Práctico, estético y duradero, combina ahorro de espacio y elegancia contemporánea. Fabricado en melamina de alta calidad con garantía directa de taller."}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-[#FDFCFB] dark:bg-zinc-900/40 border border-[#8B735B]/30 space-y-4">
        <div className="flex items-center gap-2 text-[#4A3728] dark:text-[#C4A482]">
          <Sparkles className="w-4 h-4" />
          <h3 className="label-premium text-[#4A3728] dark:text-[#C4A482]">
            Opciones de Personalización Disponibles
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Cada espacio tiene necesidades diferentes. En Muebles Maldonado fabricamos directamente en Quito y podemos personalizar:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          <div className="p-3.5 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
              <FiMaximize className="w-4 h-4 text-[#4A3728] dark:text-[#D4B896] shrink-0" aria-hidden="true" />
              <span>Medidas a tu Espacio:</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 pl-6">
              Ajustamos el ancho, alto y profundidad según las dimensiones de tu habitación.
            </p>
          </div>
          <div className="p-3.5 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
              <FiLayers className="w-4 h-4 text-[#4A3728] dark:text-[#D4B896] shrink-0" aria-hidden="true" />
              <span>Acabados y Texturas:</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 pl-6">
              Más de 40 opciones de tableros Pelikano / Edimca / Masisa.{" "}
              <Link href="/catalogo-colores" className="text-[#634E3A] dark:text-[#D4B896] underline font-medium hover:opacity-80">
                Ver catálogo de colores →
              </Link>
            </p>
          </div>
          <div className="p-3.5 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
              <FiSliders className="w-4 h-4 text-[#4A3728] dark:text-[#D4B896] shrink-0" aria-hidden="true" />
              <span>Distribución Interior:</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 pl-6">
              Elección de gavetas adicionales, repisas regulables, pasacables o rieles telescópicos pesados.
            </p>
          </div>
          <div className="p-3.5 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
              <FiShield className="w-4 h-4 text-[#4A3728] dark:text-[#D4B896] shrink-0" aria-hidden="true" />
              <span>Calidad Garantizada:</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 pl-6">
              Melamina RH resistente a humedad y rayones, cantos termoadheridos y garantía directa de fábrica.
            </p>
          </div>
        </div>
      </div>

      <div
        id="dimensiones"
        className="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800 scroll-mt-28"
      >
        <h2 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white uppercase tracking-wider">
          Características &amp; Dimensiones
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
              <FiFileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" aria-hidden="true" />
              Características
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              <p className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-medium text-zinc-500 dark:text-zinc-400">
                  Color:
                </span>
                <span className="capitalize font-medium text-zinc-900 dark:text-zinc-100">{activeColor}</span>
              </p>
              <p className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1.5">
                <span className="font-medium text-zinc-500 dark:text-zinc-400">
                  Material:
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100 text-right">{materialsText}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-medium text-zinc-500 dark:text-zinc-400">
                  Tamaño:
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{activeSize}</span>
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
              <FiMove className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" aria-hidden="true" />
              Dimensiones
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              {dimWidth !== null ? (
                <p className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1.5">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">
                    Largo / Ancho:
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{dimWidth} cm</span>
                </p>
              ) : null}
              {dimHeight !== null ? (
                <p className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1.5">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">
                    Alto:
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{dimHeight} cm</span>
                </p>
              ) : null}
              {dimDepth !== null ? (
                <p className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1.5">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">
                    Profundidad:
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{dimDepth} cm</span>
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
  );
}
