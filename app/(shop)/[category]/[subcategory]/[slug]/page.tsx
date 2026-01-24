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

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 xl:gap-20">
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-[#FAFAFA] dark:bg-[#121212] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
            <Image
              src={
                images[0] ||
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              }
              alt={product.name}
              fill
              className="object-contain p-8"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isFlashDeal && (
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-wider rounded-sm shadow-sm">
                  Oferta
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square bg-[#F3F3F3] dark:bg-[#121212] rounded-lg overflow-hidden border border-transparent hover:border-[#4A3728] cursor-pointer transition-all"
              >
                <Image
                  src={img}
                  alt={`${product.name} ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4">
              <Link
                href={`/${product.category}`}
                className="hover:text-[#4A3728]"
              >
                {product.category}
              </Link>
              <span>/</span>
              <Link
                href={`/${product.category}/${product.subcategory}`}
                className="hover:text-[#4A3728]"
              >
                {product.subcategory}
              </Link>
              <span>/</span>
              <span className="text-zinc-800 dark:text-zinc-200">
                SKU: {product.sku}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#2B2118] dark:text-white leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex text-amber-500">
                <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
              </div>
              <span className="text-zinc-400">4.8 (12 Reseñas)</span>
            </div>
          </div>

          <div className="mb-8 p-6 bg-zinc-50 dark:bg-[#121212] rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-end gap-4 mb-2">
              {(product.discount ?? 0) > 0 && (
                <span className="text-lg text-red-500 line-through font-bold">
                  {product.price.toFixed(2)}€
                </span>
              )}
              <span className="text-4xl font-black text-[#4A3728] dark:text-white leading-none">
                {(
                  product.price -
                  (product.price * (product.discount || 0)) / 100
                ).toFixed(2)}
                €
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Impuestos incluidos. Envío calculado al finalizar compra.
            </p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none mb-10 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            <p>{product.description}</p>
          </div>
          <ProductDetailClient product={product} />
          <div className="mt-12 space-y-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
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
    </div>
  );
}
