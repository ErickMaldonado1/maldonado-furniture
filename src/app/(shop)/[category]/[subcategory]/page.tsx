import { Metadata } from "next";
import { categories } from "@/utils/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ProductListingClient from "../../../../components/ProductListingClient";
import { notFound } from "next/navigation";
import { ProductService } from "@/features/products/product.service";

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const categoryConfig = categories.find((c) => c.slug === categorySlug);
  if (!categoryConfig) {
    return { title: "Categoría no encontrada | Muebles Maldonado" };
  }
  const subcategoryConfig = categoryConfig.subcategories.find(
    (s) => s.sub === subcategorySlug,
  );
  if (!subcategoryConfig) {
    return { title: "Subcategoría no encontrada | Muebles Maldonado" };
  }

  const titleText = `${subcategoryConfig.label} a Medida y Modernos en Quito | Muebles Maldonado`;
  const descriptionText = `Diseño y fabricación de ${subcategoryConfig.label.toLowerCase()} a medida en Quito. Materiales premium, instalación gratuita y la mejor asesoría personalizada para tu hogar u oficina.`;

  return {
    title: titleText,
    description: descriptionText,
    alternates: {
      canonical: `https://mueblesmaldonadoec.com/${categorySlug}/${subcategorySlug}`,
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: `https://mueblesmaldonadoec.com/${categorySlug}/${subcategorySlug}`,
      images: subcategoryConfig.imageSrc
        ? [{ url: subcategoryConfig.imageSrc }]
        : [],
      type: "website",
    },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const categoryConfig = categories.find((c) => c.slug === categorySlug);
  if (!categoryConfig) return notFound();

  const subcategoryConfig = categoryConfig.subcategories.find(
    (s) => s.sub === subcategorySlug,
  );
  if (!subcategoryConfig) return notFound();

  const productsFromDB = await ProductService.getAll({
    category: categorySlug,
    subcategory: subcategorySlug,
  });

  const parseArrayParam = (param: string | string[] | undefined) => {
    if (!param) return [];
    if (Array.isArray(param)) return param;
    return param.split(",");
  };

  const initialFilters = {
    colors: parseArrayParam(resolvedSearchParams.colors),
    styles: parseArrayParam(resolvedSearchParams.styles),
    materials: parseArrayParam(resolvedSearchParams.materials),
    priceRange: resolvedSearchParams.maxPrice
      ? ([0, Number(resolvedSearchParams.maxPrice)] as [number, number])
      : undefined,
  };

  return (
    <main className="pt-20 md:pt-32 pb-16 bg-white dark:bg-[#050505] min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6">
        <header className="mb-6 md:mb-10 pb-6 border-b border-zinc-100 dark:border-zinc-800/50">
          <Breadcrumbs
            steps={[
              { label: categoryConfig.label, href: `/${categorySlug}` },
              { label: subcategoryConfig.label },
            ]}
          />
          <div className="md:mt-4 max-w-4xl">
            <h1 className="text-3xl md:text-3xl lg:text-3xl font-medium text-black dark:text-white">
              {subcategoryConfig.label}
            </h1>
          </div>
        </header>

        <ProductListingClient
          initialProducts={JSON.parse(JSON.stringify(productsFromDB))}
          hideCategoryFilter={true}
          hideSubcategoryFilter={true}
          initialFilters={initialFilters}
        />
      </div>
    </main>
  );
}
