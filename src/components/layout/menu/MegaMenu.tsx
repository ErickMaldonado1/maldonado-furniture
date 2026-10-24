"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "@/utils/icons/navigation";
import { Category, SubCategory } from "@/utils/categories";

interface MegaMenuProps {
  isOpen: boolean;
  data: Category | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose?: () => void;
}

const MegaMenu = ({
  isOpen,
  data,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) => {
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  useEffect(() => {
    setHoveredSub(null);
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!data) return null;

  const featured = data.featuredContent?.[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          role="region"
          aria-label={`Menú de navegación para ${data.label}`}
          className="absolute top-full left-0 right-0 z-50 hidden lg:block w-full focus:outline-none"
        >
          <div
            className="absolute -top-3 inset-x-0 h-4 pointer-events-auto"
            aria-hidden="true"
          />

          <div className="w-full bg-white/98 dark:bg-[#0c0c0c]/98 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] transition-all duration-300">
            <div className="mx-auto max-w-7xl px-8 py-7">
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#4A3728] dark:bg-[#D4B896]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                    Colección • {data.label}
                  </p>
                </div>
                <Link
                  href={`/${data.slug}`}
                  onClick={onClose}
                  className="group/all inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A3728] dark:text-[#D4B896] hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] rounded-md px-1 py-0.5"
                >
                  <span>Ver catálogo completo de {data.label}</span>
                  <ChevronRight
                    width={14}
                    height={14}
                    className="transition-transform group-hover/all:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-[220px_1fr_310px] gap-8 items-start">
                <div className="min-w-0 pr-2 border-r border-zinc-100 dark:border-zinc-800/80">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3.5">
                    Categorías
                  </p>

                  <ul className="space-y-1">
                    {data.subcategories.map((cat: SubCategory) => {
                      const isHovered = hoveredSub === cat.sub;
                      return (
                        <li
                          key={cat.sub}
                          onMouseEnter={() => setHoveredSub(cat.sub)}
                          onFocus={() => setHoveredSub(cat.sub)}
                        >
                          <Link
                            href={cat.href}
                            onClick={onClose}
                            className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] ${
                              isHovered
                                ? "bg-zinc-100/90 dark:bg-white/8 text-[#4A3728] dark:text-white font-semibold translate-x-1"
                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/4 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                          >
                            <span className="truncate">{cat.label}</span>
                            <ChevronRight
                              width={14}
                              height={14}
                              className={`shrink-0 transition-all duration-200 ${
                                isHovered
                                  ? "opacity-100 translate-x-0 text-[#4A3728] dark:text-white"
                                  : "opacity-0 -translate-x-1 text-zinc-400 group-hover:opacity-60"
                              }`}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3.5">
                    Explorar Mobiliario
                  </p>

                  <div className="grid grid-cols-3 gap-3.5">
                    {data.subcategories.slice(0, 6).map((sub: SubCategory) => {
                      const isHovered = hoveredSub === sub.sub;
                      return (
                        <Link
                          key={sub.sub}
                          href={sub.href}
                          onClick={onClose}
                          onMouseEnter={() => setHoveredSub(sub.sub)}
                          onFocus={() => setHoveredSub(sub.sub)}
                          className="group flex flex-col items-center text-center gap-2 p-2 rounded-xl transition-all duration-300 hover:bg-zinc-50/80 dark:hover:bg-white/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728]"
                        >
                          <div
                            className={`relative w-full h-24 sm:h-26 rounded-xl overflow-hidden bg-zinc-50/90 dark:bg-zinc-900/70 border p-2 flex items-center justify-center transition-all duration-300 ${
                              isHovered
                                ? "border-[#4A3728]/50 dark:border-white/40 ring-2 ring-[#4A3728]/20 dark:ring-white/20 shadow-md scale-[1.02]"
                                : "border-zinc-200/70 dark:border-zinc-800/80"
                            }`}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={sub.imageSrc}
                                alt={sub.imageAlt || sub.label}
                                fill
                                sizes="(max-width: 1200px) 20vw, 180px"
                                className={`p-1 object-contain transition-transform duration-500 ease-out ${
                                  isHovered
                                    ? "scale-110"
                                    : "group-hover:scale-105"
                                }`}
                              />
                            </div>
                          </div>

                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 truncate max-w-full ${
                              isHovered
                                ? "text-[#4A3728] dark:text-[#D4B896]"
                                : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"
                            }`}
                          >
                            {sub.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {featured && (
                  <div className="min-w-0 pl-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-3.5">
                      Diseño a Medida
                    </p>

                    <Link
                      href={featured.href}
                      onClick={onClose}
                      className="group relative flex flex-col rounded-xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800 bg-zinc-950 shadow-md hover:shadow-xl transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728]"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={featured.imageSrc}
                          alt={featured.title}
                          fill
                          sizes="320px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        {featured.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full bg-[#4A3728] text-white shadow-sm z-10">
                            {featured.badge}
                          </span>
                        )}

                        <div className="absolute inset-x-0 bottom-0 p-4 text-white z-10">
                          <h4 className="text-sm font-bold uppercase tracking-wide text-white leading-snug group-hover:text-[#D4B896] transition-colors mb-1">
                            {featured.title}
                          </h4>
                          <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                            Fabricación personalizada con melamina de alta
                            densidad e instalación en Quito.
                          </p>
                          <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D4B896] group-hover:translate-x-1 transition-transform">
                            Ver detalles →
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="mt-3.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>✓ 100% a medida</span>
                      <span>✓ Instalación gratis</span>
                      <span>✓ Melamina 18mm</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
