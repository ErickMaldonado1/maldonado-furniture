import { ProductService } from "@/features/products/product.service";
import ProductListingClient from "@/components/ProductListingClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SearchX } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/shop/product/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query = "" } = await searchParams;

  const products = await ProductService.getAll({
    search: query,
  });

  let suggestions: any[] = [];
  if (products.length === 0) {
    suggestions = await ProductService.getAll({
      limit: 4,
    });
  }

  const serialize = (p: any) => ({
    ...JSON.parse(JSON.stringify(p)),
    price: Number(p.price),
    category: p.category || "Sin Categoría",
    subcategory: p.subcategory || "",
    color: p.variants[0]?.color || "",
    material: p.variants[0]?.material || "",
    style: "",
  });

  const serializedProducts = products.map(serialize);
  const serializedSuggestions = suggestions.map(serialize);

  return (
    <main className="pt-20 md:pt-32 pb-16 bg-white dark:bg-[#050505] min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <header className="mb-10 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <Breadcrumbs
            steps={[
              { label: "Tienda", href: "/productos" },
              { label: "Búsqueda", href: "/productos" },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
                {query ? `Buscas: "${query}"` : "Explorar Productos"}
              </h1>
              <p className="mt-3 text-zinc-500 font-medium italic text-sm">
                {products.length > 0 ? (
                  <>
                    Encontramos{" "}
                    <span className="text-zinc-900 dark:text-zinc-200 font-bold not-italic">
                      {products.length}
                    </span>{" "}
                    resultados
                  </>
                ) : (
                  "No hay coincidencias exactas"
                )}
              </p>
            </div>
          </div>
        </header>

        {products.length > 0 ? (
          <ProductListingClient initialProducts={serializedProducts} />
        ) : (
          <div className="space-y-20">
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <SearchX className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">
                No encontramos lo que buscas
              </h2>
              <p className="text-zinc-500 mt-2 max-w-xs mx-auto text-sm">
                No hay resultados para{" "}
                <span className="font-bold">"{query}"</span>. Intenta con
                palabras más generales.
              </p>
              <Link
                href="/productos"
                className="mt-8 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all rounded-full"
              >
                Ver todos los productos
              </Link>
            </div>

            {serializedSuggestions.length > 0 && (
              <section className="animate-in fade-in duration-1000 delay-300">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl sm:text-3xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
                    Productos que te{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                      podrían gustar
                    </span>
                  </h2>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 mx-6 hidden sm:block" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {serializedSuggestions.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
