"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Cube } from "@/utils/icons/actions";
import { Users, ChartBar, PlusCircle, Logout } from "@/utils/icons/ui";
import { ShoppingBag } from "@/utils/icons/shop";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: ChartBar,
  },
  {
    name: "Ver Productos",
    href: "/admin/products",
    icon: Cube,
  },
  {
    name: "Nuevo Producto",
    href: "/admin/products/new",
    icon: PlusCircle,
  },
  {
    name: "Nuevo Color",
    href: "/admin/colors",
    icon: Cube,
  },
  {
    name: "Pedidos",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Usuarios",
    href: "/admin/users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#0A0A0A] border-r border-zinc-200 dark:border-zinc-800/80 hidden lg:flex flex-col transition-colors shadow-sm">
      <nav className="mt-28 flex-1 p-5 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" &&
              pathname.startsWith(`${item.href}/`) &&
              !(
                item.href === "/admin/products" &&
                pathname.startsWith("/admin/products/new")
              ));

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-[13px] tracking-wide transition-all group ${
                isActive
                  ? "bg-[#4A3728] dark:bg-white text-white dark:text-black shadow-md shadow-[#4A3728]/15 dark:shadow-white/10"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
              />
              <span className="whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/80">
        <button
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-[13px] tracking-wide text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all group"
          aria-label="Cerrar sesión"
        >
          <Logout className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          <span className="whitespace-nowrap">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
