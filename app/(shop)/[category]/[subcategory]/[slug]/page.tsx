import { ProductService } from "@/features/products/product.service";
import { notFound } from "next/navigation";
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
      </div>
    </div>
  );
}
