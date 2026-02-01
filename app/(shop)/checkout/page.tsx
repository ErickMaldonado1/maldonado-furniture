"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { WhatsAppModal } from "@/components/ui/WhatsApp/WhatsAppModal";
import { CreditCard, ShieldCheck, Truck, Users } from "@/utils/icons/index";
import { useRouter } from "next/navigation";

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
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState<CheckoutForm | null>(null);
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  const { data: session, status: authStatus } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push(`/login?callbackUrl=/checkout`);
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (items.length === 0 && authStatus === "authenticated") {
      router.replace("/cart");
    } else if (items.length > 0 && authStatus === "authenticated") {
      setShouldRender(true);
    }
  }, [items, router, authStatus]);

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

  if (authStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A3728]"></div>
      </div>
    );
  }

  if (!shouldRender || items.length === 0) {
    return null;
  }

  const sendWhatsAppMessage = async () => {
    if (!tempData) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tempData,
          total: getTotalPrice(),
          items: items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error saving order:", errorText);
        throw new Error("No se pudo guardar el pedido");
      }

      const orderData = await response.json();
      completeOrder(orderData.id);
    } catch (error) {
      console.error(error);
      if (
        confirm(
          "Hubo un problema registrando tu pedido en nuestro sistema, pero aún puedes confirmar directamente por WhatsApp. ¿Deseas continuar?",
        )
      ) {
        completeOrder();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeOrder = (orderId?: string) => {
    const PHONE_NUMBER = "593959504842";
    const date = new Date().toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const productList = items
      .map((item) => {
        const itemTotal = (item.price * item.quantity).toLocaleString();
        return [
          `📦 *${item.name.toUpperCase()}*`,
          `SKU: ${item.sku || "N/A"}`,
          `Detalles: ${item.variantName || "Estándar"} | ${item.materials || "Melamina"}`,
          `Cant: ${item.quantity} x $${item.price.toLocaleString()}`,
          `Subtotal: *$${itemTotal}*`,
          `--------------------------`,
        ].join("\n");
      })
      .join("\n");

    const message = [
      `*NUEVO PEDIDO WEB* 🛒`,
      orderId ? ` 🆔 Orden ID: #${orderId.slice(-6).toUpperCase()}` : "",
      ` 📅 Fecha: ${date}`,
      `\n 👤 *CLIENTE*`,
      `Nombre: ${tempData?.fullName}`,
      `Ciudad: ${tempData?.city}`,
      `Notas: ${tempData?.notes || "Sin notas"}`,
      `\n 🛍️ *PRODUCTOS*`,
      `--------------------------`,
      productList,
      `\n 💰 *RESUMEN*`,
      `Envío: GRATIS 🚚`,
      `*TOTAL A PAGAR: $${getTotalPrice().toLocaleString()}*`,
      `\n ✅ Hola, deseo confirmar el pago de mi pedido.`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    setShowModal(false);
    router.push("/");
  };

  const onSubmit = (data: CheckoutForm) => {
    setTempData(data);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0b0b0b] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12">
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
                  Ingresa tus datos de solicitud de pedido y envío
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
                    className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
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
                    className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
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
                  className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-[#4A3728]/20 transition-all font-medium"
                />
                {errors.address && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Ciudad
                  </label>
                  <input
                    {...register("city")}
                    className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Código Postal
                  </label>
                  <input
                    {...register("postalCode")}
                    className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Teléfono
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full h-11 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Notas (Opcional)
                </label>
                <textarea
                  {...register("notes")}
                  className="w-full h-24 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#4A3728]/20"
                />
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600">
                <CreditCard width={20} height={20} />
              </div>
              <div>
                <h2 className="text-xl font-black">Método de Pago</h2>
                <p className="text-sm text-zinc-500">
                  Gestión directa vía WhatsApp
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
                  Finalizaremos el pago mediante transferencia bancaria tras el
                  contacto.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 mt-12 lg:mt-0">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 sticky top-24">
            <h2 className="text-xl font-black mb-6">Resumen del Pedido</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variantId}`}
                  className="flex gap-4"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
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
                    <h4 className="text-sm font-bold truncate">{item.name}</h4>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">
                      SKU: {item.sku || "N/A"}
                    </p>
                    <p className="text-sm font-bold text-[#4A3728] mt-1">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-end">
                <span className="text-base font-black">Total</span>
                <span className="text-2xl font-black text-[#4A3728]">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full mt-8 h-12 flex items-center justify-center gap-2 rounded-full bg-[#4A3728] text-white font-bold hover:bg-[#3A2B20] active:scale-[0.98] transition-all shadow-lg shadow-[#4A3728]/20 uppercase text-xs tracking-widest"
            >
              <span>Confirmar Pedido</span>
              <Truck width={18} height={18} />
            </button>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={sendWhatsAppMessage}
        customerName={tempData?.fullName}
        total={getTotalPrice()}
        isLoading={isSubmitting}
      />
    </div>
  );
}
