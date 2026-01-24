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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 space-y-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Panel de Administración
            </h1>
            <p className="text-slate-500 text-lg">
              Bienvenido, {session.user.name || "Admin"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-5 py-2.5 rounded-lg font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              Ver Tienda
            </Link>
            <Link
              href="/admin/products/new"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition shadow-sm"
            >
              Nuevo Producto
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Productos"
            value={stats.totalProducts}
            icon={<Package className="text-blue-600" size={24} />}
            description="En catálogo"
          />
          <StatCard
            title="Pedidos Totales"
            value={stats.totalOrders}
            icon={<Layers className="text-emerald-600" size={24} />}
            description="Procesados"
          />
          <StatCard
            title="Usuarios"
            value={stats.totalUsers}
            icon={<AlertTriangle className="text-amber-600" size={24} />}
            description="Registrados"
          />
        </div>

        <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Pedidos Recientes
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Ver todos
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-3 px-2">ID Pedido</th>
                  <th className="pb-3 px-2">Cliente</th>
                  <th className="pb-3 px-2">Estado</th>
                  <th className="pb-3 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-slate-500 italic"
                    >
                      No hay pedidos recientes.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-2 font-mono text-xs text-slate-500">
                        {order.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-4 px-2 font-bold text-slate-800">
                        {order.user.name || order.user.email}
                      </td>
                      <td className="py-4 px-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-md font-bold uppercase ${
                            order.status === "PAID"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "PENDING"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right font-bold text-slate-900">
                        ${order.total.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:shadow-md transition group">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Package size={20} /> Gestión de Inventario
            </h2>
            <p className="text-slate-600 mb-6">
              Visualiza, edita o elimina los productos actuales de tu tienda.
            </p>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all"
            >
              Ir al Inventario <ArrowRight size={18} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:shadow-md transition group">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
              <LayoutDashboard size={20} /> Gestión de Pedidos
            </h2>
            <p className="text-slate-600 mb-6">
              Revisa el estado de los envíos y procesa nuevas compras.
            </p>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all"
            >
              Ver Pedidos <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description }: any) {
  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-black text-slate-900 my-1">{value}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
