"use client";
import React, { useState, useEffect } from "react";
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
          ? "bg-white dark:bg-[#0D0D0D] py-2 shadow-sm border-b border-zinc-200/50 dark:border-white/5"
          : "bg-transparent py-3"
      } ${!mounted ? "opacity-0" : "opacity-100"}`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex justify-between items-center gap-8">
        <Link href="/" className="shrink-0 group" aria-label="Ir al inicio">
          <div className="relative w-36 aspect-400/113 transition-transform group-hover:scale-105">
            <Image
              src={
                !showSolidNavbar || theme === "dark"
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

        <div className="flex items-center gap-1 md:gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${!showSolidNavbar ? "text-white hover:bg-white/10" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"}`}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
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
              <span className="absolute top-1 right-1 bg-[#4A3728] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
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

      {isAnyMenuOpen && (
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
      )}

      {isMobileMenuOpen && (
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
