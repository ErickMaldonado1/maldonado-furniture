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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#0b0b0b] shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="relative w-24 aspect-400/113">
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
            className="p-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-6 py-6 space-y-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar muebles..."
                className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-sm py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none border border-transparent dark:border-zinc-800"
              />
              <HiOutlineSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
            </form>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4">
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
                      className="flex flex-row gap-2 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-sm border border-zinc-100 dark:border-zinc-800/50 active:scale-95 transition-all"
                    >
                      <IconComponent className="text-[#4A3728] dark:text-[#8B6F47] text-xl" />
                      <span className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4">
                Menú
              </p>
              <nav className="flex flex-col">
                {[
                  { label: "Todas las Colecciones", path: "/productos" },
                  { label: "Proyectos", path: "/proyectos" },
                  { label: "Favoritos", path: "/favoritos" },
                  { label: "Contacto", path: "/contacto" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    onClick={onClose}
                    href={link.path}
                    className="py-3 text-[15px] font-bold text-zinc-800 dark:text-zinc-100 border-b border-zinc-50 dark:border-zinc-900/50 last:border-0 active:pl-2 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 bg-zinc-50 dark:bg-[#0d0d0d] border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <a
                href="#"
                className="text-zinc-400 hover:text-[#4A3728] transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-[#4A3728] transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://wa.me/593959504842"
                className="text-teal-600 dark:text-teal-500 transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
            <div className="space-y-2 text-[12px] font-bold text-zinc-500 dark:text-zinc-400 tracking-tight">
              <p className="flex items-center gap-2">
                <HiOutlineMail size={16} className="text-zinc-400" />{" "}
                mueblesmaldonadoec@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <HiOutlinePhone size={16} className="text-zinc-400" /> +593 95
                950 4842
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
