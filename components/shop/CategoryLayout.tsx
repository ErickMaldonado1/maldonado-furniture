"use client";

import { notFound } from "next/navigation";
import { categories } from "@/utils/categories";
import Link from "next/link";
import Image from "next/image";
import { Viewfinder } from "@/utils/icons/index";
import ProductCard from "@/components/shop/ProductCard";

interface CategoryLayoutProps {
  categorySlug: string;
  featuredProducts: any[];
}

export default function CategoryLayout({
  categorySlug,
  featuredProducts,
}: CategoryLayoutProps) {
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return notFound();

  return (
    <main className="mt-16 min-h-screen bg-[#FDFCFB] dark:bg-[#050505] transition-colors overflow-x-hidden">
      <section className="relative min-h-[60vh] lg:h-[80vh] grid lg:grid-cols-2 items-center">
        <div className="relative z-20 px-6 lg:px-20 py-20 order-2 lg:order-1">
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A3728] text-white text-md font-black uppercase tracking-[0.4em] mb-8">
              Colección 2026
            </span>
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-white leading-[0.85] mb-8">
              Diseño de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#8D6E63]">
                {category.label}
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed mb-10">
              Explora nuestra selección exclusiva de muebles para{" "}
              {category.label.toLowerCase()}. Diseño, funcionalidad y elegancia
              en cada pieza.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${category.slug}/${category.subcategories[0]?.sub || ""}`}
                className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-md font-black uppercase tracking-[0.3em] hover:bg-[#4A3728] hover:text-white transition-all"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>

        <div className="relative h-[50vh] lg:h-full order-1 lg:order-2 overflow-hidden bg-zinc-200">
          <div className="absolute inset-0 bg-black/10 z-10" />
          <div className="relative w-full h-full">
            <Image
              src={
                category.subcategories[0]?.imageSrc ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
              }
              alt={category.label}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2B2118] dark:text-[#E7DED4]">
            Explorar {category.label}
          </h2>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-10 hidden md:block" />
          <Viewfinder className="text-4xl text-[#4A3728]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.subcategories.map((sub) => (
            <Link
              href={`/${category.slug}/${sub.sub}`}
              key={sub.sub}
              className="group relative h-96 overflow-hidden rounded-full cursor-pointer block"
            >
              <Image
                src={sub.imageSrc}
                alt={sub.label}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
                  {sub.label}
                </h3>
                <p className="text-md font-bold uppercase tracking-[0.3em] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver Productos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="bg-white dark:bg-[#0A0A0A] py-24 px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12 text-center">
              <span className="text-[#4A3728] font-bold tracking-widest text-xs uppercase">
                Destacados
              </span>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white mt-2">
                Favoritos en {category.label}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} index={0} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 bg-[#4A3728] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Calidad Garantizada <br /> en tu {category.label}.
          </h2>
          <p className="text-zinc-300 text-lg font-medium leading-relaxed">
            Fabricamos cada pieza con materiales de primera calidad, asegurando
            durabilidad y estilo que perdura. Diseñados para transformar tu
            hogar en un espacio único.
          </p>
        </div>
      </section>
    </main>
  );
}
