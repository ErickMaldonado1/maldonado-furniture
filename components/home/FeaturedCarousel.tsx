"use client";

import React, { useRef } from "react";
import ProductCard from "../shop/ProductCard";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type Props = {
  products: any[];
};

const FeaturedCarousel: React.FC<Props> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-32 bg-[#F9F7F2] dark:bg-[#121212]/40">
      <div className="max-w-360 mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-20">
          <div className="max-w-xl">
            <p className="text-[#4A3728] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              Piezas de Autor
            </p>
            <h3 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white leading-[0.85] uppercase tracking-tighter font-heading">
              DISEÑO <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                DE VANGUARDIA.
              </span>
            </h3>
          </div>

          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scroll("left")}
              className="w-16 h-16 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white hover:bg-[#4A3728] hover:border-[#4A3728] hover:text-white transition-all shadow-sm"
            >
              <HiOutlineChevronLeft size={28} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-16 h-16 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white hover:bg-[#4A3728] hover:border-[#4A3728] hover:text-white transition-all shadow-sm"
            >
              <HiOutlineChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.length === 0 ? (
            <div className="w-full text-center py-20 text-zinc-400 italic font-medium">
              Cargando la próxima gran pieza...
            </div>
          ) : (
            products.map((product, idx) => (
              <div key={idx} className="min-w-[320px] md:min-w-105 snap-start">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
