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
import cloudinaryLoader from "@/utils/cloudinaryLoader";

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

  const rawImageUrl = product.images?.[0]?.url || "https://res.cloudinary.com/dwvruzkll/image/upload/v1769123783/dormitorio_ig6v5k.webp";
  const rawSecondImageUrl = product.images?.[1]?.url || null;

  const getOptimizedImage = (url: string, width: number = 800) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  };

  const imageUrl = getOptimizedImage(rawImageUrl, 700);

  const secondImageUrl = rawSecondImageUrl
    ? getOptimizedImage(rawSecondImageUrl, 700)
    : null;

  const productPath =
    `/${slugify(product.category || "")}/${slugify(product.subcategory || "")}/${product.slug || slugify(product.name)}`.replace(
      /\/+/g,
      "/",
    );

  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = (product.discount ?? 0) > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * (product.discount ?? 0)) / 100
    : product.price;
  const cartStatus = isMounted && inCart;

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-[#1C1C1C] flex flex-col h-full border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl cursor-default"
    >
      <div
        className="relative w-full aspect-square overflow-hidden group/img cursor-pointer"
        onClick={() => router.push(productPath)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Ver detalles de ${product.name}`}
        role="button"
        tabIndex={0}
      >
        <Image
          loader={cloudinaryLoader}
          src={rawImageUrl}
          alt={product.name}
          fill
          priority={index < 4}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
          className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
        />
        {rawSecondImageUrl && (
          <Image
            loader={cloudinaryLoader}
            src={rawSecondImageUrl}
            alt={`${product.name} - Vista alternativa`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
            className={`object-cover object-center transition-all duration-700 group-hover/img:scale-105 absolute inset-0 z-10 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          />
        )}

        <div className="absolute top-2 right-2 z-30 flex flex-col gap-2">
          <button
            onClick={handleToggleFavorite}
            aria-label={isFav ? "Eliminar de favoritos" : "Añadir a favoritos"}
            className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm z-50 ${isFav
              ? "bg-white text-red-500"
              : "bg-black/20 text-white hover:bg-white hover:text-red-500 scale-90 hover:scale-100"
              }`}
          >
            {isFav ? (
              <HeartFilled className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <span className="bg-white/90 backdrop-blur-md text-zinc-900 px-6 py-2.5 rounded-full label-premium shadow-xl transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
            Ver Detalles
          </span>
        </div>

        <div className="hidden sm:flex absolute bottom-3 left-3 items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-black/70 backdrop-blur-md shadow-sm z-20 border border-black/5 dark:border-white/10 transition-all duration-300">
          <Truck className="w-3.5 h-3.5 text-[#758A6B] dark:text-[#A68B67]" />
          <span className="text-sm font-medium text-neutral-700 dark:text-zinc-200">
            {product.deliveryDays || 8} días
          </span>
        </div>

        {hasDiscount && product.discount !== null && (
          <div
            className={`absolute top-3 left-3 z-20 px-2.5 py-1 rounded-sm text-[11px] font-bold -wider shadow-sm text-white transition-all duration-300 ${product.discount >= 10
              ? "bg-rose-700 shadow-rose-900/20"
              : product.discount > 5
                ? "bg-[#567249]"
                : "bg-stone-800"
              }`}
          >
            - {product.discount} %
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3 flex flex-col flex-1 cursor-default">
        <div className="flex-1">
          <Link href={productPath}>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 truncate  leading-snug hover:text-[#7A5C3E] dark:hover:text-[#A98B6C] transition-colors duration-200 mb-1">
              {product.name}
            </h3>
          </Link>
          {product.variants?.[0]?.dimensions && (
            <div className="flex items-center gap-3 text-[11px] text-zinc-700 dark:text-zinc-300 font-medium mb-2 uppercase tracking-wide">
              <div className="flex items-center gap-1 p-1 px-2 bg-zinc-200/70 dark:bg-zinc-800 rounded-md">
                <span className="flex items-center gap-1">
                  <span className="text-xs opacity-90">⇅</span>
                  {product.variants[0].dimensions.height}cm
                </span>
                <span className="w-px h-2.5 bg-[#897156]/40 mx-0.5" />
                <span className="flex items-center gap-1">
                  <span className="text-xs opacity-90">⇄</span>
                  {product.variants[0].dimensions.width}cm
                </span>
                <span className="w-px h-2.5 bg-[#897156]/40 mx-0.5" />
                <span className="flex items-center gap-1">
                  <span className="text-xs opacity-90">⤢</span>
                  {product.variants[0].dimensions.depth}cm
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#EDE8E0] dark:border-white/5">
          <div className="flex flex-col items-start cursor-default">
            {hasDiscount && (
              <span className="text-[11px] text-zinc-600 dark:text-zinc-300 line-through font-light leading-none mb-0.5">
                ${product.price.toLocaleString()}
              </span>
            )}
            <span className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white leading-none">
              ${finalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={cartStatus}
            aria-label={
              cartStatus ? "Producto en el carrito" : "Añadir al carrito"
            }
            className={`hidden md:flex items-center justify-center gap-2 h-10 px-2 sm:px-4 rounded-xl transition-all duration-300 overflow-hidden shadow-md ${cartStatus
              ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800"
              : "bg-[#141414] text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-95"
              }`}
          >
            <AnimatePresence mode="wait">
              {cartStatus ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <CheckBadge className="w-4 h-4 text-emerald-500" />
                  <span className="label-premium text-emerald-500!">Listo</span>
                </motion.div>
              ) : (
                <motion.div
                  key="bag"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <CartPlusIcon className="w-4 h-4" />
                  <span className="label-premium text-white! whitespace-nowrap">
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
