"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineMenuAlt3,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";

import MegaMenu from "@/components/layout/menu/MegaMenu";
import MobileMenu from "@/components/layout/menu/MobileMenu";
import DesktopNav from "@/components/layout/menu/DesktopNav";
import { categories } from "@/lib/categories";
import AuthDrawer from "@/components/layout/AuthDrawer";
import FavoritesMenu from "./FavoritesMenu";
import CartDrawer from "./CartDrawer";
import UserDropdown from "./UserDropdown";
import { useCartStore } from "@/store/cart-store";

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

  const totalItems = useCartStore((state) => state.getTotalItems());
  const cartItems = useCartStore((state) => state.cart);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-sans ${showSolidNavbar ? "bg-white/90 dark:bg-[#0D0D0D]/90 py-2 shadow-sm border-b border-zinc-200/50 dark:border-white/5" : "bg-transparent py-3"}`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex justify-between items-center gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0 group">
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

        {/* Search Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl relative group"
        >
          <HiOutlineSearch
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${!showSolidNavbar ? "text-white/40" : "text-zinc-400 dark:text-zinc-500"}`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className={`w-full border-b py-2 pl-12 pr-4 focus:outline-none transition-all ${!showSolidNavbar ? "bg-transparent border-white/20 text-white placeholder:text-white/40 focus:border-white/60" : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:border-[#4A3728]"}`}
          />
        </form>

        {/* Global Icons */}
        <div className="flex items-center gap-1 md:gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
          >
            {isDarkMode ? (
              <HiOutlineSun className="text-2xl" />
            ) : (
              <HiOutlineMoon className="text-2xl" />
            )}
          </button>

          <Link
            href="/"
            className={`p-2.5 rounded-full relative group ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
          >
            <HiOutlineHeart
              className="text-2xl group-hover:scale-110 transition-transform"
              onClick={() => setFavoritesOpen(true)}
            />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#4A3728] rounded-full" />
          </Link>

      
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
            className={`p-2.5 rounded-full relative group ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
          >
            <HiOutlineShoppingBag className="text-2xl group-hover:scale-110 transition-transform" />
            {mounted && totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#4A3728] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden p-2.5 text-3xl transition-all ${!showSolidNavbar ? "text-white" : "text-zinc-700 dark:text-white"}`}
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
