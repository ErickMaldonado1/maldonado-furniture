"use client";

import { useEffect, useState, useCallback } from "react";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@prisma/client";
import ProductCard from "@/components/shop/ProductCard";
import { SliderButton } from "../ui/SliderButton";

interface FeaturedProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedProps) {
  const { addToCart } = useCartStore();

  const extendedProducts = [...products, ...products, ...products];

  const [currentIndex, setCurrentIndex] = useState(products.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <section className="py-6 md:py-12 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="mb-10 space-y-1">
          <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            Productos{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              Destacados
            </span>
          </h2>
          <div className="h-1.5 w-24 bg-black dark:bg-white" />
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
              className={`flex -mx-2 md:-mx-3 ${
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
                  className="flex-none px-2 md:px-3"
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
