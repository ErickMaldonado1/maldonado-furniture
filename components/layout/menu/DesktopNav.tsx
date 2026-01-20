"use client";

import React from "react";
import Link from "next/link";

interface DesktopNavProps {
  showSolidNavbar: boolean;
  activeMenu: string | null;
  handleLinkMouseEnter: (item: string) => void;
  handleLinkMouseLeave: () => void;
  isScrolled: boolean;
  isHomePage: boolean;
}

const DesktopNav = ({
  showSolidNavbar,
  activeMenu,
  handleLinkMouseEnter,
  handleLinkMouseLeave,
  isScrolled,
  isHomePage,
}: DesktopNavProps) => {
  const menuItems = [
    "Cocina",
    "Dormitorio",
    "Sala",
    "Oficina",
    "Proyectos",
    "Contacto",
  ];

  return (
    <div
      className={`hidden lg:block transition-all duration-700 ease-in-out ${isScrolled && isHomePage ? "h-0 opacity-0 mt-0 overflow-hidden" : "h-12 opacity-100"}`}
    >
      <div className="max-w-screen-2xl mx-auto px-8 h-full flex items-center justify-center font-heading">
        <div
          className={`flex gap-10 text-[14px] font-medium tracking-[0.20em] uppercase ${!showSolidNavbar ? "text-white/60" : "text-zinc-600 dark:text-zinc-400"}`}
        >
          {menuItems.map((item) => {
            const isCategory = [
              "Sala",
              "Dormitorio",
              "Cocina",
              "Oficina",
            ].includes(item);
            return (
              <Link
                key={item}
                href={
                  item === "Proyectos"
                    ? "/proyectos"
                    : item === "Contacto"
                      ? "/contacto"
                      : `/${item.toLowerCase()}`
                }
                onMouseEnter={() =>
                  isCategory ? handleLinkMouseEnter(item) : null
                }
                onMouseLeave={handleLinkMouseLeave}
                className={`group relative isolate px-4 py-2 rounded-md transition-colors duration-300 ${!showSolidNavbar ? "hover:text-white" : "hover:text-zinc-900 dark:hover:text-white"} ${activeMenu === item ? "text-white! font-semibold" : ""}`}
              >
                <span
                  className={`absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10 dark:from-white/5 dark:via-white/10 dark:to-white/5 backdrop-blur-sm opacity-0 scale-95 transition-all duration-300 ease-out ${activeMenu === item ? "opacity-100 scale-100" : "group-hover:opacity-100 group-hover:scale-100"}`}
                />
                <span className="relative z-10">{item}</span>
                <span
                  className={`pointer-events-none absolute left-1/2 bottom-1 h-0.5 w-18 -translate-x-1/2 bg-[#4A3728]/70 dark:bg-white/70 transition-transform duration-300 ${activeMenu === item ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
