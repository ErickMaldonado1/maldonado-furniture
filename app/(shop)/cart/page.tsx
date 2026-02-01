"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import {
  Trash,
  Plus,
  ArrowRight,
  Minus,
  ShoppingBag,
} from "@/utils/icons/index";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
    useCartStore();

  if (cart.length === 0) {
    return (
      <main className="pt-40 pb-20 min-h-screen bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag
              className="text-zinc-300 dark:text-zinc-700"
              width={40}
              height={40}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            Tu carrito está vacío
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
            Parece que aún no has añadido nada a tu selección.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-3 bg-[#4A3728] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Explorar Catálogo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-36 pb-20 bg-zinc-50 dark:bg-[#0b0b0b] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            Tu Carrito <span className="text-[#4A3728]">({cart.length})</span>
          </h1>
          <p className="mt-2 text-zinc-500 font-medium uppercase text-xs tracking-[0.2em]">
            Gestiona tus productos antes del checkout
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                  <Image
                    src={item.image || "/assets/images/placeholder.webp"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left space-y-3">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 mt-1">
                      <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">
                        SKU: {item.sku || "N/A"}
                      </p>
                      <p className="text-[12px] font-bold text-[#4A3728] uppercase tracking-wider">
                        Color: {item.variantName || "Estándar"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full py-1 px-3 gap-6 bg-zinc-50 dark:bg-zinc-900/50">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="text-zinc-400 hover:text-[#4A3728] transition-colors p-1"
                        aria-label="decrease"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-black w-4 text-center text-zinc-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.min(3, item.quantity + 1),
                          )
                        }
                        className={`p-1 transition-colors ${
                          item.quantity >= 3
                            ? "text-zinc-200 dark:text-zinc-800 cursor-not-allowed"
                            : "text-zinc-400 hover:text-[#4A3728]"
                        }`}
                        disabled={item.quantity >= 3}
                        aria-label="increase"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-lg font-black text-zinc-900 dark:text-white sm:hidden">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all ml-auto sm:ml-0"
                      aria-label="remove"
                    >
                      <Trash width={18} height={18} />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    Subtotal
                  </p>
                  <p className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Compra */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl sticky top-28 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4A3728]/10 flex items-center justify-center text-[#4A3728]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                  Resumen de Pedido
                </h2>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                <div className="flex justify-between text-zinc-500 font-bold uppercase text-[13px] tracking-widest">
                  <span>Productos ({getTotalItems()})</span>
                  <span className="text-zinc-900 dark:text-white">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500 font-bold uppercase text-[13px] tracking-widest">
                  <span>Envío Especializado</span>
                  <span className="text-green-600 font-black">Gratis</span>
                </div>

                <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800/50 flex justify-between items-end">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Total Estimado
                  </span>
                  <span className="text-4xl font-black tracking-tighter text-[#4A3728] dark:text-[#E6CBA3]">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block pt-4">
                <button
                  className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#4A3728] dark:hover:bg-[#E7DED4] transition-all shadow-lg hover:shadow-[#4A3728]/20 hover:-translate-y-1 flex items-center justify-center gap-3"
                  aria-label="checkout"
                >
                  Continuar al Pago
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <div className="flex items-center gap-3 justify-center text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Compra 100% Protegida
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
