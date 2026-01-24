"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { BiBed } from "react-icons/bi";
import { MdOutlineKitchen } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  isDarkMode,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: MobileMenuProps) => {
  return (
    <div
      className={`fixed inset-0 z-100 transition-opacity duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#0b0b0b] shadow transition-transform duration-500 ease-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative w-28 aspect-400/113">
            <Image
              src={
                isDarkMode
                  ? "/assets/images/logoA1.webp"
                  : "/assets/images/logoA.webp"
              }
              alt="Maldonado Furniture"
              fill
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <HiOutlineX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 py-5 space-y-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar muebles..."
                className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-sm py-3 pl-11 pr-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#4A3728]/20 border border-transparent dark:border-zinc-800"
              />
              <HiOutlineSearch
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                size={18}
              />
            </form>

            <div>
              <p className="text-md font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-3 px-1">
                Categorías
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Sala", icon: HiOutlineHome },
                  { name: "Dormitorio", icon: BiBed },
                  { name: "Cocina", icon: MdOutlineKitchen },
                  { name: "Oficina", icon: HiOutlineBriefcase },
                ].map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={`/${cat.name.toLowerCase()}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 px-3.5 py-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors border border-zinc-200/50 dark:border-zinc-800"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#4A3728]/10 dark:bg-[#4A3728]/20 flex items-center justify-center shrink-0">
                        <IconComponent className="text-[#4A3728] dark:text-[#8B6F47] text-xl" />
                      </div>
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-md font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-3 px-1">
                Navegación
              </p>
              <nav className="flex flex-col gap-1">
                {[
                  "Todas las Colecciones",
                  "Proyectos",
                  "Favoritos",
                  "Contacto",
                ].map((link) => (
                  <Link
                    key={link}
                    onClick={onClose}
                    href={
                      link === "Todas las Colecciones"
                        ? "/productos"
                        : `/${link.toLowerCase()}`
                    }
                    className="px-3.5 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
          <div className="space-y-4">
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[#4A3728] hover:text-white transition-all shadow-sm"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[#4A3728] hover:text-white transition-all shadow-sm"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://wa.me/593959504842"
                target="_blank"
                className="w-10 h-10 bg-[#4A3728] rounded-full flex items-center justify-center text-white transition-all shadow-sm"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
            <div className="space-y-1.5 text-md font-medium text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <HiOutlineMail size={14} className="shrink-0" />{" "}
                <span className="truncate">mueblesmaldonadoec@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlinePhone size={14} className="shrink-0" />{" "}
                <span>+593 95 950 4842</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
