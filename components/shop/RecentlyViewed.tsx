"use client";

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@prisma/client";

export function RecentlyViewed({
  currentProduct,
}: {
  currentProduct: Product;
}) {
  const { recentProducts } = useRecentlyViewed(currentProduct);

  if (recentProducts.length === 0) return null;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recentProducts.map((p, idx) => (
          <ProductCard key={p.id} product={p as any} index={idx} />
        ))}
      </div>
    </section>
  );
}
