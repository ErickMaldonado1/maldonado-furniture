"use client";
import React, { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  ChevronLeft,
  CreditCard,
  Loading,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Users,
} from "@/utils/icons/index";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  address: z.string().min(10, "La dirección debe ser detallada"),
  city: z.string().min(3, "Ciudad inválida"),
  postalCode: z.string().min(4, "Código postal inválido"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart: items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag
              className="text-zinc-300 dark:text-zinc-700"
              width={40}
              height={40}
            />
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">
            Tu carrito está vacío
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          <Link
            href="/productos"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#4A3728] px-8 text-sm font-bold text-white shadow-lg shadow-[#4A3728]/20 hover:bg-[#3A2B20] hover:scale-105 transition-all"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            variantId: item.variantId,
          })),
          shippingDetails: data,
          total: getTotalPrice(),
        }),
      });

      if (!response.ok) throw new Error("Error al procesar la orden");

      const orderKey = await response.json();
      clearCart();
      toast.success("¡Orden creada exitosamente!");
      router.push(`/checkout/success?order=${orderKey.id}`);
    } catch (error) {
      toast.error("Hubo un error al procesar tu orden");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/cart" className="hover:text-[#4A3728] transition-colors">
            Carrito
          </Link>
          <ChevronLeft className="rotate-180 text-xs" />
          <span className="font-bold text-zinc-900 dark:text-white">
            Checkout
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#4A3728]/10 flex items-center justify-center text-[#4A3728]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                    Información de Contacto
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Ingresa tus datos para el envío
                  </p>
                </div>
              </div>

              <form
                id="checkout-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Nombre Completo
                    </label>
                    <input
                      {...register("fullName")}
                      className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                      placeholder="Ej: Juan Pérez"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                      placeholder="Ej: juan@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Dirección de Envío
                  </label>
                  <input
                    {...register("address")}
                    className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                    placeholder="Calle Principal, Número de casa, Referencia"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 font-medium">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Ciudad
                    </label>
                    <input
                      {...register("city")}
                      className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                      placeholder="Ej: Quito"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Código Postal
                    </label>
                    <input
                      {...register("postalCode")}
                      className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                      placeholder="170102"
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Teléfono
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                      placeholder="099..."
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Notas del Pedido (Opcional)
                  </label>
                  <textarea
                    {...register("notes")}
                    className="w-full h-24 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium resize-none"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <CreditCard width={20} height={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                    Método de Pago
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Todas las transacciones son seguras y encriptadas
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="text-green-500"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    Actualmente solo aceptamos pagos contra entrega o
                    transferencia bancaria directa. Un asesor te conactará para
                    finalizar el pago.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 sticky top-24">
              <h2 className="text-xl font-black text-zinc-900 dark:text-white mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variantId}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shrink-0">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-0 right-0 w-5 h-5 bg-[#4A3728] text-white text-[10px] font-bold flex items-center justify-center rounded-bl-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm font-bold text-[#4A3728] mt-1">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Envío</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-base font-black text-zinc-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-black text-[#4A3728] dark:text-[#E6CBA3]">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full mt-8 h-12 flex items-center justify-center gap-2 rounded-full bg-[#4A3728] text-white font-bold hover:bg-[#3A2B20] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide shadow-lg shadow-[#4A3728]/20"
              >
                {isProcessing ? (
                  <>
                    <Loading className="animate-spin" width={18} height={18} />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Pedido</span>
                    <Truck width={18} height={18} />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <Truck
                  className="text-zinc-400 shrink-0"
                  width={20}
                  height={20}
                />
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">
                    Garantía de Entrega:
                  </span>{" "}
                  Todos nuestros muebles incluyen envío especializado y seguro
                  contra daños.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
