import React from "react";
import prisma from "@/lib/prisma";
import ProductListingClient from "../../[category]/[subcategory]/ProductListingClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query = "" } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
        { subcategory: { contains: query, mode: "insensitive" } },
      ],
      isActive: true,
    },
    include: {
      images: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-white dark:bg-[#050505] min-h-screen transition-all">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <header className="mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-8">
          <Breadcrumbs
            steps={[{ label: "Tienda", href: "/" }, { label: "Búsqueda" }]}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
                {query ? `Buscas: "${query}"` : "Explorar Productos"}
              </h1>
              <p className="mt-4 text-zinc-500 font-medium italic">
                Encontramos {products.length} resultados para tu selección
              </p>
            </div>
          </div>
        </header>

        <ProductListingClient
          initialProducts={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </main>
  );
}
