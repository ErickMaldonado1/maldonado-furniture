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

  const [relatedProducts, siblingProducts] = await Promise.all([
    ProductService.getByCategory(product.category || ""),
    ProductService.getSiblingProducts(
      product.name,
      product.subcategory,
      product.id,
    ),
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-24 pb-20 px-4 md:px-4">
      <div className="max-w-350 mx-auto">
        <ProductDetailClient
          product={product as any}
          relatedProducts={relatedProducts.filter((p) => p.id !== product.id)}
          siblingProducts={siblingProducts as any}
        />
      </div>
    </div>
  );
}
