"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "@/utils/icons/navigation";
import { CartPlusIcon, HeartFilled } from "@/utils/icons/actions";
import { CheckBadge } from "@/utils/icons/layout";
import { Truck } from "@/utils/icons/shop";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { slugify } from "@/utils/slug_url";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductWithRelations } from "@/types/product-service";

interface ProductCardProps {
  product: ProductWithRelations;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, isInCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(product.id);
  const inCart = isInCart(product.id);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getOptimizedImage = (url: string, width: number = 800) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  };

  const imageUrl = getOptimizedImage(
    product.images?.[0]?.url ||
      "https://res.cloudinary.com/dwvruzkll/image/upload/v1769123783/dormitorio_ig6v5k.webp",
    700,
  );

  const secondImageUrl = product.images?.[1]?.url
    ? getOptimizedImage(product.images[1].url, 700)
    : null;

  const productPath =
    `/${slugify(product.category || "")}/${slugify(product.subcategory || "")}/${slugify(product.name)}`.replace(
      /\/+/g,
      "/",
    );

  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = (product.discount ?? 0) > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * (product.discount ?? 0)) / 100
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) return;

    const firstVariant = product.variants?.[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      image: imageUrl,
      variantId: firstVariant?.id,
      sku: firstVariant?.sku || "N/A",
      variantName: firstVariant?.color || "No especificado",
      dimensions: firstVariant?.dimensions
        ? `${firstVariant.dimensions.height}x${firstVariant.dimensions.width}x${firstVariant.dimensions.depth}cm`
        : "Estándar",
      materials: product.materials?.join(", ") || "Melamina",
      category: product.category ?? undefined,
      subcategory: product.subcategory ?? undefined,
    });

    toast.success("¡Añadido al carrito!", {
      description: product.name,
      duration: 3000,
      style: {
        background: "#F9F7F4",
        color: "#5D4037",
        border: "1px solid #EDE8E0",
      },
      className: "font-bold",
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
      category: product.category ?? undefined,
      subcategory: product.subcategory ?? undefined,
    });

    if (!isFav) {
      toast.success("Añadido a favoritos", {
        icon: <HeartFilled className="text-red-500" />,
        duration: 3000,
        style: {
          background: "#F9F7F4",
          color: "#5D4037",
          border: "1px solid #EDE8E0",
        },
      });
    } else {
      toast.info("Eliminado de favoritos", {
        duration: 3000,
        style: {
          background: "#F9F7F4",
          color: "#5D4037",
          border: "1px solid #EDE8E0",
        },
      });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-[#fffff] dark:bg-[#1C1C1C] flex flex-col h-full border border-[#EDE8E0] dark:border-white/5 rounded-md overflow-hidden   transition-all duration-500"
    >
      <div
        className="relative w-full aspect-square overflow-hidden group/img cursor-pointer"
        onClick={() => router.push(productPath)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          priority={index < 4}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-1000 group-hover/img:scale-110"
        />
        {secondImageUrl && (
          <Image
            src={secondImageUrl}
            alt={`${product.name} - Vista alternativa`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-1000 group-hover/img:scale-110 absolute inset-0 z-10 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm z-50 ${
              isFav
                ? "bg-white text-red-500"
                : "bg-black/20 text-white hover:bg-white hover:text-red-500 scale-90 hover:scale-100"
            }`}
          >
            {isFav ? (
              <HeartFilled className="w-5 h-5" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <span className="bg-white/90 backdrop-blur-md text-[#4A4A4A] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
            Ver Detalles
          </span>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md shadow-sm z-20">
          <Truck className="w-3.5 h-3.5 text-[#897156] dark:text-[#A68B67]" />
          <span className="text-[11px] text-[#4A4A4A] dark:text-zinc-300 font-bold uppercase tracking-wider">
            {product.deliveryDays || 8} días
          </span>
        </div>

        {hasDiscount && (
          <div
            className="
    absolute top-3 left-3 z-2  px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-md bg-[#7A5C3E] text-white dark:bg-[#A98B6C] dark:text-[#1C1C1C] transition-all duration-300
  "
          >
            - {product.discount} %
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={productPath}>
            <h3 className="text-[14px] font-bold text-[#4A4A4A] dark:text-zinc-100 truncate leading-snug hover:text-[#897156] transition-colors mb-1">
              {product.name}
            </h3>
          </Link>
          {product.variants?.[0]?.dimensions && (
            <div className="flex items-center gap-3 text-[11px] text-[#4A4A4A]/70 dark:text-zinc-400 font-bold mb-2">
              <div className="flex items-center gap-1.5 p-1 px-2 bg-[#f8f8f8] dark:bg-white/5 rounded-xl">
                <span className="flex items-center gap-0.5">
                  <span className="text-[11px] opacity-60">⇅</span>
                  {product.variants[0].dimensions.height}cm
                </span>
                <span className="w-px h-2.5 bg-[#897156]/20 mx-0.5" />
                <span className="flex items-center gap-0.5">
                  <span className="text-[11px] opacity-60">⇄</span>
                  {product.variants[0].dimensions.width}cm
                </span>
                <span className="w-px h-2.5 bg-[#897156]/20 mx-0.5" />
                <span className="flex items-center gap-0.5">
                  <span className="text-[11px] opacity-60">⤢</span>
                  {product.variants[0].dimensions.depth}cm
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#EDE8E0] dark:border-white/5">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[11px] text-[#4A4A4A]/60 line-through font-medium leading-none mb-0.5">
                ${product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-black text-[#5D4037] dark:text-[#A68B67] tracking-tight leading-none">
              $
              {finalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isMounted && inCart}
            className={`flex items-center justify-center gap-2 h-10 px-4 rounded-xl transition-all duration-300 overflow-hidden shadow-md ${
              isMounted && inCart
                ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800"
                : "bg-[#141414] text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-95"
            }`}
          >
            <AnimatePresence mode="wait">
              {isMounted && inCart ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <CheckBadge className="w-4 h-4 text-emerald-500" />
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    Listo
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="bag"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <CartPlusIcon className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    Añadir
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
