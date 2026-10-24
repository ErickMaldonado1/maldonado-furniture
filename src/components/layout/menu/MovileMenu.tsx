"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/utils/categories";
import { ChevronRight } from "@/utils/icons/navigation";
import { HiOutlineX, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import SearchBar from "@/components/shop/filters/SearchBar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const MobileMenu = ({ isOpen, onClose, isDarkMode }: MobileMenuProps) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación móvil"
      className={`fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-auto ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`absolute top-0 right-0 h-full w-[86%] max-w-sm bg-white dark:bg-[#0c0c0c] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="relative w-28 sm:w-32 aspect-400/113">
            <Image
              src={
                isDarkMode
                  ? "/assets/images/logoA1.webp"
                  : "/assets/images/logoA.webp"
              }
              alt="Muebles Maldonado"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728]"
            aria-label="Cerrar menú móvil"
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 py-5 space-y-6">
            <div className="relative">
              <SearchBar showSolidNavbar={true} onSearchResolved={onClose} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
                Colecciones
              </p>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => {
                  const isExpanded = expandedCat === cat.slug;
                  return (
                    <div
                      key={cat.slug}
                      className="flex flex-col border border-zinc-200/70 dark:border-zinc-800/80 rounded-xl overflow-hidden transition-all bg-zinc-50/70 dark:bg-zinc-900/40"
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        className="flex items-center justify-between p-3.5 w-full text-left active:bg-zinc-100 dark:active:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728]"
                        onClick={() =>
                          setExpandedCat(isExpanded ? null : cat.slug)
                        }
                      >
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                          {cat.label}
                        </span>
                        <ChevronRight
                          width={18}
                          height={18}
                          className={`transition-transform duration-200 text-zinc-400 ${
                            isExpanded
                              ? "rotate-90 text-[#4A3728] dark:text-[#D4B896]"
                              : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out flex flex-col bg-white dark:bg-[#0c0c0c] overflow-hidden ${
                          isExpanded
                            ? "max-h-96 py-2 border-t border-zinc-100 dark:border-zinc-800/80"
                            : "max-h-0 py-0"
                        }`}
                      >
                        <Link
                          href={`/${cat.slug}`}
                          onClick={onClose}
                          className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#4A3728] dark:text-[#D4B896] hover:underline"
                        >
                          Ver todo en {cat.label} →
                        </Link>
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.sub}
                            href={sub.href}
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 active:bg-zinc-50 dark:active:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-white transition-colors"
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
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3">
                Navegación
              </p>
              <nav className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {[
                  { label: "Catálogo Completo", path: "/productos" },
                  { label: "Proyectos Realizados", path: "/proyectos" },
                  { label: "Mis Favoritos", path: "/favoritos" },
                  { label: "Contacto & Cotizaciones", path: "/contacto" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    onClick={onClose}
                    href={link.path}
                    className="py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-[#4A3728] dark:hover:text-[#D4B896] active:pl-1 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 bg-zinc-50 dark:bg-[#0e0e0e] border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/muebles_maldonad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Muebles Maldonado"
                className="p-2 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-[#4A3728] shadow-xs transition-colors"
              >
                <FaInstagram size={17} />
              </a>
              <a
                href="https://www.facebook.com/MueblesMaldonad/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Muebles Maldonado"
                className="p-2 rounded-full bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-[#4A3728] shadow-xs transition-colors"
              >
                <FaFacebook size={17} />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=593959504842&text=Hola%21+Necesito+ayuda+con+un+pedido.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp directo de asesoría"
                className="p-2 rounded-full bg-[#166534] text-white hover:bg-[#14532d] shadow-xs transition-colors"
              >
                <FaWhatsapp size={17} />
              </a>
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <p className="flex items-center gap-2.5">
                <HiOutlineMail
                  size={16}
                  className="text-[#4A3728] dark:text-[#D4B896] shrink-0"
                />
                <span>mueblesmaldonadoec@gmail.com</span>
              </p>
              <p className="flex items-center gap-2.5">
                <HiOutlinePhone
                  size={16}
                  className="text-[#4A3728] dark:text-[#D4B896] shrink-0"
                />
                <span>+593 95 950 4842</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MobileMenu;
