import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  ShoppingBag,
  Heart,
  BadgeCheck,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Mi Perfil | Muebles Maldonado",
  description: "Visualiza tu información de cuenta en Muebles Maldonado.",
};

const statusColors: Record<string, string> = {
  PENDING: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  PAID: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  COMPLETED: "text-blue-600 bg-blue-500/10 border-blue-500/20",
  CANCELLED: "text-red-500 bg-red-500/10 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
          favorites: true,
        },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          total: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const initials = user.name
    ? user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : user.email[0].toUpperCase();

  const memberSince = new Date(user.createdAt).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen pt-28 pb-20 bg-zinc-50 dark:bg-[#050505] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#4A3728] dark:hover:text-[#D4A373] transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={14} />
          Volver a la tienda
        </Link>

        {/* ── Hero Card ── */}
        <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden mb-6">
          {/* top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#4A3728] via-[#A6866A] to-[#D4A373]" />

          <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#4A3728] to-[#A6866A] flex items-center justify-center shadow-xl">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
                  {initials}
                </span>
              </div>
              {user.role === "ADMIN" && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 dark:text-white">
                  {user.name || "Sin nombre"}
                </h1>
                {user.role === "ADMIN" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-200 dark:border-purple-800">
                    <ShieldCheck size={11} />
                    Administrador
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6866A]/10 text-[#A6866A] dark:text-[#D4A373] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#A6866A]/20">
                    <BadgeCheck size={11} />
                    Cliente Verificado
                  </span>
                )}
              </div>

              <p className="text-zinc-400 dark:text-zinc-500 text-sm font-medium mb-6">
                {user.email}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <ShoppingBag size={16} className="text-[#A6866A]" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Pedidos
                    </p>
                    <p className="text-xl font-black text-zinc-900 dark:text-white leading-none">
                      {user._count.orders}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <Heart size={16} className="text-rose-400" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Favoritos
                    </p>
                    <p className="text-xl font-black text-zinc-900 dark:text-white leading-none">
                      {user._count.favorites}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <CalendarDays size={16} className="text-blue-400" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Miembro desde
                    </p>
                    <p className="text-xs font-black text-zinc-700 dark:text-zinc-300 leading-none mt-0.5">
                      {memberSince}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Account Data Card ── */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-8 pt-7 pb-4 border-b border-zinc-50 dark:border-zinc-800">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#A6866A] dark:text-[#D4A373] flex items-center gap-2">
                <User size={14} />
                Datos de la Cuenta
              </h2>
            </div>
            <div className="px-8 py-6 space-y-5">
              <InfoRow
                icon={<User size={16} className="text-zinc-400" />}
                label="Nombre completo"
                value={user.name || "No especificado"}
              />
              <InfoRow
                icon={<Mail size={16} className="text-zinc-400" />}
                label="Correo electrónico"
                value={user.email}
              />
              <InfoRow
                icon={<ShieldCheck size={16} className="text-zinc-400" />}
                label="Rol de cuenta"
                value={user.role === "ADMIN" ? "Administrador" : "Usuario"}
              />
              <InfoRow
                icon={<CalendarDays size={16} className="text-zinc-400" />}
                label="Cuenta creada"
                value={memberSince}
              />
            </div>
          </div>

          {/* ── Quick actions ── */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-8 pt-7 pb-4 border-b border-zinc-50 dark:border-zinc-800">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#A6866A] dark:text-[#D4A373] flex items-center gap-2">
                <ShoppingBag size={14} />
                Accesos Rápidos
              </h2>
            </div>
            <div className="px-8 py-6 space-y-3">
              <QuickLink
                href="/ordenes"
                icon={<ShoppingBag size={18} className="text-[#A6866A]" />}
                label="Ver mis pedidos"
                description={`${user._count.orders} ${user._count.orders === 1 ? "pedido realizado" : "pedidos realizados"}`}
              />
              <QuickLink
                href="/favoritos"
                icon={<Heart size={18} className="text-rose-400" />}
                label="Mis favoritos"
                description={`${user._count.favorites} ${user._count.favorites === 1 ? "producto guardado" : "productos guardados"}`}
              />
              <QuickLink
                href="/productos"
                icon={<BadgeCheck size={18} className="text-blue-400" />}
                label="Explorar catálogo"
                description="Descubre todos nuestros muebles"
              />
            </div>
          </div>
        </div>

        {/* ── Recent orders ── */}
        {user.orders.length > 0 && (
          <div className="mt-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="px-8 pt-7 pb-4 border-b border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#A6866A] dark:text-[#D4A373] flex items-center gap-2">
                <Clock size={14} />
                Pedidos Recientes
              </h2>
              <Link
                href="/ordenes"
                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#4A3728] dark:hover:text-[#D4A373] transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="px-8 py-5 flex items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#4A3728]/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag size={16} className="text-[#4A3728]" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                        Orden #{(order.id as string).slice(-6).toUpperCase()}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleDateString("es-EC", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-black text-zinc-900 dark:text-white">
                      ${(order.total || 0).toLocaleString()}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[order.status] || statusColors.PENDING
                        }`}
                    >
                      {statusLabels[order.status] || "Pendiente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Security note ── */}
        <div className="mt-6 px-6 py-5 bg-zinc-100/60 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
          <ShieldCheck size={18} className="text-zinc-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
            <span className="font-bold text-zinc-600 dark:text-zinc-400">Seguridad:</span>{" "}
            Para modificar tu contraseña o datos de acceso, comunícate con nuestro equipo de soporte. Los cambios sensibles de cuenta requieren verificación adicional.
          </p>
        </div>

      </div>
    </main>
  );
}

/* ── Sub-components ── */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          {label}
        </p>
        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-[#A6866A]/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-zinc-800 dark:text-zinc-200 group-hover:text-[#4A3728] dark:group-hover:text-[#D4A373] transition-colors">
          {label}
        </p>
        <p className="text-[11px] text-zinc-400 truncate">{description}</p>
      </div>
      <ArrowLeft
        size={14}
        className="text-zinc-300 rotate-180 group-hover:translate-x-1 transition-transform"
      />
    </Link>
  );
}
