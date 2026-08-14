"use client";

import dynamic from "next/dynamic";
import { Heart } from "@/utils/icons/navigation";
import { HeartFilled } from "@/utils/icons/actions";
import { Whatsapp } from "@/utils/icons/social";

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
  const handleWhatsApp = () => {
    const message = `👋 ¡Hola! Me interesa este producto:
    🪑 *Producto:* ${productName}
    🆔 *SKU:* ${sku}
    🎨 *Color/Acabado:* ${color || "Estándar"}
    📐 *Medida/Tamaño:* ${size || "Estándar"}
    🔢 *Cantidad:* ${quantity}
    💰 *Precio Total:* $${(finalPrice * quantity).toLocaleString("es-EC", {
      minimumFractionDigits: 2,
    })}`;

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
        <span className="text-4xl font-bold text-[#111827] dark:text-white ">
          $
          {finalPrice.toLocaleString("es-EC", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        {discount && discount > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 line-through font-bold">
              $
              {price.toLocaleString("es-EC", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-[10px] font-black bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 px-2 py-0.5 rounded-full uppercase -wider">
              -{discount}% OFF
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-1">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          Cantidad limitada
        </span>
        <div className="flex items-center gap-1">
          <span>Plazo de entrega {deliveryText}</span>
          <span className="w-4 h-4 rounded-full border border-zinc-400 text-[10px] flex items-center justify-center font-bold">
            i
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap md:flex-nowrap">
        <div className="relative shrink-0">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="appearance-none h-12 pl-4 pr-8 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white cursor-pointer hover:border-zinc-900 dark:hover:border-white transition-colors"
            aria-label="Seleccionar cantidad"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
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
          className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 ${
            isInCart
              ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-400"
              : "bg-[#141414] text-white hover:bg-[#252525] hover:shadow-lg hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 active:scale-[0.98]"
          }`}
        >
          <span>{isInCart ? "En la cesta" : "Añadir a la cesta"}</span>
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          title="Comprar por WhatsApp"
          className="h-12 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 text-xs font-extrabold transition-all shadow-xs shrink-0 active:scale-95"
        >
          <Whatsapp className="w-4.5 h-4.5 text-white" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={onToggleFav}
          className="w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white hover:border-zinc-900 dark:hover:border-white transition-colors shrink-0"
          aria-label="Agregar a favoritos"
        >
          {isFav ? (
            <HeartFilled className="w-5 h-5 text-red-500" />
          ) : (
            <Heart className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
