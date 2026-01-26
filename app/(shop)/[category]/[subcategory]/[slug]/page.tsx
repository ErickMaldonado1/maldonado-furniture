import { ProductService } from "@/features/products/product.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineHeart,
  HiStar,
  HiOutlineTruck,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { ProductDetailClient } from "@/app/(shop)/[category]/[subcategory]/[slug]/ProductDetailClient";

type Props = {
  params: Promise<{ slug: string; category: string; subcategory: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await ProductService.getBySlug(slug);

  if (!product) {
    return notFound();
  }

  const images = product.images.map((img) => img.url);

  const relatedProducts = await ProductService.getByCategory(
    product.category || "",
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-350 mx-auto">
        <ProductDetailClient
          product={product as any}
          relatedProducts={relatedProducts.filter((p) => p.id !== product.id)}
        />

        <div className="mt-12 space-y-4 pt-8 border-t border-zinc-100 dark:border-zinc-800 max-w-lg">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 font-bold">
            <HiOutlineTruck className="text-xl text-[#4A3728]" />
            <span>Envío Gratis a todo Quito</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 font-bold">
            <HiOutlineShieldCheck className="text-xl text-[#4A3728]" />
            <span>Garantía de 5 años en estructura</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 font-bold">
            <HiOutlineHeart className="text-xl text-[#4A3728]" />
            <span>Satisfacción garantizada o devolución</span>
          </div>
        </div>
      </div>
    </div>
  );
}
