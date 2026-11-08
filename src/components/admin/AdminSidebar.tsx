"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Palette,
  ShoppingBag,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard CMS",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Catálogo de Productos",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Nuevo Producto",
    href: "/admin/products/new",
    icon: PlusCircle,
  },
  {
    name: "Muestrario de Colores",
    href: "/admin/colors",
    icon: Palette,
  },
  {
    name: "Gestión de Pedidos",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Usuarios y Permisos",
    href: "/admin/users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (itemHref: string) => {
    if (itemHref === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(itemHref);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4A3728] dark:bg-[#A6866A] text-white flex items-center justify-center font-bold text-sm tracking-tighter">
              MM
            </div>
            <div>
              <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                Muebles Maldonado
              </p>
              <p className="text-xs font-medium text-[#4A3728] dark:text-[#A6866A] tracking-wider uppercase mt-0.5">
                Panel CMS
              </p>
            </div>
          </Link>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  active
                    ? "bg-[#4A3728] text-white dark:bg-[#A6866A] dark:text-black shadow-sm shadow-[#4A3728]/20"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-950 dark:hover:text-zinc-100"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={15} />
            Ver Tienda Pública
          </span>
          <span className="text-xs uppercase font-semibold tracking-wider text-zinc-400">
            Web
          </span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          aria-label="Cerrar sesión"
        >
          <LogOut size={17} className="shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#4A3728] dark:bg-[#A6866A] text-white flex items-center justify-center font-bold text-xs">
            MM
          </div>
          <div>
            <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100 leading-none">
              Muebles Maldonado
            </p>
            <p className="text-xs font-semibold text-[#4A3728] dark:text-[#A6866A] uppercase tracking-wider">
              CMS Admin
            </p>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Abrir menú de administración"
        >
          <Menu size={20} />
        </button>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-[#0A0A0A] h-full shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}

      <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#0A0A0A] border-r border-zinc-200 dark:border-zinc-800/80 hidden lg:flex flex-col shadow-xs">
        {navContent}
      </aside>
    </>
  );
}
