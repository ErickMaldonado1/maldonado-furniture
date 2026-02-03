"use client";
import { Whatsapp } from "@/utils/icons/social";
import { Minus} from "@/utils/icons/shop";
import { Plus } from "@/utils/icons/actions";
import { ShoppingBag } from "@/utils/icons/shop";
interface ProductActionsProps {
  productName: string;
  sku: string;
  color: string;
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
  sku,
  color,
  quantity,
  setQuantity,
  onAddToCart,
  price,
  finalPrice,
  discount,
  stock = 100,
  isInCart = false,
}: ProductActionsProps) {
  const handleWhatsApp = () => {
    const message = `👋 ¡Hola! Me interesa este producto:
    
🪑 *Producto:* ${productName}
🆔 *SKU:* ${sku}
🎨 *Color:* ${color}
🔢 *Cantidad:* ${quantity}
💰 *Precio:* $${finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}

📍 ¿Tienen disponibilidad inmediata?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/593959504842?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-8 mt-2 border-zinc-100 dark:border-zinc-800 pt-4 pb-24">
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white italic">
              $
              {finalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            {discount && discount > 0 && (
              <span className="text-md text-zinc-600 line-through decoration-[#4A3728]/40 font-bold">
                $
                {price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Precio Final
          </span>
        </div>

        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full h-12 w-32 justify-between px-1 bg-white dark:bg-zinc-900/50 transition-all hover:border-zinc-300">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white"
            disabled={quantity <= 1}
          >
            <Minus className="w-6 h-6" />
          </button>
          <span className="font-black text-sm tabular-nums text-zinc-900 dark:text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(quantity + 1, stock))}
            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={isInCart ? undefined : onAddToCart}
          disabled={isInCart}
          className={`flex-1 h-14 rounded-full flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] ${
            isInCart
              ? "bg-zinc-100 text-zinc-400"
              : "bg-black dark:bg-white text-white dark:text-black hover:bg-[#4A3728] dark:hover:bg-[#4A3728] dark:hover:text-white shadow-xl"
          }`}
        >
          <span>{isInCart ? "En el carrito" : "Añadir al Carrito"}</span>
          <ShoppingBag className="w-5 h-5" />
        </button>

        <button
          onClick={handleWhatsApp}
          aria-label="pedir-por-whastapp"
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 active:scale-90 shadow-lg shadow-green-500/10"
        >
          <Whatsapp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
