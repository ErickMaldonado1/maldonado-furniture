"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === "/";
  const showSolidNavbar = isScrolled || !isHomePage;
  const isAnyMenuOpen = activeMenu !== null || isHoveringMenu;
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  const isAdminPage = pathname?.startsWith("/admin");
  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0),
  );
  const cartItems = useCartStore((state) => state.cart);
  const favorites = useFavoritesStore((state) => state.favorites);

  const handleLinkMouseEnter = (item: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(item);
  };

  const handleLinkMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenu(null), 250);
    closeTimeoutRef.current = timeout;
  };

  useEffect(() => {
    setMounted(true);

    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productos?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-sans ${
        showSolidNavbar
          ? "bg-white dark:bg-[#0D0D0D] py-1.5 shadow-sm border-b border-zinc-200/50 dark:border-white/5"
          : "bg-transparent py-2.5"
      } ${!mounted ? "opacity-0" : "opacity-100"}`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex justify-between items-center gap-6">
        <Link href="/" className="shrink-0 group" aria-label="Ir al inicio" suppressHydrationWarning>
          <div className="relative w-32 sm:w-36 aspect-400/113 transition-transform group-hover:scale-105">
            <Image
              src={
                !mounted || !showSolidNavbar || theme === "dark"
                  ? "/assets/images/logoA1.webp"
                  : "/assets/images/logoA.webp"
              }
              alt="Logo Maldonado"
              fill
              className="object-contain"
              priority
              sizes="144px"
            />
          </div>
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar showSolidNavbar={showSolidNavbar} />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"}`}
            aria-label="Cambiar tema"
          >
            {mounted ? (
              theme === "dark" ? (
                <HiOutlineSun className="text-xl" />
              ) : (
                <HiOutlineMoon className="text-xl" />
              )
            ) : (
              <HiOutlineSun className="text-xl" />
            )}
          </button>

          <button
            onClick={() => setFavoritesOpen(true)}
            className={`hidden sm:flex p-2 rounded-full relative group ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"}`}
            aria-label="Abrir favoritos"
          >
            <HiOutlineHeart className="text-xl group-hover:scale-110 transition-transform" />
            {mounted && favorites.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#4A3728] text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                {favorites.length}
              </span>
            )}
          </button>

          <UserDropdown
            onOpenAuth={() => setIsAuthDrawerOpen(true)}
            showSolidNavbar={showSolidNavbar}
          />

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCartOpen(true);
            }}
            aria-label="Abrir carrito"
            className={`p-2 rounded-full relative group ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"}`}
          >
            <HiOutlineShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#4A3728] text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden p-2 transition-all ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-white"}`}
            aria-label="Abrir menú móvil"
          >
            <HiOutlineMenuAlt3 size={28} />
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
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            setIsHoveringMenu(true);
          }}
          onMouseLeave={() => {
            const timeout = setTimeout(() => {
              setIsHoveringMenu(false);
              setActiveMenu(null);
            }, 250);
            closeTimeoutRef.current = timeout;
          }}
        />
      )}

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
    </nav>
  );
};

export default Navbar;
