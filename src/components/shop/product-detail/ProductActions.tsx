"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Heart } from "@/utils/icons/navigation";
import { HeartFilled, Sparkles } from "@/utils/icons/actions";
import { Whatsapp } from "@/utils/icons/social";
import { CustomProductModal } from "./CustomProductModal";

const ProductAccordion = dynamic(
  () => import("./ProductAccordion").then((mod) => mod.ProductAccordion),
  { ssr: false },
);

interface ProductActionsProps {
  productName: string;
  sku: string;
  color: string;
  size?: string;
  quantity: number;
  setQuantity: (q: number) => void;
  onAddToCart: () => void;
  price: number;
  finalPrice: number;
  discount?: number | null;
  deliveryDays?: number | null;
  stock?: number;
  isInCart?: boolean;
  isFav?: boolean;
  onToggleFav?: () => void;
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
  materials?: string[];
  careInstructions?: string;
}

export function ProductActions({
  productName,
  sku,
  color,
  size,
  quantity,
  setQuantity,
  onAddToCart,
  price,
  finalPrice,
  discount,
  deliveryDays,
  stock = 100,
  isInCart = false,
  isFav = false,
  onToggleFav,
  dimensions,
  materials,
  careInstructions,
}: ProductActionsProps) {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const origin = typeof window !== "undefined" ? window.location.href : "";
    const dimsText = dimensions
      ? `${dimensions.width}cm ancho x ${dimensions.height}cm alto x ${dimensions.depth}cm profundidad`
      : (size || "Medidas de catálogo");

    const formattedPrice = finalPrice.toLocaleString("es-EC", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const message = `👋 ¡Hola Muebles Maldonado! Me interesa cotizar este producto:
🪑 *Producto:* ${productName}
🆔 *Código / SKU:* ${sku || "N/A"}
💰 *Precio publicado:* $${formattedPrice} c/u
📐 *Medidas de variante:* ${dimsText}
🎨 *Acabado / Color:* ${color || "Estándar"}
🔢 *Cantidad:* ${quantity}
🔗 *Enlace:* ${origin}

¿Tienen disponibilidad y realizan instalación en Quito? Me gustaría coordinar detalles.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/593959504842?text=${encodedMessage}`, "_blank");
  };

  const deliveryText = deliveryDays
    ? `${deliveryDays} días hábiles`
    : "15 días hábiles";

  const monthlyPayment = (finalPrice / 3).toLocaleString("es-EC", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col gap-4 pt-1">
      <div className="flex items-baseline gap-3 pb-1">
        <span className="text-3xl sm:text-4xl font-medium text-zinc-900 dark:text-white">
          $
          {finalPrice.toLocaleString("es-EC", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        {discount && discount > 0 ? (
          <div className="flex items-center gap-2">
            <span className="label-premium text-zinc-600 dark:text-zinc-400 line-through">
              $
              {price.toLocaleString("es-EC", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="label-premium bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 px-2 py-0.5 rounded-full">
              -{discount}% OFF
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-1">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          Cantidad limitada
        </span>
        <div className="flex items-center gap-1">
          <span>Plazo de entrega {deliveryText}</span>
          <span className="w-4 h-4 rounded-full border border-zinc-400 text-[10px] flex items-center justify-center font-bold" aria-hidden="true">
            i
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <label htmlFor="product-detail-quantity" className="sr-only">
              Cantidad
            </label>
            <select
              id="product-detail-quantity"
              name="productQuantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="appearance-none h-12 pl-4 pr-8 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-white cursor-pointer hover:border-zinc-900 dark:hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] transition-colors"
              aria-label="Seleccionar cantidad"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={isInCart ? undefined : onAddToCart}
            disabled={isInCart}
            aria-label={isInCart ? "Producto en la cesta" : "Añadir a la cesta"}
            className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 label-premium text-xs tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white ${
              isInCart
                ? "bg-zinc-200 text-zinc-600 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-400"
                : "bg-[#141414] text-white! hover:bg-[#252525] hover:shadow-lg hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950! dark:hover:bg-zinc-200 active:scale-[0.98]"
            }`}
          >
            <span>{isInCart ? "En la cesta" : "Añadir a la cesta"}</span>
          </button>

          <button
            type="button"
            onClick={onToggleFav}
            className="w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white hover:border-zinc-900 dark:hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors shrink-0"
            aria-label={isFav ? "Eliminar de favoritos" : "Agregar a favoritos"}
          >
            {isFav ? (
              <HeartFilled className="w-5 h-5 text-red-500" aria-hidden="true" />
            ) : (
              <Heart className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleWhatsApp}
            title="Cotizar por WhatsApp"
            aria-label="Cotizar este producto por WhatsApp"
            className="h-12 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-white flex items-center justify-center gap-2 label-premium text-white! font-medium tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Whatsapp className="w-5 h-5 text-white" aria-hidden="true" />
            <span>Cotizar por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCustomModalOpen(true)}
            title="Personalizar este mueble con medidas y acabados a medida"
            aria-label="Personalizar este mueble con medidas y acabados a medida"
            className="h-12 px-4 rounded-full border border-[#4A3728] dark:border-[#A6866A] text-[#4A3728] dark:text-[#D4B896] hover:bg-[#4A3728] hover:text-white dark:hover:bg-[#D4B896] dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] flex items-center justify-center gap-2 label-premium font-medium tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Personalizar a Medida</span>
          </button>
        </div>

        <div className="pt-2 flex items-center justify-between label-premium text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
          <span className="flex items-center gap-1">
            <span className="text-emerald-500">✓</span> Fabricación en Quito
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500">✓</span> Melamina alta calidad
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500">✓</span> Garantía directa
          </span>
        </div>
      </div>

      <CustomProductModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        initialProduct={{
          name: productName,
          sku: sku,
          color: color,
          dimensions: dimensions,
          price: finalPrice,
        }}
      />
    </div>
  );
}
