import React from "react";
import { getProducts } from "@/features/shop/shop.actions";
import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function SubCategoryPage({ params }: Props) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return notFound();

  const subcategory = category.subcategories.find(
    (s) => s.sub === subcategorySlug,
  );
  if (!subcategory) return notFound();

  const { products } = await getProducts({
    category: categorySlug,
    subcategory: subcategorySlug,
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-1600px mx-auto">
    
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2 text-sm text-zinc-500 uppercase tracking-widest font-medium">
          <span>{category.label}</span>
          <span className="text-zinc-300">/</span>
          <span className="text-[#4A3728]">{subcategory.label}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase text-[#2B2118] dark:text-white tracking-tighter">
          {subcategory.label}
        </h1>

        <div className="h-1 w-20 bg-[#4A3728]" />
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} index={0} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h3 className="text-xl font-bold text-zinc-400">
            No hay productos disponibles en esta sección por el momento.
          </h3>
          <p className="text-zinc-500 mt-2">
            Estamos trabajando en la nueva colección de {subcategory.label}.
          </p>
        </div>
      )}
    </div>
  );
}
