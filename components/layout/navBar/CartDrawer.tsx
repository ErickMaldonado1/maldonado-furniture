"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/store/cart-store";
import Drawer from "@/components/ui/Drawer";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items }) => {
  const { removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Mi Carrito (${items.length})`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 my-auto">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400">
                <HiOutlineShoppingCart size={30} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-zinc-900 dark:text-white">
                  Tu carrito está vacío
                </p>
                <p className="text-zinc-500 text-sm">
                  ¡Agrega algunos muebles increíbles!
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-bold text-sm"
              >
                Explorar Tienda
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.variantId || "base"}`}
                className="flex gap-4 group"
              >
                <div className="w-24 h-24 relative shrink-0 rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={item.image || "/icons/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link href={`/productos/${item.id}`} onClick={onClose}>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight hover:underline">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[#4A3728] dark:text-[#D4BAA5] mt-1">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg h-8">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="w-8 h-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-l-lg transition"
                      >
                        <HiOutlineMinus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-zinc-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-r-lg transition"
                      >
                        <HiOutlinePlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-900 dark:text-white font-black text-xl">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-[#4A3728] hover:bg-[#3D2C1F] text-white rounded-sm font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
              Proceder al Pago
            </button>
            <p className="text-center text-xs text-zinc-400 mt-3">
              Envío calculado en el siguiente paso
            </p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
