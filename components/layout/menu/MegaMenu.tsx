"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight} from "@/utils/icons/navigation";

const badgeStyles: Record<string, string> = {
  accent: "bg-[#4A3728] text-white",
  gold: "bg-amber-500 text-white",
  red: "bg-red-500 text-white",
  blue: "bg-blue-500 text-white",
  green: "bg-emerald-500 text-white",
};

const MegaMenu = ({ isOpen, data, onMouseEnter, onMouseLeave }: any) => {
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
          className="absolute top-full left-1/2 -translate-x-1/2 z-50 hidden lg:block w-full"
        >
          <div className="w-full bg-white/95 dark:bg-[#0b0b0b]/95 backdrop-blur-sm">
            <div className="mx-auto max-w-360">
              <div className="grid grid-cols-[1fr_2fr_2fr] gap-10 px-10 py-4">
                <div className="min-w-0">
                  <p className="text-[12px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-4">
                    {data.label}
                  </p>

                  <ul className="space-y-2">
                    {data.subcategories.map((cat: any) => (
                      <li key={cat.sub}>
                        <Link
                          href={cat.href}
                          className="group flex items-center justify-between px-3 py-1 rounded-lg
                hover:bg-zinc-100 dark:hover:bg-white/5 transition"
                        >
                          <span className="text-md font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                            {cat.label}
                          </span>

                          <ChevronRight
                            width={18}
                            height={18}
                            className="text-zinc-400 opacity-0 -translate-x-1
                  group-hover:opacity-100 group-hover:translate-x-0 transition"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* EXPLORAR */}
                <div className="min-w-0">
                  <p className="text-[12px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-4">
                    Explorar
                  </p>

                  <div className="grid grid-cols-4 gap-x-6 gap-y-7">
                    {data.subcategories.slice(0, 8).map((sub: any) => (
                      <Link
                        key={sub.sub}
                        href={sub.href}
                        className="group flex flex-col gap-2 min-w-0"
                      >
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                          <Image
                            src={sub.imageSrc}
                            alt={sub.imageAlt}
                            fill
                            className="p-2 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 truncate">
                          {sub.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-4">
                    Tendencias
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {data.featuredContent.slice(0, 2).map((item: any) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group relative w-full rounded-sm border border-zinc-200/40 dark:border-white/10
  bg-white dark:bg-zinc-900 overflow-hidden transition-all
  hover:shadow hover:-translate-y-1"
                      >
                        <div className="relative aspect-4/3 overflow-hidden">
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div
                            className="absolute inset-0 bg-linear-to-t
      from-black/50 via-black/10 to-transparent opacity-80"
                          />
                          {item.badge && (
                            <span
                              className={`absolute top-4 left-4 px-3 py-1 text-[12px]
        font-black uppercase tracking-widest rounded-full backdrop-blur-md
        ${badgeStyles[item.badgeColor]}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <div className="relative p-5">
                          <h4 className="text-[12px] font-semibold text-zinc-900 dark:text-white leading-tight mb-1">
                            {item.title}
                          </h4>

                          <p className="text-md text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {item.description}
                          </p>

                          <span
                            className="mt-3 block text-[12px] uppercase tracking-widest text-zinc-400
  group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
                          >
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
