import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { AdminService } from "@/features/admin/admin.service";
import Link from "next/link";
import {
  Package,
  ArrowRight,
  ShoppingBag,
  Users,
  DollarSign,
  Palette,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Store,
} from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const stats = await AdminService.getDashboardStats();
  const recentOrders = await AdminService.getRecentOrders();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#4A3728]/10 text-[#4A3728] dark:bg-[#A6866A]/20 dark:text-[#A6866A]">
              Panel de Control CMS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mt-1">
            Gestión Operativa{" "}
            <span className="text-[#4A3728] dark:text-[#A6866A]">
              Muebles Maldonado
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-0.5 font-normal">
            Bienvenido, <strong className="text-zinc-700 dark:text-zinc-200">{session?.user.name || "Administrador"}</strong>. Resumen integral de catálogo, pedidos y métricas comerciales en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Store size={15} />
            Ver Tienda
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#4A3728] dark:bg-[#A6866A] text-white dark:text-black hover:opacity-95 shadow-sm shadow-[#4A3728]/20 transition-all"
          >
            <PlusCircle size={15} />
            Nuevo Producto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Ventas Confirmadas
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            ${stats.totalRevenue.toLocaleString("es-EC", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Pedidos pagados y completados
          </p>
        </div>

        <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Pedidos Totales
            </span>
            <div className="p-2.5 rounded-xl bg-[#4A3728]/10 dark:bg-[#A6866A]/20 text-[#4A3728] dark:text-[#A6866A]">
              <ShoppingBag size={18} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {stats.totalOrders}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs font-medium text-zinc-500">
            <span className="text-amber-600 dark:text-amber-400 font-bold">{stats.pendingOrders} pend.</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.paidOrders} pagados</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Catálogo de Muebles
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Package size={18} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {stats.totalProducts}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.activeProducts} activos</span>
            <span>•</span>
            <span className="text-zinc-400">{stats.inactiveProducts} inactivos</span>
          </p>
        </div>

        <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Clientes y Suscriptores
            </span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <Users size={18} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {stats.totalUsers}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1.5">
            <span>{stats.clientUsers} clientes</span>
            <span>•</span>
            <span>{stats.totalSubscribers} newsletter</span>
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Estado de Pedidos en Taller
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Flujo logístico desde cotización/pago hasta entrega final
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#4A3728] dark:text-[#A6866A] hover:underline flex items-center gap-1"
          >
            Administrar pedidos
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400">Pendientes</span>
              <Clock size={16} className="text-amber-600" />
            </div>
            <p className="text-xl font-extrabold text-amber-950 dark:text-amber-200 mt-1">
              {stats.pendingOrders}
            </p>
            <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5">Por procesar</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Pagados</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <p className="text-xl font-extrabold text-emerald-950 dark:text-emerald-200 mt-1">
              {stats.paidOrders}
            </p>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">En fabricación</p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-400">Completados</span>
              <Package size={16} className="text-blue-600" />
            </div>
            <p className="text-xl font-extrabold text-blue-950 dark:text-blue-200 mt-1">
              {stats.completedOrders}
            </p>
            <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-0.5">Instalados / Entregados</p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Cancelados</span>
              <AlertCircle size={16} className="text-zinc-400" />
            </div>
            <p className="text-xl font-extrabold text-zinc-800 dark:text-zinc-200 mt-1">
              {stats.cancelledOrders}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">Anulados</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Módulos de Gestión CMS
          </h2>
          <span className="text-xs text-zinc-400 font-normal">
            Acceso directo a herramientas operativas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products"
            className="group p-5 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-[#4A3728] dark:hover:border-[#A6866A] transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-[#4A3728] group-hover:text-white dark:group-hover:bg-[#A6866A] dark:group-hover:text-black transition-colors">
                <Package size={20} />
              </div>
              <ArrowRight size={16} className="text-zinc-300 group-hover:text-[#4A3728] dark:group-hover:text-[#A6866A] transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Catálogo de Productos
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Filtros por categoría ({stats.categoriesCount}), subcategorías ({stats.subcategoriesCount}) y stock.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/products/new"
            className="group p-5 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-[#4A3728] dark:hover:border-[#A6866A] transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-[#4A3728] group-hover:text-white dark:group-hover:bg-[#A6866A] dark:group-hover:text-black transition-colors">
                <PlusCircle size={20} />
              </div>
              <ArrowRight size={16} className="text-zinc-300 group-hover:text-[#4A3728] dark:group-hover:text-[#A6866A] transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Nuevo Producto
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Creación con medidas, grosores de melamina, colores y fotos.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/colors"
            className="group p-5 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-[#4A3728] dark:hover:border-[#A6866A] transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-[#4A3728] group-hover:text-white dark:group-hover:bg-[#A6866A] dark:group-hover:text-black transition-colors">
                <Palette size={20} />
              </div>
              <ArrowRight size={16} className="text-zinc-300 group-hover:text-[#4A3728] dark:group-hover:text-[#A6866A] transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Muestrario de Melaminas
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {stats.totalColors} acabados registrados de Pelikano, Edimca y Masisa.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="group p-5 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-[#4A3728] dark:hover:border-[#A6866A] transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-[#4A3728] group-hover:text-white dark:group-hover:bg-[#A6866A] dark:group-hover:text-black transition-colors">
                <Users size={20} />
              </div>
              <ArrowRight size={16} className="text-zinc-300 group-hover:text-[#4A3728] dark:group-hover:text-[#A6866A] transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                Usuarios y Permisos
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Roles de administrador ({stats.adminUsers}) y cartera de clientes ({stats.clientUsers}).
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 overflow-hidden shadow-xs">
        <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/60">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Actividad Reciente de Pedidos
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Últimas órdenes ingresadas a través del checkout y cotizaciones
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#4A3728] dark:text-[#A6866A] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            Ver todas las órdenes ({stats.totalOrders})
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 text-zinc-400 uppercase font-semibold">
                  <th className="py-3 px-5">Pedido</th>
                  <th className="py-3 px-5">Cliente</th>
                  <th className="py-3 px-5">Ciudad / Envío</th>
                  <th className="py-3 px-5">Artículos</th>
                  <th className="py-3 px-5">Estado</th>
                  <th className="py-3 px-5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
                {recentOrders.map((order) => {
                  const statusColors: Record<string, string> = {
                    PENDING: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/40",
                    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/40",
                    COMPLETED: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/40",
                    CANCELLED: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
                  };

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors"
                    >
                      <td className="py-4 px-5 font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300">
                        #{order.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-4 px-5">
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {order.fullName || order.user?.name || "Cliente"}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {order.email || order.user?.email || "Sin email"}
                        </p>
                      </td>
                      <td className="py-4 px-5 text-zinc-600 dark:text-zinc-400">
                        {order.city || "Quito"}
                      </td>
                      <td className="py-4 px-5 text-zinc-600 dark:text-zinc-400">
                        {order.items.length} {order.items.length === 1 ? "artículo" : "artículos"}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${
                            statusColors[order.status] || "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {order.status === "PENDING"
                            ? "Pendiente"
                            : order.status === "PAID"
                            ? "Pagado"
                            : order.status === "COMPLETED"
                            ? "Completado"
                            : "Cancelado"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right font-bold text-zinc-900 dark:text-zinc-100">
                        ${order.total.toLocaleString("es-EC", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <ShoppingBag size={36} className="mx-auto text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              No hay pedidos registrados todavía
            </p>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Cuando los clientes completen órdenes en la tienda pública o soliciten cotizaciones, aparecerán aquí automáticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
