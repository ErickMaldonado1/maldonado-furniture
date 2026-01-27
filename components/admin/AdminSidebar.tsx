"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: HiOutlineChartBar },
  { name: "Productos", href: "/admin/products", icon: HiOutlineCube },
  {
    name: "Nuevo Producto",
    href: "/admin/products/new",
    icon: HiOutlinePlusCircle,
  },
  { name: "Pedidos", href: "/admin/orders", icon: HiOutlineShoppingBag },
  { name: "Usuarios", href: "/admin/users", icon: HiOutlineUsers },
  { name: "Ajustes", href: "/admin/settings", icon: HiOutlineCog6Tooth },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#0D0D0D] border-r border-zinc-200 dark:border-zinc-800 hidden lg:flex flex-col">
      <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
        <Link
          href="/"
          className="text-2xl font-black uppercase tracking-tighter hover:text-[#4A3728] transition-colors"
        >
          Maldonado <span className="text-[#4A3728]">Furniture</span>
        </Link>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mt-2">
          Panel de Control
        </p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                isActive
                  ? "bg-[#4A3728] text-white shadow-lg shadow-[#4A3728]/20"
                  : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Icon className="text-xl" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-zinc-100 dark:border-zinc-800">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase text-xs tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
        aria-label="close">
          <HiOutlineArrowLeftOnRectangle className="text-xl" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
