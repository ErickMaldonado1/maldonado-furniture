"use client";

import { Minus, Plus, ShoppingBag, Whatsapp } from "@/utils/icons/index";

interface ProductActionsProps {
  productName: string;
  quantity: number;
  setQuantity: (q: number) => void;
  onAddToCart: () => void;
  price: number;
  finalPrice: number;
  discount?: number | null;
  stock?: number;
  isInCart?: boolean;
}

export function ProductActions({
  productName,
  quantity,
  setQuantity,
  onAddToCart,
  price,
  finalPrice,
  discount,
  stock = 100,
  isInCart = false,
}: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-8 mt-10 border-t border-zinc-100 dark:border-zinc-800 pt-10">
      {/* Precio y Selector de Cantidad - MISMA LÍNEA */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white italic">
              ${finalPrice.toLocaleString()}
            </span>
            {discount && discount > 0 && (
              <span className="text-sm text-zinc-400 line-through decoration-zinc-500/30">
                ${price.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Precio Final
          </span>
        </div>

        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full h-12 w-32 justify-between px-1 bg-white dark:bg-zinc-900/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            disabled={quantity <= 1}
          >
            <Minus width={14} height={14} />
          </button>
          <span className="font-black text-sm tabular-nums text-zinc-900 dark:text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(quantity + 1, 10))}
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Plus width={14} height={14} />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={isInCart ? undefined : onAddToCart}
          disabled={isInCart}
          className={`flex-1 h-14 rounded-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] group ${
            isInCart
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500"
              : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xl"
          }`}
        >
          <span>{isInCart ? "En el carrito" : "Añadir"}</span>
          <ShoppingBag className="text-lg" />
        </button>

        <button
          onClick={() =>
            window.open(
              `https://wa.me/593959504842?text=Hola, estoy interesado en el producto: ${productName}.`,
              "_blank",
            )
          }
          className="w-14 h-14 rounded-full flex items-center justify-center border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all active:scale-[0.98]"
          title="Pedir por WhatsApp"
        >
          <Whatsapp width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
