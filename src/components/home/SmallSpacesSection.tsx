"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/shop/product/ProductCard";
import { ProductWithRelations } from "@/types/product-service";
import { SliderButton } from "../ui/SliderButton";
import { ArrowNarrowRight } from "@/utils/icons/actions";
import { Sparkles } from "@/utils/icons/actions";

interface SmallSpacesSectionProps {
  products: ProductWithRelations[];
}

export default function SmallSpacesSection({ products }: SmallSpacesSectionProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = useMemo(() => {
    return Math.max(0, products.length - visibleCount);
  }, [products.length, visibleCount]);

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

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) handleNext();
    else if (info.offset.x > threshold) handlePrev();
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 md:py-14 bg-[#FAF9F7] dark:bg-[#080808] border-y border-zinc-200/50 dark:border-white/5 overflow-hidden transition-colors">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 border-b border-zinc-200/70 dark:border-zinc-800/50 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B735B] dark:text-[#C4A482]" />
              <span className="label-premium text-[#8B735B] dark:text-[#C4A482]">
                Optimización y Funcionalidad
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
              Soluciones para{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037] dark:from-[#C4A482] dark:to-[#E0CCA7]">
                Espacios Pequeños
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              Muebles compactos, modulares y de doble función diseñados para aprovechar cada centímetro en departamentos y suites.
            </p>
          </div>

          <Link
            href="/productos"
            className="group flex items-center gap-2 text-sm md:text-base hover:text-[#4A3728] dark:hover:text-zinc-300 transition-all"
            aria-label="Explorar todo el catálogo"
          >
            <span className="hidden sm:inline">EXPLORAR CATÁLOGO</span>
            <span className="sm:hidden">CATÁLOGO</span>
            <ArrowNarrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A3728] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {products.length > visibleCount && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-16 z-30 pointer-events-none flex items-center">
                <div className="pointer-events-auto">
                  <SliderButton direction="left" onClick={handlePrev} />
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-16 z-30 pointer-events-none flex items-center justify-end">
                <div className="pointer-events-auto">
                  <SliderButton direction="right" onClick={handleNext} />
                </div>
              </div>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="flex -mx-1 sm:-mx-2 cursor-grab active:cursor-grabbing"
            >
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="flex-none px-1 sm:px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <ProductCard product={product} index={idx} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
