"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import {
  HiOutlineTrash,
  HiMinus,
  HiPlus,
  HiOutlineMagnifyingGlass,
  HiArrowRight,
} from "react-icons/hi2";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
    useCartStore();

  if (cart.length === 0) {
    return (
      <main className="pt-40 pb-20 min-h-screen bg-white dark:bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto relative">
            {" "}
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl" />{" "}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Tu carrito está vacío
          </h1>
          <p className="text-zinc-500 font-medium text-lg">
            Parece que aún no has añadido nada a tu selección.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-3 bg-[#4A3728] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Explorar Catálogo
            <HiArrowRight />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-zinc-50 dark:bg-[#050505] min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0D0D0D] p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-6 items-center shadow-sm"
              >
                <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={item.image || "/assets/images/placeholder.webp"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[#4A3728] font-bold text-lg mb-4">
                    ${item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full py-1 px-3 gap-4 bg-zinc-50 dark:bg-zinc-900">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="hover:text-[#4A3728] transition-colors"
                      >
                        <HiMinus />
                      </button>
                      <span className="font-black w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="hover:text-[#4A3728] transition-colors"
                      >
                        <HiPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-2xl font-black tracking-tight">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D0D0D] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                Resumen del pedido
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span>Subtotal ({getTotalItems()} productos)</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span>Envío</span>
                  <span className="text-green-500 font-bold uppercase text-xs">
                    Gratis
                  </span>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-end">
                  <span className="text-lg font-black uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-3xl font-black tracking-tighter text-[#4A3728]">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[#4A3728] dark:hover:bg-[#E7DED4] transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1">
                  Finalizar Compra
                </button>
              </Link>

              <p className="text-center mt-6 text-xs text-zinc-400 font-medium">
                Al finalizar la compra serás redirigido para completar el pago
                de forma segura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
