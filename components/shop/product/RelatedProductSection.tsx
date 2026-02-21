"use client";

import ProductCard from "@/components/shop/product/ProductCard";
import { Product } from "@prisma/client";

interface RelatedProductsSectionProps {
  relatedProducts: Product[];
}

export function RelatedProductsSection({
  relatedProducts,
}: RelatedProductsSectionProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="pt-12 border-t border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
          Los Clientes también{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
            vieron
          </span>
        </h2>
        <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 mx-8 hidden md:block" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts.slice(0, 4).map((p, idx) => (
          <ProductCard key={p.id} product={p as any} index={idx} />
        ))}
      </div>
    </section>
  );
}
