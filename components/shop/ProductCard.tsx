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

  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
      <div className="relative w-full border border-zinc-100 dark:border-white/5 rounded-sm bg-white dark:bg-[#0A0A0A]">
        <div className="relative aspect-square w-full overflow-hidden group/img cursor-pointer">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-1000 group-hover/img:scale-110"
          />
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 z-20 transition-all duration-300 drop-shadow-md hover:scale-110 ${
              isFav
                ? "text-red-500"
                : "text-zinc-900 dark:text-white hover:text-red-500"
            }`}
            aria-label="Favorito"
          >
            {isFav ? (
              <HiHeart className="text-2xl" />
            ) : (
              <HiOutlineHeart className="text-2xl" />
            )}
          </button>
          <div className="hidden md:flex absolute inset-0 items-end justify-end p-2 opacity-0 group-hover/img:opacity-100 transition-all duration-300 bg-black/5">
            <Link
              href={`/${product.category}/${product.subcategory}/${slugify(product.name)}`}
              className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transform translate-y-1 group-hover/img:translate-y-0 transition-all duration-300 hover:bg-[#4A3728] hover:text-white dark:hover:bg-[#4A3728] dark:hover:text-white"
            >
              Vista Rápida
            </Link>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-teal-600/30 dark:border-teal-400/30 text-[9px] text-teal-600 dark:text-teal-400 font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            <HiOutlineTruck className="text-sm" />
            <span>Envío 8 días</span>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-2 flex flex-col grow bg-white dark:bg-[#0A0A0A]">
        <div className="grow">
          <Link
            href={`/${product.category}/${product.subcategory}/${product.id}`}
          >
            <h3 className="text-[13px] md:text-[14px] font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 line-clamp-1 leading-tight hover:text-[#4A3728] transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-bold">
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <span>76cm</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4-4m-4 4l4 4"
                />
              </svg>
              <span>154cm</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: "rotate(45deg)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4-4m-4 4l4 4"
                />
              </svg>
              <span>55cm</span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-zinc-100 dark:border-white/5 pt-1">
          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-black text-zinc-900 dark:text-white leading-none">
              ${product.price}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-sm hover:bg-[#4A3728] dark:hover:bg-zinc-200 transition-all active:scale-95"
            aria-label="add-to-cart"
          >
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">
              Añadir
            </span>
            <HiOutlineShoppingBag className="text-lg" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
