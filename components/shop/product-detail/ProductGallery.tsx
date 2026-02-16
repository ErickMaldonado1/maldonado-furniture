"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartFilled } from "@/utils/icons/actions";
import { Heart } from "@/utils/icons/navigation";
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
        <div className="flex flex-row md:flex-col gap-2 md:w-16 shrink-0 overflow-x-auto md:overflow-y-auto max-h-125 custom-scrollbar hide-scrollbar-mobile order-2 md:order-1">
          {product.images?.map((img, i) => (
            <button
              key={i}
              onClick={() => onImageSelect(i)}
              className={`relative w-16 h-16 md:w-full md:h-16 aspect-square rounded-sm overflow-hidden border transition-all duration-300 ${
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
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>

        <div className="flex-1 relative z-10 w-full order-1 md:order-2">
          <div
            className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full max-h-[700px] rounded-sm overflow-hidden bg-[#fcfcfc] dark:bg-[#080808] border border-zinc-100 dark:border-white/5 cursor-zoom-in group flex items-center justify-center p-4 md:p-8"
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
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  priority
                />
              </motion.div>
            </AnimatePresence>

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
                {isFav ? (
                  <HeartFilled className="w-6 h-6" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </button>
            </div>

            {product.discount && product.discount > 0 && (
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white text-black dark:bg-[#050505] dark:text-white text-[12px] font-black uppercase tracking-widest px-3 py-1 border border-white/10 shadow-sm">
                  -{product.discount}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
                onClick={() => setIsZoomed(false)}
              >
                <button
                  className="absolute top-4 right-4 text-white p-4 hover:opacity-70 z-[10000] bg-white/10 rounded-full backdrop-blur-sm transition-all hover:bg-white/20"
                  onClick={() => setIsZoomed(false)}
                  aria-label="Cerrar vista ampliada"
                >
                  <svg
                    className="w-5 h-5"
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
                  className="relative w-full max-w-6xl h-full flex items-center justify-center px-4 md:px-20"
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

                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();

                      const newIndex =
                        selectedImage === 0
                          ? (product.images?.length || 1) - 1
                          : selectedImage - 1;
                      onImageSelect(newIndex);
                    }}
                    aria-label="Imagen anterior"
                  >
                    <svg
                      className="w-5 h-5"
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
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex =
                        selectedImage === (product.images?.length || 1) - 1
                          ? 0
                          : selectedImage + 1;
                      onImageSelect(newIndex);
                    }}
                    aria-label="Imagen siguiente"
                  >
                    <svg
                      className="w-5 h-5"
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

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2 custom-scrollbar">
                  {product.images?.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageSelect(i);
                      }}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === i
                          ? "border-white scale-110 shadow-lg"
                          : "border-transparent opacity-50 hover:opacity-100 hover:border-white/50"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Vista miniatura ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
