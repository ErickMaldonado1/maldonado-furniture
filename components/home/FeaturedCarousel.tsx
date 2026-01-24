"use client";

import { useEffect, useState, useCallback } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@prisma/client";
import  ProductCard from "@/components/shop/ProductCard";

interface FeaturedProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCartStore();
  const [visibleCount, setVisibleCount] = useState(4);

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

  const maxIndex = products.length - visibleCount;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  return (
    <section className="py-12 bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white transition-colors">
              Productos{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                Destacados
              </span>
            </h2>
            <div className="h-1.5 w-24 bg-black dark:bg-white transition-colors" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-full 
                         text-zinc-900 dark:text-white
                         hover:bg-black hover:text-white 
                         dark:hover:bg-white dark:hover:text-black 
                         transition-all duration-300 ease-in-out"
            >
              <HiOutlineChevronLeft className="text-xl" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-full 
                         text-zinc-900 dark:text-white
                         hover:bg-black hover:text-white 
                         dark:hover:bg-white dark:hover:text-black 
                         transition-all duration-300 ease-in-out"
            >
              <HiOutlineChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
