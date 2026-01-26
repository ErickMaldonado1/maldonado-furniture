import React from "react";

import { categories } from "@/lib/categories";
import ProductCard from "@/components/shop/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ProductListingClient from "./ProductListingClient";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const categoryConfig = categories.find((c) => c.slug === categorySlug);
  if (!categoryConfig) return notFound();
  const subcategoryConfig = categoryConfig.subcategories.find(
    (s) => s.sub === subcategorySlug,
  );
  if (!subcategoryConfig) return notFound();
  const productsFromDB = await prisma.product.findMany({
    where: {
      category: {
        equals: categorySlug,
        mode: "insensitive",
      },
      subcategory: {
        equals: subcategoryConfig.label,
        mode: "insensitive",
      },
    },
    include: {
      images: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="pt-20 md:pt-32 pb-16 bg-white dark:bg-[#050505] min-h-screen transition-all">
      <div className="max-w-350 mx-auto px-4 sm:px-6">
        <header className="mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <Breadcrumbs
            steps={[
              { label: categoryConfig.label, href: `/${categorySlug}` },
              { label: subcategoryConfig.label },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
            {subcategoryConfig.label}
          </h1>
        </header>
        <ProductListingClient
          initialProducts={JSON.parse(JSON.stringify(productsFromDB))}
        />
      </div>
    </main>
  );
}
