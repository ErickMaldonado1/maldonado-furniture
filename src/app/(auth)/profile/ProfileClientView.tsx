"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  ShoppingBag,
  Heart,
  BadgeCheck,
  Clock,
  ArrowRight,
  Edit2,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Package,
  Layers,
  Users,
  Palette,
  LayoutDashboard,
} from "lucide-react";
import { updateUserProfile } from "@/features/users/user.actions";
import { toast } from "sonner";

interface ProfileClientViewProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    role: "USER" | "ADMIN";
    createdAt: Date;
    _count: {
      orders: number;
      favorites: number;
    };
    orders: Array<{
      id: string;
      total: number;
      status: string;
      createdAt: Date;
    }>;
  };
}

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

export function ProfileClientView({ user }: ProfileClientViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : user.email[0].toUpperCase();

  const memberSince = new Date(user.createdAt).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await updateUserProfile({
      name,
      phone,
    });

    if (res.success) {
      setSuccessMsg("Perfil actualizado correctamente.");
      setIsEditing(false);
      toast.success("Tus datos personales han sido actualizados.");
      setTimeout(() => setSuccessMsg(null), 5000);
    } else {
      setErrorMsg(res.error || "No se pudo actualizar el perfil.");
    }
    setLoading(false);
  };

  const isAdmin = user.role === "ADMIN";

  return (
    <div className="space-y-6">
     
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4A3728] via-[#A6866A] to-[#D4A373]" />

        <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#4A3728] to-[#8B735B] flex items-center justify-center shadow-lg text-white">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight">
                {initials}
              </span>
            </div>
            {isAdmin && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-zinc-900 text-white" title="Administrador Autorizado">
                <ShieldCheck size={16} />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white truncate">
                {name || "Sin nombre registrado"}
              </h1>
              {isAdmin ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-500/20 w-fit mx-auto sm:mx-0">
                  <ShieldCheck size={13} />
                  Administrador CMS
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4A3728]/10 text-[#4A3728] dark:text-[#D4B896] text-xs font-bold uppercase tracking-wider rounded-full border border-[#4A3728]/20 w-fit mx-auto sm:mx-0">
                  <BadgeCheck size={13} />
                  Cliente Registrado
                </span>
              )}
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium mb-6">
              {user.email}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                <ShoppingBag size={16} className="text-[#A6866A]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Pedidos
                  </p>
                  <p className="text-base font-bold text-zinc-900 dark:text-white leading-none">
                    {user._count.orders}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                <Heart size={16} className="text-rose-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Favoritos
                  </p>
                  <p className="text-base font-bold text-zinc-900 dark:text-white leading-none">
                    {user._count.favorites}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
                <CalendarDays size={16} className="text-blue-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Miembro desde
                  </p>
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-none mt-0.5">
                    {memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      {isAdmin && (
        <div className="bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-transparent dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900 p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <LayoutDashboard size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  Consola de Administración Empresarial
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Acceso privilegiado al control de catálogo, ventas y usuarios
                </p>
              </div>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4A3728] hover:bg-[#3D2C1F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm w-fit"
            >
              <span>Abrir CMS Admin</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <Link
              href="/admin/products"
              className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-[#4A3728] transition-all group flex items-center gap-3"
            >
              <Package size={18} className="text-[#4A3728] dark:text-[#A6866A] group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-900 dark:text-white block truncate">Inventario</span>
                <span className="text-xs text-zinc-500 block truncate">Ver productos</span>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-[#4A3728] transition-all group flex items-center gap-3"
            >
              <Layers size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-900 dark:text-white block truncate">Pedidos</span>
                <span className="text-xs text-zinc-500 block truncate">Gestionar órdenes</span>
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-[#4A3728] transition-all group flex items-center gap-3"
            >
              <Users size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-900 dark:text-white block truncate">Usuarios</span>
                <span className="text-xs text-zinc-500 block truncate">Cuentas y roles</span>
              </div>
            </Link>

            <Link
              href="/admin/colors"
              className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-[#4A3728] transition-all group flex items-center gap-3"
            >
              <Palette size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-zinc-900 dark:text-white block truncate">Colores</span>
                <span className="text-xs text-zinc-500 block truncate">Pelikano / Edimca</span>
              </div>
            </Link>
          </div>
        </div>
      )}

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <User size={16} className="text-[#4A3728] dark:text-[#A6866A]" />
              Datos de Cuenta
            </h2>
            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A3728] dark:text-[#D4B896] hover:underline"
            >
              <Edit2 size={13} />
              <span>{isEditing ? "Cancelar" : "Editar"}</span>
            </button>
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                  Teléfono Celular
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 0991234567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#4A3728] focus:ring-1 focus:ring-[#4A3728]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-10 rounded-xl bg-[#4A3728] hover:bg-[#3D2C1F] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
                  <User size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                    Nombre Registrado
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {user.name || "No especificado"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                    Correo Electrónico
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {user.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                    Teléfono Celular
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {user.phone || "No registrado"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                    Tipo de Cuenta
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {isAdmin ? "Administrador General" : "Usuario Cliente"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#4A3728] dark:text-[#A6866A]" />
              Accesos Rápidos
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              href="/cart"
              className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-[#4A3728] dark:hover:border-[#A6866A] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4A3728]/10 text-[#4A3728] dark:text-[#D4B896] flex items-center justify-center">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#4A3728] transition-colors">
                    Ver Carrito de Compras
                  </h3>
                  <p className="text-xs text-zinc-500">Revisa tus productos y muebles a medida seleccionados</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cuidados"
              className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-[#4A3728] dark:hover:border-[#A6866A] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BadgeCheck size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#4A3728] transition-colors">
                    Guía de Mantenimiento
                  </h3>
                  <p className="text-xs text-zinc-500">Consejos para conservar muebles de melamina</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contacto"
              className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-[#4A3728] dark:hover:border-[#A6866A] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#4A3728] transition-colors">
                    Contacto y Cita Previa
                  </h3>
                  <p className="text-xs text-zinc-500">Visita nuestra fábrica en Norte de Quito, Secot Condado Alto</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {user.orders.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <Clock size={16} className="text-[#4A3728] dark:text-[#A6866A]" />
              Pedidos Recientes
            </h2>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {user.orders.map((order) => (
              <div
                key={order.id}
                className="px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#4A3728]/10 text-[#4A3728] flex items-center justify-center shrink-0">
                    <ShoppingBag size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      Orden #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-zinc-500">
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
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                      statusColors[order.status] || statusColors.PENDING
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
    </div>
  );
}
