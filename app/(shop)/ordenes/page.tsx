import { ArrowLeft, Package, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";

const statusColors = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusLabels = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/ordenes");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
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
    <main className="min-h-screen pt-28 pb-20 bg-zinc-50 dark:bg-[#050505] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#4A3728] transition-colors mb-6 w-fit"
          >
            <ArrowLeft size={14} />
            Volver a la tienda
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            Mis <span className="text-[#4A3728]">Pedidos</span>
          </h1>
          <p className="mt-2 text-zinc-500 font-medium uppercase text-xs tracking-[0.2em]">
            Sigue el estado de tus compras y coordinaciones
          </p>
        </header>

        <div className="space-y-8">
          {orders.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <Package
                size={48}
                className="mx-auto text-zinc-200 dark:text-zinc-800 mb-4"
              />
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 font-black italic">
                Aún no has realizado ningún pedido
              </p>
              <Link
                href="/shop"
                className="inline-block mt-8 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#4A3728] transition-all"
              >
                Explorar Productos
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="px-8 py-6 bg-zinc-50/50 dark:bg-white/2 flex flex-wrap items-center justify-between gap-6 border-b border-zinc-50 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A3728]/10 flex items-center justify-center text-[#4A3728]">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A3728]">
                        Orden #{(order.id as string).slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs font-bold text-zinc-400 uppercase">
                        {new Date(order.createdAt).toLocaleDateString("es-EC", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">
                        Total
                      </p>
                      <p className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter">
                        ${(order.total || 0).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${statusColors[order.status as keyof typeof statusColors] || statusColors.PENDING}`}
                    >
                      {statusLabels[
                        order.status as keyof typeof statusLabels
                      ] || "Pendiente"}
                    </span>
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-7 space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-6 group/item"
                      >
                        <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shrink-0">
                          <Package className="text-zinc-300" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-zinc-900 dark:text-white text-xs uppercase truncate group-hover/item:text-[#4A3728] transition-colors">
                            {item.variant?.product?.name ||
                              "Producto desconocido"}
                          </h4>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            {item.quantity} x ${item.price.toLocaleString()} |{" "}
                            {item.variant?.color || "Color estándar"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info de envío */}
                  <div className="md:col-span-5 bg-zinc-50 dark:bg-zinc-800/30 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={16}
                        className="text-[#4A3728] mt-1 shrink-0"
                      />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 mb-1">
                          Dirección de Entrega
                        </p>
                        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {(order as any).address ||
                            "Dirección no especificada"}
                          <br />
                          {(order as any).city || "Ciudad"},{" "}
                          {(order as any).postalCode || "CP"}
                        </p>
                      </div>
                    </div>
                    {(order as any).notes && (
                      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 mb-1">
                          Notas del pedido
                        </p>
                        <p className="text-[11px] font-medium text-zinc-500 italic">
                          "{(order as any).notes}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
