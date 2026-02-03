"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/utils/icons/navigation";
import { XMark } from "@/utils/icons/actions";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const displayImages =
    images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200"];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length,
    );
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 h-fit sticky top-24">
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-150 scrollbar-hide py-2 lg:py-0">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={`
              relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all
              ${
                selectedImageIndex === idx
                  ? "border-black dark:border-white ring-1 ring-black dark:ring-white"
                  : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
              }
            `}
            aria-label="display-images"
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div
        className="flex-1 relative aspect-square bg-[#F3F3F3] dark:bg-[#121212] rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 cursor-zoom-in group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={displayImages[selectedImageIndex]}
              alt={productName}
              fill
              className="object-contain p-4 lg:p-8"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            Ver Pantalla Completa
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors z-110"
              aria-label="lightbox"
            >
              <XMark className="w-6 h-6" />
            </button>

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 lg:left-10 p-3 rounded-full bg-white dark:bg-zinc-900 shadow-xl hover:scale-110 transition-transform h-12 w-12 flex items-center justify-center z-110"
                  aria-label="prev"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 lg:right-10 p-3 rounded-full bg-white dark:bg-zinc-900 shadow-xl hover:scale-110 transition-transform h-12 w-12 flex items-center justify-center z-110"
                  aria-label="next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              layoutId={`image-full-${selectedImageIndex}`}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[selectedImageIndex]}
                alt={productName}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Thumbnails in Lightbox */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? "border-amber-500 scale-110" : "border-transparent opacity-50 hover:opacity-100"}`}
                  aria-label="index-images"
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
