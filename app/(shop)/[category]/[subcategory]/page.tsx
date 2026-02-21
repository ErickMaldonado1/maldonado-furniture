import { categories } from "@/utils/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import ProductListingClient from "../../../../components/ProductListingClient";
import { notFound } from "next/navigation";
import { ProductService } from "@/features/products/product.service";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;

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

  return (
    <main className="pt-20 md:pt-32 pb-16 bg-white dark:bg-[#050505] min-h-screen">
      <div className="max-w-350 mx-auto px-4 sm:px-4">
        <header className="mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <Breadcrumbs
            steps={[
              { label: categoryConfig.label, href: `/${categorySlug}` },
              { label: subcategoryConfig.label },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            {subcategoryConfig.label}
          </h1>
        </header>

        <ProductListingClient
          initialProducts={JSON.parse(JSON.stringify(productsFromDB))}
          hideCategoryFilter={true}
          hideSubcategoryFilter={true}
        />
      </div>
    </main>
  );
}
