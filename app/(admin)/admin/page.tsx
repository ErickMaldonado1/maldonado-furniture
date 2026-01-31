import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import { AdminService } from "@/features/admin/admin.service";
import Link from "next/link";
import {
  Package,
  AlertTriangle,
  ArrowRight,
  Layers,
  LayoutDashboard,
} from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const stats = await AdminService.getDashboardStats();
  const recentOrders = await AdminService.getRecentOrders();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080808] pt-12 md:pt-24 pb-12 transition-colors">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/50 pb-6">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
              Panel de{" "}
              <span className="text-[#4A3728] dark:text-[#A6866A]">
                Administración
              </span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Bienvenido, {session.user.name || "Admin"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 transition-all"
            >
              Tienda
            </Link>
            <Link
              href="/admin/products/new"
              className="bg-[#4A3728] dark:bg-[#A6866A] text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition shadow-lg shadow-[#4A3728]/20 dark:shadow-none"
            >
              + Nuevo Producto
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Productos"
            value={stats.totalProducts}
            icon={<Package size={18} />}
            accent="blue"
            description="Activos"
          />
          <StatCard
            title="Pedidos"
            value={stats.totalOrders}
            icon={<Layers size={18} />}
            accent="emerald"
            description="Completados"
          />
          <StatCard
            title="Usuarios"
            value={stats.totalUsers}
            icon={<AlertTriangle size={18} />}
            accent="amber"
            description="Clientes"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ActionCard
            title="Gestión de Inventario"
            desc="Control total de stock y catálogo."
            href="/admin/products"
            icon={<Package size={20} />}
          />
          <ActionCard
            title="Gestión de Pedidos"
            desc="Logística y estados de envío."
            href="/admin/orders"
            icon={<LayoutDashboard size={20} />}
          />
        </div>

        <div className="bg-white dark:bg-[#111111] rounded-xl border border-zinc-200 dark:border-zinc-800/60 overflow-hidden shadow-sm">
          <div className="p-5 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/50">
            <h2 className="text-sm font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
              Actividad Reciente
            </h2>
            <Link
              href="/admin/orders"
              className="text-[10px] font-bold text-[#4A3728] dark:text-[#A6866A] hover:underline uppercase"
            >
              Historial completo
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50">
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Cliente</th>
                  <th className="py-3 px-6">Estado</th>
                  <th className="py-3 px-6 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono text-[10px] text-zinc-400">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      {order.user.name || order.user.email.split("@")[0]}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                          order.status === "PAID"
                            ? "bg-emerald-50 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-500 border-emerald-100 dark:border-emerald-500/10"
                            : "bg-amber-50 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500 border-amber-100 dark:border-amber-500/10"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-sm font-black text-zinc-900 dark:text-zinc-100">
                      ${order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, accent, description }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/10",
    emerald:
      "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10",
    amber:
      "text-amber-500 bg-amber-50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/10",
  };

  return (
    <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/60 flex items-center gap-5">
      <div className={`p-3 rounded-lg border ${colors[accent]}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
            {value}
          </span>
          <span className="text-xs text-zinc-500 italic">{description}</span>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, href, icon }: any) {
  return (
    <Link
      href={href}
      className="group bg-white dark:bg-[#111111] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/60 hover:border-[#4A3728] dark:hover:border-[#A6866A] transition-all flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="text-zinc-400 group-hover:text-[#4A3728] dark:group-hover:text-[#A6866A] transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-zinc-500">{desc}</p>
        </div>
      </div>
      <ArrowRight
        size={18}
        className="text-zinc-300 group-hover:text-[#4A3728] dark:group-hover:text-[#A6866A] transition-all transform group-hover:translate-x-1"
      />
    </Link>
  );
}
