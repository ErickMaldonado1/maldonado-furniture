"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/utils/icons";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: Icons.ChartBar },
  { name: "Productos", href: "/admin/products", icon: Icons.Cube },
  {
    name: "Nuevo Producto",
    href: "/admin/products/new",
    icon: Icons.PlusCircle,
  },
  { name: "Pedidos", href: "/admin/orders", icon: Icons.ShoppingBag },
  { name: "Usuarios", href: "/admin/users", icon: Icons.Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#0D0D0D] border-r border-zinc-200 dark:border-zinc-800 hidden lg:flex flex-col transition-colors">
      <nav className="mt-28 flex-1 p-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-[0.12em] transition-all ${
                isActive
                  ? "bg-[#4A3728] dark:bg-white text-white dark:text-black shadow-lg shadow-[#4A3728]/20 dark:shadow-white/5"
                  : "text-zinc-500 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Icon className="text-lg" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-zinc-100 dark:border-zinc-900">
        <button
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg font-bold uppercase text-[10px] tracking-[0.12em] text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          aria-label="Cerrar sesión"
        >
          <Icons.Logout className="text-lg" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
