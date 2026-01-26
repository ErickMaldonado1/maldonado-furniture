"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiHeart,
  HiOutlineHeart,
  HiMinus,
  HiPlus,
} from "react-icons/hi2";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import ProductCard from "@/components/shop/ProductCard";
import Image from "next/image";

interface ProductWithRelations extends Product {
  images: any[];
  variants: any[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: ProductWithRelations;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);
  const currentImageUrl =
    product.images?.[selectedImage]?.url || product.images?.[0]?.url || "";
  const finalPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: quantity,
      image: product.images?.[0]?.url || "",
      variantId: product.variants?.[0]?.id,
    });
    toast.success("Producto añadido al carrito");
  };

  return (
    <div className="space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* GALERÍA DE IMÁGENES */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
          {/* MINIATURAS */}
          <div className="flex flex-row md:flex-col gap-4 md:w-24 shrink-0">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-[#4A3728] scale-105" : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600"}`}
              >
                <Image
                  src={img.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* IMAGEN PRINCIPAL */}
          <div className="flex-1">
            <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group cursor-zoom-in shadow-2xl shadow-zinc-200/50 dark:shadow-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-6 right-6">
                <button
                  onClick={() =>
                    toggleFavorite({
                      id: product.id,
                      name: product.name,
                      image: product.images?.[0]?.url || "",
                      price: finalPrice,
                    })
                  }
                  className={`h-12 w-12 rounded-full backdrop-blur-md flex items-center justify-center text-xl transition-all ${isFav ? "bg-white text-red-500 shadow-xl" : "bg-white/80 dark:bg-black/50 text-zinc-900 dark:text-white hover:scale-110"}`}
                >
                  {isFav ? <HiHeart /> : <HiOutlineHeart />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DETALLES DEL PRODUCTO */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728] mb-6 border-l-2 border-[#4A3728] pl-4">
                <span>{product.category}</span>
                <span className="text-zinc-300">/</span>
                <span>{product.subcategory}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9] text-zinc-900 dark:text-white">
                {product.name}
              </h1>
              <div className="flex items-end gap-5">
                <span className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white">
                  ${finalPrice.toLocaleString()}
                </span>
                {product.discount && (
                  <span className="text-xl text-zinc-400 line-through decoration-[#4A3728]/30 mb-1">
                    ${product.price.toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-[#4A3728] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-lg">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-medium max-w-lg">
              {product.description}
            </p>

            <div className="space-y-8 pt-4">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full h-16 w-full sm:w-40 justify-between px-6 bg-white dark:bg-zinc-900/50 shadow-sm transition-all focus-within:border-[#4A3728]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-zinc-400 hover:text-[#4A3728] transition-colors p-2 active:scale-95"
                  >
                    <HiMinus size={20} />
                  </button>
                  <span className="font-black text-xl tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-zinc-400 hover:text-[#4A3728] transition-colors p-2 active:scale-95"
                  >
                    <HiPlus size={20} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 h-16 rounded-full flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-[#4A3728] dark:hover:bg-zinc-100 transition-all shadow-2xl shadow-zinc-900/20 active:scale-[0.98]"
                >
                  <HiOutlineShoppingBag className="text-2xl" />
                  Añadir al Carrito
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                    Disponibilidad
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    En Stock
                  </p>
                </div>
                <div className="p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                    Envío Estimado
                  </p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-bold">
                    5 - 8 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              También te puede <span className="text-[#4A3728]">interesar</span>
            </h2>
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 mx-8 hidden md:block" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, idx) => (
              <ProductCard
                key={p.id}
                product={p as any}
                addToCart={addToCart}
                index={idx}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
