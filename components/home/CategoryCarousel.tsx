"use client";

import { useEffect, useState, useCallback } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@prisma/client";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

interface Props {
  products: Product[];
  title: string;
  categorySlug: string;
}

export default function CategoryCarousel({
  products,
  title,
  categorySlug,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCartStore();
  const [visibleCount, setVisibleCount] = useState(4);

  // Lógica de Título: Primera(s) palabra(s) sólidas, última con gradiente
  const words = title.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        {/* HEADER RESPONSIVO Y TEMATIZADO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-zinc-100 dark:border-zinc-800/50 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white transition-colors">
              {firstPart}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                {lastWord}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href={`/${categorySlug}`}
              className="group text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-zinc-500 dark:text-zinc-400 hover:text-[#4A3728] dark:hover:text-white transition-all"
            >
              VER TODO{" "}
              <HiOutlineArrowRight className="group-hover:translate-x-2 transition-transform text-[#4A3728]" />
            </Link>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-full 
                           text-zinc-900 dark:text-white
                           hover:bg-zinc-900 hover:text-white 
                           dark:hover:bg-white dark:hover:text-black 
                           active:scale-95 transition-all duration-300"
              >
                <HiOutlineChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-full 
                           text-zinc-900 dark:text-white
                           hover:bg-zinc-900 hover:text-white 
                           dark:hover:bg-white dark:hover:text-black 
                           active:scale-95 transition-all duration-300"
              >
                <HiOutlineChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              index={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
