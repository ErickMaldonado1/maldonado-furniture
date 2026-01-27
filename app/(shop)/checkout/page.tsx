"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import {
  HiChevronLeft,
  HiOutlineCreditCard,
  HiOutlineTruck,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCartStore();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (cart.length === 0) {
    return (
      <main className="pt-40 pb-20 min-h-screen bg-white dark:bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            No hay productos
          </h1>
          <p className="text-zinc-500 font-medium text-lg">
            Tu carrito está vacío. Agrega algunos productos para continuar.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-3 bg-[#4A3728] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:shadow-xl transition-all"
          >
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-white dark:bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors uppercase text-xs font-black tracking-widest"
          >
            <HiChevronLeft /> Volver al carrito
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-4">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <span className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
                  1
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight">
                  Información de Envío
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4A3728] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4A3728] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4A3728] transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Dirección Completa
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4A3728] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4A3728] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#4A3728] transition-colors"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <span className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
                  2
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight">
                  Método de Pago
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border-2 border-[#4A3728] rounded-xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <HiOutlineCreditCard className="text-2xl" />
                    <div>
                      <span className="block font-black text-sm">
                        Tarjeta de Crédito / Débito
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                        Visa, Mastercard, Amex
                      </span>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-[#4A3728] bg-white" />
                </div>

                <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 Transition-colors cursor-pointer opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-zinc-200 rounded flex items-center justify-center text-[8px] font-black">
                      MP
                    </div>
                    <div>
                      <span className="block font-black text-sm">
                        Mercado Pago
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                        Próximamente
                      </span>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-zinc-300" />
                </div>
              </div>
            </section>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:pl-16">
            <div className="bg-zinc-50 dark:bg-[#0D0D0D] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 sticky top-32">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                Resumen Pedido
              </h2>

              <div className="space-y-6 max-h-[40vh] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <Image
                        src={item.image || "/assets/images/placeholder.webp"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black uppercase tracking-tight leading-tight mb-1 line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
                        <span>Cant: {item.quantity}</span>
                        <span className="text-zinc-900 dark:text-white font-black">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800 mb-8">
                <div className="flex justify-between text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>Envío</span>
                  <span className="text-green-500">Gratis</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-black uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-3xl font-black tracking-tighter text-[#4A3728]">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[#4A3728] dark:hover:bg-[#E7DED4] transition-all shadow-lg hover:shadow-2xl"
              aria-label="pay-now">
                Pagar Ahora
              </button>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                  <HiOutlineShieldCheck className="text-lg" />
                  <span>Pago Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                  <HiOutlineTruck className="text-lg" />
                  <span>Envío Garantizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
