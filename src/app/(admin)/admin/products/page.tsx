import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductSearchBtn } from "@/app/(admin)/admin/ProductSearchBtn";
import { ProductFilters } from "./ProductFilters";
import { ProductsTableClient } from "./ProductsTableClient";
import { getProductsPaginated } from "@/features/admin/products/product.actions";

export default async function InventoryPage(props: {
  searchParams: Promise<{
    query?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category;
  const subcategory = searchParams?.subcategory;

  const allProducts = await prisma.product.findMany({
    select: { category: true, subcategory: true },
  });
  const categories = Array.from(
    new Set(allProducts.map((p) => p.category)),
  ).filter((c): c is string => !!c);
  const subcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory)),
  ).filter((s): s is string => !!s);

  const res = await getProductsPaginated(query, category, subcategory, 0, 20);
  const products = res.success && res.products ? res.products : [];
  const hasMore = res.success ? (res.hasMore ?? false) : false;

  return (
    <div className="space-y-6 pb-10">
      <div className="pt-8 md:pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Inventario de{" "}
            <span className="text-[#4A3728] dark:text-[#A6866A]">
              Productos
            </span>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Gestiona tu catálogo, stock y variantes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ProductSearchBtn />
          <div className="hidden md:block">
            <ProductFilters
              categories={categories}
              subcategories={subcategories}
            />
          </div>
          <Link
            href="/admin/products/new"
            className="bg-[#4A3728] dark:bg-[#A6866A] text-white px-5 py-2.5 rounded-md flex items-center gap-2 font-semibold text-xs hover:opacity-90 transition-all shadow-lg shadow-[#4A3728]/10 dark:shadow-none"
          >
            <Plus size={18} /> Nuevo Producto
          </Link>
        </div>
      </div>
      <div className="md:hidden">
        <ProductFilters categories={categories} subcategories={subcategories} />
      </div>

      <ProductsTableClient 
        initialProducts={products} 
        initialHasMore={hasMore} 
        query={query} 
        category={category} 
        subcategory={subcategory} 
      />
    </div>
  );
}
