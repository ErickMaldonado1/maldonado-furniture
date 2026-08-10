"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "@/utils/icons/navigation";

const badgeStyles: Record<string, string> = {
  accent: "bg-[#4A3728] text-white",
  gold: "bg-amber-500 text-white",
  red: "bg-red-500 text-white",
  blue: "bg-blue-500 text-white",
  green: "bg-emerald-500 text-white",
};

const MegaMenu = ({ isOpen, data, onMouseEnter, onMouseLeave }: any) => {
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  useEffect(() => {
    setHoveredSub(null);
  }, [data]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-[calc(100%-20px)] pt-[20px] left-0 right-0 z-50 hidden lg:block w-full"
        >
          <div className="w-full bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 shadow-2xl transition-all duration-300">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-[1.2fr_3fr_1.8fr] gap-10 px-8 py-8">
                {/* Categorías (Columna 1) */}
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-5">
                    {data.label}
                  </p>

                  <ul className="space-y-1.5">
                    {data.subcategories.map((cat: any) => {
                      const isHovered = hoveredSub === cat.sub;
                      return (
                        <li
                          key={cat.sub}
                          onMouseEnter={() => setHoveredSub(cat.sub)}
                        >
                          <Link
                            href={cat.href}
                            className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-350
                              ${isHovered ? "bg-zinc-100/80 dark:bg-white/5 pl-4" : "hover:bg-zinc-50 dark:hover:bg-white/2"}
                            `}
                          >
                            <span
                              className={`text-sm font-semibold truncate transition-colors duration-300 ${isHovered ? "text-[#4A3728] dark:text-white" : "text-zinc-700 dark:text-zinc-300"}`}
                            >
                              {cat.label}
                            </span>

                            <ChevronRight
                              width={14}
                              height={14}
                              className={`transition-all duration-350 ${isHovered ? "opacity-100 translate-x-0 text-[#4A3728] dark:text-white" : "opacity-0 -translate-x-2 text-zinc-400 group-hover:opacity-50"}`}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Explorar (Columna 2) */}
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-5">
                    Explorar
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    {data.subcategories.slice(0, 6).map((sub: any) => {
                      const isHovered = hoveredSub === sub.sub;
                      const isDimmed = hoveredSub !== null && !isHovered;
                      return (
                        <Link
                          key={sub.sub}
                          href={sub.href}
                          onMouseEnter={() => setHoveredSub(sub.sub)}
                          className={`group flex flex-col items-center text-center gap-2 min-w-0 transition-all duration-350 ${isDimmed ? "opacity-50" : "opacity-100"}`}
                        >
                          <div
                            className={`relative w-28 h-20 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 transition-all duration-300 ${isHovered ? "ring-2 ring-[#4A3728] dark:ring-white/50 shadow-md scale-[1.02]" : ""}`}
                          >
                            <Image
                              src={sub.imageSrc}
                              alt={sub.imageAlt}
                              fill
                              className={`p-1.5 object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "group-hover:scale-105"}`}
                            />
                          </div>

                          <span
                            className={`text-[12px] font-bold uppercase tracking-wider transition-colors duration-300 ${isHovered ? "text-[#4A3728] dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                          >
                            {sub.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Tendencias (Columna 3) */}
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-5">
                    Tendencias
                  </p>

                  <div
                    className={`grid ${data.featuredContent.length > 1 ? "grid-cols-2 gap-4" : "grid-cols-1"}`}
                  >
                    {data.featuredContent.slice(0, 2).map((item: any) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group relative flex flex-col h-full rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            fill
                            sizes="(max-width: 1024px) 25vw, 20vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-85" />
                          {item.badge && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-extrabold uppercase  rounded-full bg-[#4A3728] text-white shadow-sm z-20">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <div className="p-4 flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white leading-tight mb-1 group-hover:text-[#4A3728] dark:group-hover:text-white transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                              {item.description ||
                                "Inspiración y diseño contemporáneo a medida para transformar tu hogar."}
                            </p>
                          </div>
                          <span className="mt-3 block text-[10px] font-black uppercase  text-[#4A3728] dark:text-zinc-300 transition-colors group-hover:translate-x-1 duration-300">
                            Explorar →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
