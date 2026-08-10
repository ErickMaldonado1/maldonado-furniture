"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  productName: string;
  images: any[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
  isFav: boolean;
  onToggleFav: () => void;
}

export function ProductGallery({
  productName,
  images,
  selectedImage,
  onImageSelect,
}: ProductGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(selectedImage);

  useEffect(() => {
    setZoomIndex(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    if (isZoomed) {
      setIsZoomed(false);
    }
  }, [images]);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  const handleOpenZoom = (index: number) => {
    onImageSelect(index);
    setZoomIndex(index);
    setIsZoomed(true);
  };

  const primaryImage = images[selectedImage]?.url || images[0]?.url || "";
  const mainHero = images[selectedImage] || images[0];
  const pair1 = images.slice(1, 3);
  const fullWidth2 = images[3];
  const pair2 = images.slice(4, 6);
  const remainingImages = images.slice(6);

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        {mainHero && (
          <div
            onClick={() => handleOpenZoom(selectedImage)}
            className="relative aspect-[4/3] md:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 cursor-zoom-in group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mainHero.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={mainHero.url}
                  alt={productName}
                  fill
                  className="object-contain p-3 md:p-6 group-hover:scale-103 transition-transform duration-500"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            {mainHero.color && (
              <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md label-premium !text-zinc-900 dark:!text-white shadow-sm">
                {mainHero.color}
              </span>
            )}
          </div>
        )}

        {pair1.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {pair1.map((img, i) => {
              const actualIndex = i + 1;
              return (
                <div
                  key={img.id || actualIndex}
                  onClick={() => handleOpenZoom(actualIndex)}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 cursor-zoom-in group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <Image
                    src={img.url}
                    alt={`${productName} vista ${actualIndex + 1}`}
                    fill
                    className="object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  {img.color && (
                    <span className="absolute bottom-2 left-2 bg-white/90 dark:bg-black/80 backdrop-blur-md label-premium !text-zinc-900 dark:!text-white shadow-sm !text-[9px]">
                      {img.color}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {fullWidth2 && (
          <div
            onClick={() => handleOpenZoom(3)}
            className="relative aspect-[4/3] md:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 cursor-zoom-in group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <Image
              src={fullWidth2.url}
              alt={`${productName} vista 4`}
              fill
              className="object-contain p-3 md:p-6 group-hover:scale-103 transition-transform duration-500"
            />
          </div>
        )}

        {pair2.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {pair2.map((img, i) => {
              const actualIndex = i + 4;
              return (
                <div
                  key={img.id || actualIndex}
                  onClick={() => handleOpenZoom(actualIndex)}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 cursor-zoom-in group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <Image
                    src={img.url}
                    alt={`${productName} vista ${actualIndex + 1}`}
                    fill
                    className="object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              );
            })}
          </div>
        )}

        {remainingImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {remainingImages.map((img, i) => {
              const actualIndex = i + 6;
              return (
                <div
                  key={img.id || actualIndex}
                  onClick={() => handleOpenZoom(actualIndex)}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 cursor-zoom-in group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <Image
                    src={img.url}
                    alt={`${productName} vista ${actualIndex + 1}`}
                    fill
                    className="object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setIsZoomed(false)}
              >
                <button
                  type="button"
                  className="absolute top-5 right-5 text-white p-3 hover:opacity-70 z-[10000] bg-white/10 rounded-full backdrop-blur-sm transition-all hover:bg-white/20"
                  onClick={() => setIsZoomed(false)}
                  aria-label="Cerrar vista ampliada"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div
                  className="relative w-full max-w-6xl h-full flex items-center justify-center px-4 md:px-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full max-h-[85vh]">
                    <Image
                      src={images[zoomIndex]?.url || primaryImage}
                      alt={productName}
                      fill
                      className="object-contain"
                      priority
                      quality={100}
                    />
                  </div>

                  <button
                    type="button"
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-full backdrop-blur-sm transition-all hover:scale-110 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      const next =
                        zoomIndex === 0 ? images.length - 1 : zoomIndex - 1;
                      setZoomIndex(next);
                      onImageSelect(next);
                    }}
                    aria-label="Imagen anterior"
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
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-full backdrop-blur-sm transition-all hover:scale-110 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      const next =
                        zoomIndex === images.length - 1 ? 0 : zoomIndex + 1;
                      setZoomIndex(next);
                      onImageSelect(next);
                    }}
                    aria-label="Imagen siguiente"
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
                      />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2 custom-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={img.id || i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomIndex(i);
                        onImageSelect(i);
                      }}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        zoomIndex === i
                          ? "border-amber-400 scale-110 shadow-lg"
                          : "border-transparent opacity-50 hover:opacity-100 hover:border-white/50"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Vista miniatura ${i + 1}`}
                        fill
                        className="object-cover bg-white"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
