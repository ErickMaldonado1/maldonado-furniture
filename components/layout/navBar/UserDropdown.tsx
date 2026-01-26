"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineCog,
} from "react-icons/hi";

interface UserDropdownProps {
  onOpenAuth: () => void;
  showSolidNavbar?: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  onOpenAuth,
  showSolidNavbar,
}) => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div
        className={`w-10 h-10 rounded-full animate-pulse ${showSolidNavbar ? "bg-zinc-200" : "bg-white/20"}`}
      />
    );
  }

  if (status === "unauthenticated") {
    return (
      <button
        onClick={onOpenAuth}
        className={`p-2.5 rounded-full group transition-all ${
          !showSolidNavbar
            ? "text-white hover:bg-white/10"
            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"
        }`}
      >
        <HiOutlineUser className="text-2xl group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  const user = session?.user;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1.5 pr-3 rounded-full transition-all border ${
          !showSolidNavbar
            ? "border-white/20 text-white hover:bg-white/10"
            : "border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#4A3728] text-white flex items-center justify-center font-bold text-sm uppercase">
          {user?.name?.[0] || user?.email?.[0] || "U"}
        </div>
        <span className="text-sm font-medium hidden md:block max-w-25 truncate">
          {user?.name?.split(" ")[0] || "Usuario"}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-64 bg-white dark:bg-zinc-900 rounded-sm shadow-xl border border-zinc-100 dark:border-zinc-800 transform transition-all duration-200 origin-top-right z-50 overflow-hidden ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
          <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
            {user?.name || "Usuario"}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {user?.email}
          </p>
          {user?.role === "ADMIN" && (
            <span className="mt-2 inline-block px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-md font-bold rounded-full uppercase tracking-wider">
              Administrador
            </span>
          )}
        </div>

        <div className="py-2">
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <HiOutlineCog size={18} />
              Panel de Administración
            </Link>
          )}

          <Link
            href="/ordenes"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <HiOutlineShoppingBag size={18} />
            Mis Pedidos
          </Link>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <HiOutlineUser size={18} />
            Mi Perfil
          </Link>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-800 p-2">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm transition-colors"
          >
            <HiOutlineLogout size={18} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
