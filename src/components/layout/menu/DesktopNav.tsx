"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
}: DesktopNavProps) => {
  const router = useRouter();

  const menuItems = [
    "Cocina",
    "Dormitorio",
    "Sala",
    "Oficina",
    "Proyectos",
    "Contacto",
  ];

  const categories = ["Cocina", "Dormitorio", "Sala", "Oficina"];

  const getItemHref = (item: string) => {
    if (item === "Proyectos") return "/proyectos";
    if (item === "Contacto") return "/contacto";
    return `/${item.toLowerCase()}`;
  };

  const handleLinkClick = (
    e: React.MouseEvent,
    item: string,
    isCategory: boolean,
  ) => {
    if (isCategory && activeMenu !== item && "ontouchstart" in window) {
      e.preventDefault();
      handleLinkMouseEnter(item);
    } else {
      router.push(getItemHref(item));
    }
  };

  return (
    <div
      className={`hidden lg:block transition-all duration-300 ease-out ${
        isScrolled
          ? "h-9 border-t border-zinc-200/40 dark:border-white/5"
          : "h-11 border-t border-transparent"
      }`}
    >
      <div
        onMouseLeave={handleLinkMouseLeave}
        className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center"
      >
        <nav
          aria-label="Navegación principal de colecciones"
          className={`flex items-center gap-1 xl:gap-2 transition-colors duration-300 ${
            !showSolidNavbar
              ? "text-white/85"
              : "text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {menuItems.map((item) => {
            const isCategory = categories.includes(item);
            const isActive = activeMenu === item;

            return (
              <div key={item} className="relative">
                <Link
                  href={getItemHref(item)}
                  onClick={(e) => handleLinkClick(e, item, isCategory)}
                  onMouseEnter={() =>
                    isCategory
                      ? handleLinkMouseEnter(item)
                      : handleLinkMouseLeave()
                  }
                  onFocus={() =>
                    isCategory
                      ? handleLinkMouseEnter(item)
                      : handleLinkMouseLeave()
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      handleLinkMouseLeave();
                    }
                  }}
                  aria-haspopup={isCategory ? "true" : undefined}
                  aria-expanded={isCategory ? isActive : undefined}
                  className={`group relative isolate px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] dark:focus-visible:ring-[#D4B896] ${
                    !showSolidNavbar
                      ? isActive
                        ? "text-white font-semibold"
                        : "hover:text-white"
                      : isActive
                        ? "text-[#4A3728] dark:text-white font-semibold"
                        : "hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full transition-all duration-200 ease-out ${
                      !showSolidNavbar
                        ? "bg-white/15 backdrop-blur-xs"
                        : "bg-zinc-100 dark:bg-white/8"
                    } ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  />

                  <span className="relative z-10">{item}</span>

                  <span
                    className={`pointer-events-none absolute left-1/2 -bottom-0.5 h-0.5 w-6 -translate-x-1/2 rounded-full transition-all duration-200 ${
                      !showSolidNavbar
                        ? "bg-white"
                        : "bg-[#4A3728] dark:bg-[#D4B896]"
                    } ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-70"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DesktopNav;
