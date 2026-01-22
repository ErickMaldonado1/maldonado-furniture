"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineShoppingBag,
  HiOutlineEye,
} from "react-icons/hi2";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@prisma/client";

interface FeaturedProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCartStore();

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <section className="py-24 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Superior */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#4A3728]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#4A3728]">
                Colección Exclusiva
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none dark:text-white">
              Tendencias <br /> <span className="text-zinc-400">Actuales</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="group p-4 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-black dark:hover:bg-white transition-all duration-300"
            >
              <HiOutlineChevronLeft className="text-xl group-hover:text-white dark:group-hover:text-black" />
            </button>
            <button
              onClick={handleNext}
              className="group p-4 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-black dark:hover:bg-white transition-all duration-300"
            >
              <HiOutlineChevronRight className="text-xl group-hover:text-white dark:group-hover:text-black" />
            </button>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                addToCart={addToCart}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, addToCart }: any) {
  const imageUrl =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Contenedor de Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-sm">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges Flotantes */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-black rounded-full shadow-xl">
            New In
          </span>
        </div>

        {/* Action Bar (Botones modernos) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full shadow-2xl hover:bg-[#4A3728] hover:text-white transition-colors"
          >
            <HiOutlineShoppingBag className="text-lg" />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              Añadir
            </span>
          </button>

          <Link
            href={`/productos/${product.id}`}
            className="p-3 bg-black/50 backdrop-blur-xl text-white rounded-full hover:bg-white hover:text-black transition-all border border-white/20"
          >
            <HiOutlineEye className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Info del Producto */}
      <div className="mt-6 space-y-2 px-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Categoría Premium
            </p>
          </div>
          <p className="text-lg font-black text-[#4A3728] dark:text-[#C5A28E]">
            ${product.price.toLocaleString()}
          </p>
        </div>

        {/* Línea decorativa que crece en hover */}
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
