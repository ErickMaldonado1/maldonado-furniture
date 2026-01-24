"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import {
  HiOutlineShoppingBag,
  HiHeart,
  HiOutlineHeart,
  HiMinus,
  HiPlus,
} from "react-icons/hi2";
import { toast } from "sonner";

export function ProductDetailClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);
  const imageUrl = product.images?.[0]?.url || "";
  const finalPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: quantity,
      image: imageUrl,
      variantId: product.variants?.[0]?.id,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-full h-12 w-32 justify-between px-4 bg-white dark:bg-[#0A0A0A]">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="hover:text-[#4A3728] transition-colors"
          >
            <HiMinus />
          </button>
          <span className="font-black text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="hover:text-[#4A3728] transition-colors"
          >
            <HiPlus />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#1A1A1A] dark:bg-white text-white dark:text-black h-12 rounded-full flex items-center justify-center gap-2 font-black uppercase tracking-widest hover:bg-[#4A3728] dark:hover:bg-[#E7DED4] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <HiOutlineShoppingBag className="text-xl" />
          Añadir al Carrito
        </button>

        <button
          onClick={() =>
            toggleFavorite({
              id: product.id,
              name: product.name,
              image: imageUrl,
              price: finalPrice,
            })
          }
          className={`h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xl transition-all ${isFav ? "text-red-500 border-red-200 bg-red-50" : "text-zinc-400 hover:border-[#4A3728] hover:text-[#4A3728]"}`}
        >
          {isFav ? <HiHeart /> : <HiOutlineHeart />}
        </button>
      </div>

      <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-lg flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <p className="text-sm text-green-700 dark:text-green-400 font-bold">
          En Stock. Envío inmediato disponible.
        </p>
      </div>
    </div>
  );
}
