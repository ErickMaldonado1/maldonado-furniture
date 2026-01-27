"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineTrash, HiOutlineHeart } from "react-icons/hi";
import { useFavoritesStore } from "@/store/favorites-store";
import Drawer from "@/components/ui/Drawer";
import { useCartStore } from "@/store/cart-store";

interface FavoritesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesMenu: React.FC<FavoritesMenuProps> = ({ isOpen, onClose }) => {
  const { favorites, toggleFavorite, clearFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      variantId: "base",
      variantName: "Base",
      maxStock: 99,
    } as any);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Mis Favoritos (${favorites.length})`}
    >
      <div className="flex flex-col h-full">
        {favorites.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearFavorites}
              className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              aria-label="vaciar-lista"
            >
              <HiOutlineTrash size={14} />
              Vaciar Lista
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 my-auto">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400">
                <HiOutlineHeart size={30} />
              </div>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">
                Sin favoritos aún
              </p>
              <p className="text-zinc-500 text-sm">
                ¡Guarda lo que más te guste!
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className="flex gap-4 group relative">
                <div className="w-24 h-24 relative shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <Link href={`/productos/${item.id}`} onClick={onClose}>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight hover:underline">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-bold text-[#4A3728] dark:text-[#D4BAA5] mt-1">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 self-start hover:border-[#4A3728] transition-colors"
                    aria-label="add-cart"
                  >
                    Añadir al Carrito
                  </button>
                </div>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-0 right-0 text-zinc-400 hover:text-red-500 transition-colors p-2"
                  aria-label="close-trash"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default FavoritesMenu;
