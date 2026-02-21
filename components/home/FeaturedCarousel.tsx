"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import ProductCard from "@/components/shop/product/ProductCard";
import { ProductWithRelations } from "@/types/product-service";
import { SliderButton } from "../ui/SliderButton";
import { ArrowNarrowRight } from "@/utils/icons/actions";
import Link from "next/link";

interface FeaturedProps {
  products: ProductWithRelations[];
}

export default function FeaturedCarousel({
  products: initialProducts,
}: FeaturedProps) {
  const [products, setProducts] = useState(initialProducts.slice(0, 5));
  const [hasLoadedExtra, setHasLoadedExtra] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = useMemo(() => {
    return Math.max(0, products.length - visibleCount);
  }, [products.length, visibleCount]);
  useEffect(() => {
    if (initialProducts.length > 5 && !hasLoadedExtra) {
      const timer = setTimeout(() => {
        setProducts(initialProducts);
        setHasLoadedExtra(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [initialProducts, hasLoadedExtra]);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdateCount = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateCount, 150);
    };

    updateCount();
    window.addEventListener("resize", debouncedUpdateCount);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedUpdateCount);
    };
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
    const velocityThreshold = 500;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (
      info.offset.x > threshold ||
      info.velocity.x > velocityThreshold
    ) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (isPaused || products.length <= visibleCount) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, products.length, visibleCount]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-6 md:py-12 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-4">
        <div className="flex items-center justify-between mb-4 md:mb-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            Productos{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              Destacados
            </span>
          </h2>

          <Link
            href="/productos"
            className="group flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.15em] transition-all"
            aria-label="Ver colección de productos"
          >
            <span className="hidden sm:inline">VER CATÁLOGO COMPLETO</span>
            <span className="sm:hidden">CATÁLOGO</span>
            <ArrowNarrowRight className=" w-6 h-6 group-hover:translate-x-1 transition-transform text-[#4A3728]" />
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {products.length > visibleCount && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-20 z-50 pointer-events-none group/left flex items-center">
                <div className="pointer-events-auto w-full h-full flex items-center">
                  <SliderButton direction="left" onClick={handlePrev} />
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-20 z-50 pointer-events-none group/right flex items-center">
                <div className="pointer-events-auto w-full h-full flex items-center">
                  <SliderButton direction="right" onClick={handleNext} />
                </div>
              </div>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="flex -mx-2 md:-mx-3 cursor-grab active:cursor-grabbing"
            >
              {products.map((product: ProductWithRelations, idx: number) => (
                <div
                  key={product.id}
                  className="flex-none px-1 md:px-2"
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
