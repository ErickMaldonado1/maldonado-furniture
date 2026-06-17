import { Metadata } from "next";
import { ProductService } from "@/features/products/product.service";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/app/(shop)/[category]/[subcategory]/[slug]/ProductDetailClient";

type Props = {
  params: Promise<{ slug: string; category: string; subcategory: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category, subcategory } = await params;
  const product = await ProductService.getBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Muebles Maldonado",
    };
  }

  const cleanCategory = product.category ? product.category.replace(/-/g, " ") : "";
  const cleanSubcategory = product.subcategory ? product.subcategory.replace(/-/g, " ") : "";
  const titleText = `${product.name} | Muebles a Medida en Quito`;
  const descriptionText = `${product.description.slice(0, 150)}... Cotiza tu ${product.name} personalizado en Quito. Fabricación de muebles de ${cleanCategory} y ${cleanSubcategory} de alta calidad.`;

  return {
    title: titleText,
    description: descriptionText,
    alternates: {
      canonical: `https://mueblesmaldonadoec.com/${category}/${subcategory}/${slug}`,
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: `https://mueblesmaldonadoec.com/${category}/${subcategory}/${slug}`,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
      type: "website",
    },
  };
}

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
