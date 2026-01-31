"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineMenuAlt3,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";

import MegaMenu from "@/components/layout/menu/MegaMenu";
import MobileMenu from "@/components/layout/menu/MovileMenu";
import DesktopNav from "@/components/layout/menu/DesktopNav";
import { categories } from "@/utils/categories";
import AuthDrawer from "@/components/layout/AuthDrawer";
import FavoritesMenu from "./FavoritesMenu";
import CartDrawer from "./CartDrawer";
import UserDropdown from "./UserDropdown";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import SearchBar from "@/components/shop/SearchBar";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === "/";
  const showSolidNavbar = isScrolled || !isHomePage;
  const isAnyMenuOpen = activeMenu !== null || isHoveringMenu;
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0),
  );
  const cartItems = useCartStore((state) => state.cart);
  const favorites = useFavoritesStore((state) => state.favorites);

  const handleLinkMouseEnter = (item: string) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setActiveMenu(item);
  };

  const handleLinkMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenu(null), 100);
    setCloseTimeout(timeout);
  };

  useEffect(() => {
    setMounted(true);
    if (!isHomePage) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const offset = window.scrollY;

          if (offset > 20 && !isScrolled) {
            setIsScrolled(true);
          } else if (offset <= 20 && isScrolled) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isScrolled]); // Agregamos estas dependencias

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productos?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  if (!mounted)
    return <nav className="fixed top-0 w-full h-20 bg-transparent" />;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-sans ${showSolidNavbar ? "bg-white dark:bg-[#0D0D0D] py-2 shadow-sm border-b border-zinc-200/50 dark:border-white/5" : "bg-transparent py-3"}`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex justify-between items-center gap-8">
        <Link href="/" className="shrink-0 group" aria-label="Ir al inicio">
          <div className="relative w-36 aspect-400/113 transition-transform group-hover:scale-105">
            <Image
              src={
                !showSolidNavbar || isDarkMode
                  ? "/assets/images/logoA1.webp"
                  : "/assets/images/logoA.webp"
              }
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar showSolidNavbar={showSolidNavbar} />
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? (
              <HiOutlineSun className="text-2xl" />
            ) : (
              <HiOutlineMoon className="text-2xl" />
            )}
          </button>

          <button
            onClick={() => setFavoritesOpen(true)}
            className={`hidden sm:flex p-2.5 rounded-full relative group ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
            aria-label="Abrir favoritos"
          >
            <HiOutlineHeart className="text-2xl group-hover:scale-110 transition-transform" />
            {mounted && favorites.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#4A3728] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
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
            className={`p-2.5 rounded-full relative group ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
          >
            <HiOutlineShoppingBag className="text-2xl group-hover:scale-110 transition-transform" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#4A3728] text-white text-md font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden p-2.5 text-3xl transition-all ${!showSolidNavbar ? "text-white" : "text-zinc-700 dark:text-white"}`}
            aria-label="Abrir menú móvil"
          >
            <HiOutlineMenuAlt3 size={32} />
          </button>
        </div>
      </div>

      <DesktopNav
        showSolidNavbar={showSolidNavbar}
        activeMenu={activeMenu}
        handleLinkMouseEnter={handleLinkMouseEnter}
        handleLinkMouseLeave={handleLinkMouseLeave}
        isScrolled={isScrolled}
        isHomePage={isHomePage}
      />

      <MegaMenu
        isOpen={isAnyMenuOpen}
        data={categories.find((c) => c.label === activeMenu) || null}
        onMouseEnter={() => {
          if (closeTimeout) clearTimeout(closeTimeout);
          setIsHoveringMenu(true);
        }}
        onMouseLeave={() => {
          const timeout = setTimeout(() => {
            setIsHoveringMenu(false);
            setActiveMenu(null);
          }, 100);
          setCloseTimeout(timeout);
        }}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDarkMode={isDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <AuthDrawer
        isOpen={isAuthDrawerOpen}
        onClose={() => setIsAuthDrawerOpen(false)}
      />
      <FavoritesMenu
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />
    </nav>
  );
};

export default Navbar;
