import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Package,
  ClipboardList,
} from "lucide-react";
import { OrderStatusManager } from "./OrderStatusManager";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-24 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-white/10 pb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#4A3728] transition-colors w-fit"
          >
            <ArrowLeft size={14} />
            Volver al Panel
          </Link>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase">
            Gestión de <span className="text-[#4A3728]">Órdenes</span>
          </h1>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Header de la Orden */}
              <div className="bg-zinc-50 dark:bg-white/2 px-8 py-6 flex flex-wrap items-center justify-between gap-6 border-b border-zinc-200 dark:border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]/60 bg-[#4A3728]/5 px-2 py-0.5 rounded">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                    <span className="text-zinc-400 font-bold text-xs uppercase italic">
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                      Total del Pedido
                    </p>
                    <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter italic">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>
                  <OrderStatusManager
                    orderId={order.id}
                    initialStatus={order.status}
                  />
                </div>
              </div>

              {/* Contenido de la Orden */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Info del Cliente */}
                <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-white/5 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                      <User size={14} className="text-[#4A3728]" />
                      Cliente
                    </h3>
                    <div className="space-y-1">
                      <p className="text-[15px] font-black text-zinc-900 dark:text-white uppercase">
                        {(order as any).fullName || "Cliente no registrado"}
                      </p>
                      <p className="text-[11px] font-medium text-zinc-500 lowercase">
                        {(order as any).email ||
                          order.user?.email ||
                          "Sin email"}
                      </p>
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                      <Phone size={14} className="text-[#4A3728]" />
                      Contacto
                    </h3>
                    <p className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                      {(order as any).phone || "No especificado"}
                    </p>
                  </div>

                  {/* Dirección */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                      <MapPin size={14} className="text-[#4A3728]" />
                      Dirección
                    </h3>
                    <div className="space-y-1">
                      <p className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                        {(order as any).address || "Dirección no especificada"}
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-tighter text-zinc-500">
                        {(order as any).city || "N/A"} |{" "}
                        {(order as any).postalCode || "N/A"}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                        <ClipboardList size={14} className="text-[#4A3728]" />
                        Notas
                      </h3>
                      <p className="text-[11px] font-medium text-zinc-500 italic leading-relaxed">
                        "{(order as any).notes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Items del Pedido */}
                <div className="lg:col-span-8 p-8 space-y-6 bg-zinc-50/50 dark:bg-white/[0.01]">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                    <Package size={14} className="text-[#4A3728]" />
                    Productos ({order.items.length})
                  </h3>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-6 bg-white dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-white/5 shadow-sm"
                      >
                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center shrink-0">
                          <Package className="text-zinc-300" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-black text-zinc-900 dark:text-white uppercase truncate">
                            {item.variant?.product?.name ||
                              "Producto desconocido"}
                          </p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                            SKU: {item.variant?.sku || "N/A"} | Color:{" "}
                            {item.variant?.color || "Estándar"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#4A3728]">
                            {item.quantity} x ${item.price.toLocaleString()}
                          </p>
                          <p className="text-[13px] font-black text-zinc-900 dark:text-white mt-0.5">
                            ${(item.quantity * item.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="py-24 text-center space-y-4">
              <Package
                size={48}
                className="mx-auto text-zinc-200 dark:text-zinc-800"
              />
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 font-black italic">
                No hay órdenes registradas en el sistema
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
