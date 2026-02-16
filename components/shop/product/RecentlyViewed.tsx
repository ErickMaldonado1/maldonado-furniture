"use client";

import { useState, useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import ProductCard from "@/components/shop/product/ProductCard";
import { Product } from "@prisma/client";

export function RecentlyViewed({
  currentProduct,
}: {
  currentProduct: Product;
}) {
  const [mounted, setMounted] = useState(false);
  const { recentProducts } = useRecentlyViewed(currentProduct);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || recentProducts.length === 0) return null;

  const displayedProducts = recentProducts.slice(0, 8);

  return (
    <section className="pt-24 border-t border-zinc-100 dark:border-zinc-900 mt-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
          Tu Historial de{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
            Navegación
          </span>
        </h2>
        <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 mx-8 hidden md:block" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8">
        {displayedProducts.map((p, idx) => (
          <ProductCard key={p.id} product={p as any} index={idx} />
        ))}
      </div>
    </section>
  );
}
