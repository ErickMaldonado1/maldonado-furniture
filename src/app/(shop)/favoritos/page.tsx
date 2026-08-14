"use client";

import { useFavoritesStore } from "@/store/favorites-store";
import ProductCard from "@/components/shop/product/ProductCard";
import { Heart } from "@/utils/icons/navigation";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#FDFCFB] dark:bg-[#050505] transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-full">
            <Heart className="w-4 h-4 text-3xl text-[#4A3728]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black  leading-none text-zinc-900 dark:text-white">
              Mis Favoritos
            </h1>
            <p className="text-zinc-500 font-medium">
              Colección personal de deseos
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="py-20 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black  text-zinc-300 leading">
              Tu lista está vacía
            </h2>
            <Link
              href="/productos"
              className="inline-block px-8 py-3 bg-[#4A3728] text-white font-bold uppercase  text-xs hover:bg-[#3D2C1F] transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {favorites.map((fav) => {
              const mockProduct = {
                id: fav.id,
                name: fav.name,
                price: fav.price,
                images: [{ url: fav.image }],
                category: "Favorito",
              };
              return (
                <ProductCard
                  key={fav.id}
                  product={mockProduct as any}
                  index={0}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
