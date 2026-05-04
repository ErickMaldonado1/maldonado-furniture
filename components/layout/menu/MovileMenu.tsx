"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/utils/categories";
import { ChevronRight } from "@/utils/icons/navigation";
import {
  HiOutlineX,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { BiBed } from "react-icons/bi";
import { MdOutlineKitchen } from "react-icons/md";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import SearchBar from "@/components/shop/filters/SearchBar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const MobileMenu = ({ isOpen, onClose, isDarkMode }: MobileMenuProps) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

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
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-100 dark:border-zinc-800/50">
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
            aria-label="logo"
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 py-4 space-y-6">
            <div className="relative">
              <SearchBar showSolidNavbar={true} onSearchResolved={onClose} />
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
                Categorías
              </p>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => {
                  const isExpanded = expandedCat === cat.slug;
                  return (
                    <div key={cat.slug} className="flex flex-col border border-zinc-100 dark:border-zinc-800/50 rounded-md overflow-hidden transition-all bg-zinc-50 dark:bg-zinc-900/40">
                      <div 
                        className="flex items-center justify-between p-3 active:bg-zinc-100 dark:active:bg-zinc-800 cursor-pointer"
                        onClick={() => setExpandedCat(isExpanded ? null : cat.slug)}
                      >
                        <span className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                          {cat.label}
                        </span>
                        <ChevronRight width={20} height={20} className={`transition-transform duration-300 text-zinc-400 ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                      
                      <div className={`transition-all duration-300 ease-in-out flex flex-col bg-white dark:bg-[#0b0b0b] overflow-hidden ${isExpanded ? "max-h-96 py-2 border-t border-zinc-100 dark:border-zinc-800/50" : "max-h-0 py-0"}`}>
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.sub}
                            href={sub.href}
                            onClick={onClose}
                            className="px-6 py-2.5 text-[13px] font-medium text-zinc-600 dark:text-zinc-400 active:bg-zinc-50 dark:active:bg-zinc-900/50 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
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
                href="https://www.instagram.com/muebles_maldonad/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#4A3728] transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/MueblesMaldonad/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#4A3728] transition-colors"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=593959504842&text=Hola%21+Necesito+ayuda+con+un+pedido.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
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
