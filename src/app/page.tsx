import FlashSale from "@/components/home/FlashSale";
import HeroSlider from "@/components/home/HeroSlider";
import { ProductService } from "@/features/products/product.service";
import dynamic from "next/dynamic";
const CategoryShowcase = dynamic(
  () => import("@/components/home/CategoryShowcase"),
  {
    loading: () => (
      <div className="py-12 max-w-360 mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-112.5">
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl animate-pulse w-full h-full" />
          <div className="hidden md:block bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl animate-pulse w-full h-full" />
        </div>
      </div>
    ),
  },
);
const ValueProps = dynamic(() => import("@/components/home/ValueProps"), {
  loading: () => (
    <div className="py-12 max-w-360 mx-auto px-6 w-full">
      <div className="h-8 w-48 bg-zinc-100 dark:bg-zinc-900 rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-8 rounded-xl border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30"
          >
            <div className="w-14 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-5 animate-pulse" />
            <div className="h-4 w-20 bg-zinc-100 dark:bg-zinc-800 rounded mb-3 animate-pulse" />
            <div className="h-6 w-full bg-zinc-100 dark:bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="h-3 w-full bg-zinc-50 dark:bg-zinc-900 rounded mb-2 animate-pulse" />
            <div className="h-3 w-2/3 bg-zinc-50 dark:bg-zinc-900 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  ),
});
const FeaturedCarousel = dynamic(
  () => import("@/components/home/FeaturedCarousel"),
  {
    loading: () => <div className="h-100 w-full bg-zinc-100 animate-pulse" />,
  },
);
const CategoryCarousel = dynamic(
  () => import("@/components/home/CategoryCarousel"),
);

import { Suspense } from "react";

async function SuspendedFeaturedCarousel() {
  const products = await ProductService.getRandomProducts(8);
  return <FeaturedCarousel products={products} />;
}

async function SuspendedCategoryCarousel({
  title,
  categorySlug,
}: {
  title: string;
  categorySlug: string;
}) {
  const products = await ProductService.getByCategory(
    categorySlug === "dormitorio"
      ? "Dormitorio"
      : categorySlug === "sala"
        ? "Sala"
        : "Oficina",
    8,
  );
  return (
    <CategoryCarousel
      products={products}
      title={title}
      categorySlug={categorySlug}
    />
  );
}

function CarouselSkeleton() {
  return (
    <div className="h-100 w-full bg-zinc-50 dark:bg-[#0a0a0a] animate-pulse my-6" />
  );
}

const HomePage = () => {
  return (
    <div className="flex flex-col w-full dark:bg-[#050505] overflow-x-hidden mb-20">
      <HeroSlider />
      <FlashSale />
      <CategoryShowcase />
      <Suspense fallback={<CarouselSkeleton />}>
        <SuspendedFeaturedCarousel />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <SuspendedCategoryCarousel
          title="Ideas para Dormitorio"
          categorySlug="dormitorio"
        />
      </Suspense>
      <ValueProps />
      <Suspense fallback={<CarouselSkeleton />}>
        <SuspendedCategoryCarousel
          title="Tu sala con estilo"
          categorySlug="sala"
        />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <SuspendedCategoryCarousel
          title="Muebles de oficina"
          categorySlug="oficina"
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
