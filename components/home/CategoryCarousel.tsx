"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import ProductCard from "@/components/shop/product/ProductCard";
import Link from "next/link";
import { SliderButton } from "../ui/SliderButton";
import { ArrowRight } from "@/utils/icons/navigation";
import { ProductWithRelations } from "@/types/product-service";
import { shuffleArray } from "@/utils/shuffle";

interface Props {
  products: ProductWithRelations[];
  title: string;
  categorySlug: string;
}

export default function CategoryCarousel({
  products: initialProducts,
  title,
  categorySlug,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setProducts(shuffleArray(initialProducts).slice(0, 8));
  }, [initialProducts]);

  const words = title.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");
  const maxIndex = useMemo(() => {
    return Math.max(0, products.length - visibleCount);
  }, [products.length, visibleCount]);

  const shouldShowControls = products.length > visibleCount;

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
    if (isPaused || !shouldShowControls) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, shouldShowControls]);

  if (products.length === 0) return null;

  return (
    <section className="py-6 md:py-12 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-4 text-center sm:text-left">
        <div className="flex items-center justify-between mb-4 md:mb-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-5">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            {firstPart}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
              {lastWord}
            </span>
          </h2>

          <Link
            href={`/${categorySlug}`}
            className="group flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.15em] transition-all"
            aria-label={`Ver colección de ${categorySlug.replace("-", " ")}`}
          >
            <span className="hidden sm:inline">VER COLECCIÓN</span>
            <span className="sm:hidden mt-1">COLECCIÓN</span>
            <ArrowRight className="w-6 h-6 text-[#4A3728] group-hover:translate-x-1 transition-transform mt-1" />
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {shouldShowControls && (
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
              className="flex -mx-2 md:-mx-4 cursor-grab active:cursor-grabbing"
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
