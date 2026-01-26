"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/features/favorites/favorites-store";
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
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);
  const imageUrl = product.images?.[0]?.url || "";
  const finalPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: quantity,
      image: imageUrl,
      variantId: product.variants?.[0]?.id,
    });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-[#4A3728] transition-all"
              >
                <Image
                  src={img.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#4A3728] mb-4">
              <span>{product.category}</span>
              <div className="w-8 h-0.5 bg-[#4A3728]/30" />
              <span>{product.subcategory}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black tracking-tighter">
                ${finalPrice.toLocaleString()}
              </span>
              {product.discount && (
                <span className="text-xl text-zinc-400 line-through decoration-red-500/50">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-full h-14 w-36 justify-between px-6 bg-white dark:bg-[#0A0A0A] shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="hover:text-[#4A3728] transition-colors p-2"
                >
                  <HiMinus />
                </button>
                <span className="font-black text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="hover:text-[#4A3728] transition-colors p-2"
                >
                  <HiPlus />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#1A1A1A] dark:bg-white text-white dark:text-black h-14 rounded-full flex items-center justify-center gap-3 font-black uppercase tracking-widest hover:bg-[#4A3728] dark:hover:bg-[#E7DED4] transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <HiOutlineShoppingBag className="text-2xl" />
                Añadir al Carrito
              </button>

              <button
                onClick={() =>
                  toggleFavorite({
                    id: product.id,
                    name: product.name,
                    image: imageUrl,
                    price: finalPrice,
                  })
                }
                className={`h-14 w-14 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-2xl transition-all shadow-sm ${isFav ? "text-red-500 border-red-200 bg-red-50" : "text-zinc-400 hover:border-red-400 hover:text-red-400 hover:bg-red-50/50"}`}
              >
                {isFav ? <HiHeart /> : <HiOutlineHeart />}
              </button>
            </div>

            <div className="p-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <p className="text-sm text-green-700 dark:text-green-400 font-bold uppercase tracking-widest">
                En Stock. Envío inmediato disponible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-20 border-t border-zinc-100 dark:border-zinc-900">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">
            También te puede <span className="text-[#4A3728]">interesar</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
