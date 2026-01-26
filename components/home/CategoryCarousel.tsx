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
import { SliderButton } from "../ui/SliderButton";

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
  const { addToCart } = useCartStore();
  const extendedProducts = [...products, ...products, ...products];
  const [currentIndex, setCurrentIndex] = useState(products.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

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

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= products.length * 2) {
      setCurrentIndex(products.length);
    }
    if (currentIndex <= 0) {
      setCurrentIndex(products.length);
    }
  };

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  if (products.length === 0) return null;

  return (
    <section className="py-6 md:py-12 bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-12 border-b border-zinc-100 dark:border-zinc-800/50 pb-5">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            {firstPart}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              {lastWord}
            </span>
          </h2>

          <Link
            href={`/${categorySlug}`}
            className="group flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.15em] transition-all"
          >
            <span className="hidden sm:inline">VER COLECCIÓN</span>
            <span className="sm:hidden mt-1">COLECCIÓN</span>
            <HiOutlineArrowRight className="text-[#4A3728] group-hover:translate-x-1 transition-transform mt-1" />
          </Link>
        </div>

        <div
          className="relative group/container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <SliderButton direction="left" onClick={handlePrev} />

          <div className="overflow-hidden">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex -mx-2 md:-mx-4 ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {extendedProducts.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  className="flex-none px-2 md:px-4"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    index={0}
                  />
                </div>
              ))}
            </div>
            
          </div>

          <SliderButton direction="right" onClick={handleNext} />
        </div>
      </div>
    </section>
  );
}
