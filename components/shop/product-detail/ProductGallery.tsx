"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartFilled } from "@/utils/icons/index";
import { Product } from "@prisma/client";

interface ProductGalleryProps {
  product: Product & { images: any[] };
  selectedImage: number;
  onImageSelect: (index: number) => void;
  isFav: boolean;
  onToggleFav: () => void;
}

export function ProductGallery({
  product,
  selectedImage,
  onImageSelect,
  isFav,
  onToggleFav,
}: ProductGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentImageUrl =
    product.images?.[selectedImage]?.url || product.images?.[0]?.url || "";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 h-full">
        {/* Thumbnails */}
        <div className="flex flex-row md:flex-col gap-2 md:w-16 shrink-0 overflow-x-auto md:overflow-y-auto max-h-125 custom-scrollbar hide-scrollbar-mobile order-2 md:order-1">
          {product.images?.map((img, i) => (
            <button
              key={i}
              onClick={() => onImageSelect(i)}
              className={`relative w-16 h-16 md:w-full md:h-16 aspect-square rounded-full overflow-hidden border transition-all duration-300 ${
                selectedImage === i
                  ? "border-zinc-900 dark:border-white opacity-100"
                  : "border-transparent opacity-40 hover:opacity-100 hover:border-zinc-200 dark:hover:border-zinc-800"
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={`${product.name} vista ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 relative z-10 w-full order-1 md:order-2">
          <div
            className="relative aspect-square md:aspect-4/5 lg:aspect-square w-full max-h-175 rounded-full overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a] border border-white/5 cursor-zoom-in group"
            onClick={() => setIsZoomed(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentImageUrl}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Fav Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFav();
                }}
                className={`h-10 w-10 rounded-full backdrop-blur-md flex items-center justify-center text-lg transition-all shadow-lg ${
                  isFav
                    ? "bg-white text-red-500 hover:bg-red-50"
                    : "bg-white/90 text-zinc-900 hover:bg-white hover:scale-110"
                }`}
              >
                {isFav ? <HeartFilled /> : <Heart />}
              </button>
            </div>

            {/* Discount Badge */}
            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white text-black dark:bg-[#050505] dark:text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-white/10 shadow-sm">
                  -{product.discount}%
                </span>
              </div>
            )}
          </div>
        </div>
        {/* TODO: Add Lightbox Overlay logic in a separate step or component if needed by user specifically */}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsZoomed(false)}
          >
            <button
              className="absolute top-4 right-4 text-white p-4 hover:opacity-70 z-50"
              onClick={() => setIsZoomed(false)}
            >
              Start closing
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div
              className="relative w-full max-w-5xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={currentImageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
              </div>

              {/* Navigation Buttons */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-all -ml-2 md:-ml-12"
                onClick={(e) => {
                  e.stopPropagation();
                  // Cycle previous
                  const newIndex =
                    selectedImage === 0
                      ? (product.images?.length || 1) - 1
                      : selectedImage - 1;
                  onImageSelect(newIndex);
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur transition-all -mr-2 md:-mr-12"
                onClick={(e) => {
                  e.stopPropagation();
                  // Cycle next
                  const newIndex =
                    selectedImage === (product.images?.length || 1) - 1
                      ? 0
                      : selectedImage + 1;
                  onImageSelect(newIndex);
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Thumbs in Lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageSelect(i);
                  }}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-white scale-110"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt="thumb"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
