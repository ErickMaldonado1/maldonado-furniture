import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-600 dark:text-zinc-400 pt-24 pb-4 transition-colors">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-white/5">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={14} />
            Volver al Panel
          </Link>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter ">
            Gestión de Órdenes
          </h1>
        </div>

        <div className="bg-zinc-50 dark:bg-[#0a0a0a] rounded-full border border-zinc-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl relative">
          <div className="absolute inset-0 bg-radial-gradient from-zinc-200/50 dark:from-white/5 to-transparent pointer-events-none opacity-50" />

          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px]  text-zinc-500 border-b border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02]">
                  <th className="py-5 px-6 font-black">ID</th>
                  <th className="py-5 px-6 font-black">Cliente</th>
                  <th className="py-5 px-6 font-black">Fecha</th>
                  <th className="py-5 px-6 font-black">Total</th>
                  <th className="py-5 px-6 font-black">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-100 dark:hover:bg-white/[0.03] transition-all duration-300 group cursor-default"
                  >
                    <td className="py-6 px-6 font-mono text-[9px] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight">
                          {order.user.name || "Sin nombre"}
                        </span>
                        <span className="text-[10px] text-zinc-500 lowercase">
                          {order.user.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-[11px] font-medium text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </td>
                    <td className="py-6 px-6">
                      <span className="text-[14px] font-black text-zinc-900 dark:text-white italic tracking-tighter">
                        ${order.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                          order.status === "PAID"
                            ? "bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-500 border-emerald-500/20"
                            : order.status === "PENDING"
                              ? "bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500 border-amber-500/20"
                              : "bg-red-500/10 dark:bg-red-500/5 text-red-600 dark:text-red-500 border-red-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600 italic"
                    >
                      No hay órdenes registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
