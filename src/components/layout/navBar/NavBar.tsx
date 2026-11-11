"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineMenuAlt3,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";
import { useTheme } from "next-themes";
import UserDropdown from "./UserDropdown";
import { categories } from "@/utils/categories";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";

const DesktopNav = dynamic(
  () => import("@/components/layout/menu/DesktopNav"),
  { ssr: false },
);

const SearchBar = dynamic(() => import("@/components/shop/filters/SearchBar"), {
  ssr: false,
});

const MegaMenu = dynamic(() => import("@/components/layout/menu/MegaMenu"), {
  ssr: false,
});

const MobileMenu = dynamic(
  () => import("@/components/layout/menu/MovileMenu"),
  { ssr: false },
);

const AuthDrawer = dynamic(() => import("@/components/layout/AuthDrawer"), {
  ssr: false,
});

const FavoritesMenu = dynamic(() => import("./FavoritesMenu"), { ssr: false });
const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

const Navbar = () => {
  const pathname = usePathname();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === "/";
  const showSolidNavbar = isScrolled || !isHomePage;
  const isAnyMenuOpen = activeMenu !== null || isHoveringMenu;

  const isAdminPage = pathname?.startsWith("/admin");
  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0),
  );
  const cartItems = useCartStore((state) => state.cart);
  const favorites = useFavoritesStore((state) => state.favorites);

  useEffect(() => {
    setActiveMenu(null);
    setIsHoveringMenu(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        setActiveMenu(null);
        setIsHoveringMenu(false);
        setIsMobileMenuOpen(false);
        setFavoritesOpen(false);
        setCartOpen(false);
        setIsAuthDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkMouseEnter = (item: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (activeMenu) {
      setActiveMenu(item);
    } else {
      openTimeoutRef.current = setTimeout(() => {
        setActiveMenu(item);
      }, 70);
    }
  };

  const handleLinkMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsHoveringMenu(false);
    }, 220);
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsHoveringMenu(true);
  };

  const handleMenuMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsHoveringMenu(false);
      setActiveMenu(null);
    }, 220);
  };

  useEffect(() => {
    setMounted(true);

    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav
        aria-label="Cabecera principal de la tienda"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          showSolidNavbar
            ? "bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-xl shadow-xs border-b border-zinc-200/70 dark:border-white/10"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        } ${!mounted ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4 sm:gap-6 transition-all duration-300 ${
            isScrolled ? "py-1.5 sm:py-2" : "py-2.5 sm:py-3"
          }`}
        >
          <Link
            href="/"
            className="shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] dark:focus-visible:ring-white rounded-lg"
            aria-label="Muebles Maldonado - Ir al inicio"
            suppressHydrationWarning
          >
            <div className="relative w-32 sm:w-36 md:w-40 h-9 sm:h-10 md:h-[45px] aspect-[400/113] transition-transform duration-300 group-hover:scale-102">
              <Image
                src={
                  !mounted || !showSolidNavbar || theme === "dark"
                    ? "/assets/images/logoA1.webp"
                    : "/assets/images/logoA.webp"
                }
                alt="Muebles Maldonado Ecuador"
                fill
                unoptimized
                className="object-contain"
                priority
                sizes="160px"
              />
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md xl:max-w-lg mx-auto">
            <SearchBar showSolidNavbar={showSolidNavbar} />
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] dark:focus-visible:ring-white ${
                !showSolidNavbar
                  ? "text-white hover:bg-white/15"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white"
              }`}
              title="Cambiar tema claro u oscuro"
              aria-label="Cambiar tema"
            >
              {mounted ? (
                theme === "dark" ? (
                  <HiOutlineSun className="text-xl transition-transform hover:rotate-45" />
                ) : (
                  <HiOutlineMoon className="text-xl transition-transform hover:-rotate-12" />
                )
              ) : (
                <HiOutlineSun className="text-xl" />
              )}
            </button>

            <button
              onClick={() => setFavoritesOpen(true)}
              className={`hidden sm:flex p-2 rounded-full relative group transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] dark:focus-visible:ring-white ${
                !showSolidNavbar
                  ? "text-white hover:bg-white/15"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white"
              }`}
              title="Ver mis favoritos"
              aria-label="Abrir favoritos"
            >
              <HiOutlineHeart className="text-xl group-hover:scale-110 transition-transform duration-200" />
              {mounted && favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A3728] text-white text-xs font-bold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {favorites.length}
                </span>
              )}
            </button>

            <UserDropdown
              onOpenAuth={() => setIsAuthDrawerOpen(true)}
              showSolidNavbar={showSolidNavbar}
            />

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              title="Ver bolsa de compras"
              aria-label="Abrir carrito"
              className={`p-2 rounded-full relative group transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] dark:focus-visible:ring-white cursor-pointer ${
                !showSolidNavbar
                  ? "text-white hover:bg-white/15"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              <HiOutlineShoppingBag className="text-xl group-hover:scale-110 transition-transform duration-200" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#4A3728] text-white text-xs font-bold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3728] dark:focus-visible:ring-white ${
                !showSolidNavbar
                  ? "text-white hover:bg-white/15"
                  : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10"
              }`}
              title="Abrir menú de navegación"
              aria-label="Abrir menú móvil"
            >
              <HiOutlineMenuAlt3 size={24} />
            </button>
          </div>
        </div>

        {!isAdminPage && (
          <DesktopNav
            showSolidNavbar={showSolidNavbar}
            activeMenu={activeMenu}
            handleLinkMouseEnter={handleLinkMouseEnter}
            handleLinkMouseLeave={handleLinkMouseLeave}
            isScrolled={isScrolled}
            isHomePage={isHomePage}
          />
        )}

        {!isAdminPage && isAnyMenuOpen && (
          <MegaMenu
            isOpen={isAnyMenuOpen}
            data={categories.find((c) => c.label === activeMenu) || null}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
            onClose={() => {
              setActiveMenu(null);
              setIsHoveringMenu(false);
            }}
          />
        )}
      </nav>

      {!isAdminPage && isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          isDarkMode={theme === "dark"}
        />
      )}

      {isAuthDrawerOpen && (
        <AuthDrawer
          isOpen={isAuthDrawerOpen}
          onClose={() => setIsAuthDrawerOpen(false)}
        />
      )}

      {favoritesOpen && (
        <FavoritesMenu
          isOpen={favoritesOpen}
          onClose={() => setFavoritesOpen(false)}
        />
      )}

      {cartOpen && (
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
        />
      )}
    </>
  );
};

export default Navbar;
