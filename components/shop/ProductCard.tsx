"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineShoppingBag,
  HiOutlineEye,
  HiOutlineHeart,
  HiHeart,
  HiOutlineTruck,
} from "react-icons/hi2";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { slugify } from "@/utils/slug_url";

interface ProductCardProps {
  product: any;
  index: number;
  addToCart?: (product: any) => void; 
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(product.id);

  const imageUrl =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80";

  // Calcular precio con descuento si existiera
  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      image: imageUrl,
      variantId: product.variants?.[0]?.id,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      name: product.name,
      image: imageUrl,
      price: finalPrice,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-[#0A0A0A] flex flex-col h-full border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300"
    >
      <div className="relative aspect-square w-full bg-[#F3F3F3] dark:bg-[#121212] overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full shadow-sm hover:text-red-500 transition-colors z-10">
          <HiOutlineHeart className="text-xl" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 backdrop-blur-[2px]">
          <Link
            href={`/${product.category}/${product.subcategory}/${slugify(product.name)}`}
            className="bg-white text-black px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-[0.15em] shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <HiOutlineEye className="text-xl" />
            Vista Rápida
          </Link>
        </div>

        {/* Badge de Envío (Estilo imagen) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-black/60 px-2 py-1 rounded text-[12px] text-teal-600 dark:text-teal-400 font-bold">
          <HiOutlineTruck />
          Envío en 8 días
        </div>
      </div>

      {/* Info del Producto */}
      <div className="p-4 flex flex-col grow">
        <div className="grow">
          <Link
            href={`/${product.category}/${product.subcategory}/${product.id}`}
          >
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-tight hover:underline">
              {product.name}
            </h3>
          </Link>

          {/* Medidas (Extraídas de la lógica de la imagen) */}
          <div className="mt-2 flex items-center gap-3 text-[11px] text-zinc-500 font-medium">
            <span className="flex items-center gap-0.5">↕ 76 cm</span>
            <span className="flex items-center gap-0.5">↔ 154 cm</span>
            <span className="flex items-center gap-0.5">↗ 55 cm</span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest leading-none mb-1">
              Precio
            </span>
            <p className="text-xl font-black text-black dark:text-white leading-none">
              {product.price}€
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg"
          >
            <HiOutlineShoppingBag className="text-xl" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
