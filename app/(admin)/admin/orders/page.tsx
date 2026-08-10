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
  Calendar,
} from "lucide-react";
import { OrderStatusManager } from "./OrderStatusManager";
import { DeleteOrderBtn } from "./DeleteOrderBtn";

type OrderWithDetails = {
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  notes?: string | null;
};

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
    <div className="min-h-screen bg-zinc-50/50 dark:bg-[#050505] pt-24 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header section */}
        <div className="flex flex-col gap-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-[#4A3728] dark:hover:text-[#A6866A] transition-colors w-fit group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Volver al Panel
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Gestión de{" "}
                <span className="text-[#4A3728] dark:text-[#A6866A]">
                  Órdenes
                </span>
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
                Revisa y administra todos los pedidos realizados en la tienda.
              </p>
            </div>
            <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              Total: {orders.length} {orders.length === 1 ? "orden" : "órdenes"}
            </span>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Order Header Bar */}
              <div className="bg-zinc-50/80 dark:bg-zinc-900/90 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#4A3728] dark:text-[#D4A373] bg-[#4A3728]/10 dark:bg-[#A6866A]/15 px-2.5 py-1 rounded-lg">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <Calendar size={13} className="text-zinc-400" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <p className="text-[12px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      Total del Pedido
                    </p>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      $
                      {order.total.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <OrderStatusManager
                      orderId={order.id}
                      initialStatus={order.status}
                    />
                    <DeleteOrderBtn orderId={order.id} />
                  </div>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Customer Information Column */}
                <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800/80 space-y-5 bg-zinc-50/30 dark:bg-transparent">
                  {/* Customer Name & Email */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                      <User
                        size={14}
                        className="text-[#4A3728] dark:text-[#A6866A]"
                      />
                      Cliente
                    </h3>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {(order as OrderWithDetails).fullName ||
                          order.user?.name ||
                          "Cliente no registrado"}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                        {(order as OrderWithDetails).email ||
                          order.user?.email ||
                          "Sin email"}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                      <Phone
                        size={14}
                        className="text-[#4A3728] dark:text-[#A6866A]"
                      />
                      Teléfono
                    </h3>
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {(order as OrderWithDetails).phone || "No especificado"}
                    </p>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                      <MapPin
                        size={14}
                        className="text-[#4A3728] dark:text-[#A6866A]"
                      />
                      Dirección de Envío
                    </h3>
                    <div>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-normal">
                        {(order as OrderWithDetails).address ||
                          "Dirección no especificada"}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                        {[
                          (order as OrderWithDetails).city,
                          (order as OrderWithDetails).postalCode,
                        ]
                          .filter(Boolean)
                          .join(" • ") || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                        <ClipboardList
                          size={14}
                          className="text-[#4A3728] dark:text-[#A6866A]"
                        />
                        Notas del Cliente
                      </h3>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 leading-relaxed">
                        &ldquo;{(order as OrderWithDetails).notes}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Products List Column */}
                <div className="lg:col-span-8 p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                    <Package
                      size={14}
                      className="text-[#4A3728] dark:text-[#A6866A]"
                    />
                    Productos Pedidos ({order.items.length})
                  </h3>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-zinc-50/60 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 transition-colors"
                      >
                        <div className="w-10 h-10 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center shrink-0 shadow-2xs">
                          <Package className="text-zinc-400" size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {item.variant?.product?.name ||
                              "Producto no encontrado"}
                          </p>
                          <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 flex flex-wrap gap-x-2">
                            <span>
                              SKU:{" "}
                              <code className="font-mono text-[10px] text-zinc-700 dark:text-zinc-300">
                                {item.variant?.sku || "N/A"}
                              </code>
                            </span>
                            <span>•</span>
                            <span>
                              Color:{" "}
                              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                                {item.variant?.color || "Estándar"}
                              </strong>
                            </span>
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                            {item.quantity} × $
                            {item.price.toLocaleString("es-ES", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                          <p className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                            $
                            {(item.quantity * item.price).toLocaleString(
                              "es-ES",
                              { minimumFractionDigits: 2 }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {orders.length === 0 && (
            <div className="py-20 text-center space-y-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Package
                size={40}
                className="mx-auto text-zinc-300 dark:text-zinc-700"
              />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                No hay órdenes registradas en el sistema.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
