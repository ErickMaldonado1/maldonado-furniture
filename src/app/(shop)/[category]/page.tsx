import { Metadata } from "next";
import Image from "next/image";
import { categories } from "@/utils/categories";
import ProductCard from "@/components/shop/product/ProductCard";
import { ContactForm } from "@/components/shop/contact/ContactForm";
import RecentProjects from "@/app/(shop)/[category]/RecentProjects"; // <--- Importas el componente creado
import Link from "next/link";
import { notFound } from "next/navigation";
import { Squares2X2 } from "@/utils/icons/social";
import { ProductService } from "@/features/products/product.service";

const seoContent: Record<
  string,
  {
    prefix: string;
    content: React.ReactNode;
    title: string;
    description: string;
  }
> = {
  dormitorio: {
    prefix: "Proyectamos tu",
    title: "Muebles de Dormitorio | Camas, Cómodas, Veladores, Closets",
    description:
      "Diseño y fabricación de camas, closets y veladores a medida. Confort y estilo lineal para tu descanso en Muebles Maldonado.",
    content: (
      <p className="text-justify text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        En <strong>Muebles Maldonado</strong> ofrecemos{" "}
        <strong>camas modernas, cómodas, closets y veladores</strong> de diseño
        lineal. Confort con materiales de alta calidad.
      </p>
    ),
  },
  closets: {
    prefix: "Diseñamos tu",
    title:
      "Clósets Modernos a Medida | Walking Closets y Roperos | Muebles Maldonado",
    description:
      "Especialistas en clósets modernos, walking closets y roperos de melamina a medida. Optimiza tu espacio con diseño y funcionalidad.",
    content: (
      <p className="text-justify text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        Creamos <strong>clósets y walking closets personalizados</strong> con
        una distribución inteligente, maximizando cada espacio de almacenamiento
        con acabados de alta gama.
      </p>
    ),
  },
  sala: {
    prefix: "Creamos tu",
    title: "Muebles de Sala | Aparadores, Muebles Tv,  Mesas de Centro",
    description:
      "Creamos ambientes elegantes con muebles de sala modernos, paneles de TV y mesas de centro personalizadas.",
    content: (
      <p className="text-justify text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        Diseñamos{" "}
        <strong>
          muebles de sala vanguardistas, aparadores, mesas de centro, muebles de
          tv y paneles
        </strong>{" "}
        que combinan confort y elegancia para ambientes modernos.
      </p>
    ),
  },
  cocina: {
    prefix: "Diseñamos tu",
    title:
      "Cocinas modernas | Muebles de cocina de Melamina y Madera | Diseño de Interiores",
    description:
      "Especialistas en muebles de cocina funcionales. Proyectamos tu cocina ideal con materiales de alta resistencia.",
    content: (
      <p className="text-justify text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        Nuestro equipo especializado en diseño te ayuda a proyectar tu{" "}
        <strong>cocina de melamina y madera a tu gusto</strong>, logrando un
        diseño funcional.
      </p>
    ),
  },
  oficina: {
    prefix: "Equipamos tu",
    title: "Muebles de Oficina | Escritorios y Libreros",
    description:
      "Optimiza tu productividad con mobiliario de oficina a medida. Escritorios resistentes y estanterías profesionales.",
    content: (
      <p className="text-justify text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        Optimiza tu productividad con{" "}
        <strong>escritorios ergonómicos, estanterías, libreros a medida</strong>{" "}
        de alta resistencia con acabados profesionales.
      </p>
    ),
  },
};

function resolveCategoryConfig(slug: string) {
  const mainCategory = categories.find((c) => c.slug === slug);
  if (mainCategory) {
    return { config: mainCategory, queryKey: slug, isSub: false };
  }

  for (const cat of categories) {
    const subCat = cat.subcategories.find((sub) => {
      const segments = sub.href.split("/").filter(Boolean);
      return segments[segments.length - 1] === slug;
    });

    if (subCat) {
      return {
        config: {
          label: subCat.label,
          slug: slug,
          featuredContent: [{ imageSrc: subCat.imageSrc }],
          subcategories: cat.subcategories,
        },
        queryKey: slug,
        isSub: true,
      };
    }
  }

  return null;
}

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const resolved = resolveCategoryConfig(categorySlug);

  if (!resolved) return { title: "Categoría no encontrada" };

  const { config: categoryConfig } = resolved;
  const data = seoContent[categorySlug];

  const title = data?.title || `${categoryConfig.label} Modernos a Medida | Muebles Maldonado`;
  const description = data?.description || `Explora nuestra línea exclusiva de ${categoryConfig.label} en Quito. Diseños modernos y personalizados para tu hogar.`;

  return {
    title,
    description,
    keywords: [
      categoryConfig.label,
      `${categoryConfig.label} quito`,
      `${categoryConfig.label} a medida`,
      `${categoryConfig.label} modernos`,
      "muebles maldonado",
      "fabricantes de muebles quito"
    ],
    alternates: { canonical: `https://mueblesmaldonadoec.com/${categorySlug}` },
    openGraph: {
      title,
      description,
      url: `https://mueblesmaldonadoec.com/${categorySlug}`,
      siteName: "Muebles Maldonado",
      images: [{ url: categoryConfig.featuredContent[0]?.imageSrc || "" }],
      locale: "es_EC",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [categoryConfig.featuredContent[0]?.imageSrc || ""],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const resolved = resolveCategoryConfig(categorySlug);

  if (!resolved) return notFound();

  const { config: categoryConfig, queryKey } = resolved;

  const allCategoryProducts = await ProductService.getAll({
    category: queryKey,
  });

  const productsFromDB = allCategoryProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  const heroImage = categoryConfig.featuredContent[0]?.imageSrc;
  const data = seoContent[categorySlug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data?.title || categoryConfig.label,
    "description": data?.description || `Colección de ${categoryConfig.label} a medida en Quito.`,
    "url": `https://mueblesmaldonadoec.com/${categorySlug}`,
    "image": heroImage || "https://res.cloudinary.com/dwvruzkll/image/upload/v1769127395/cocina_stp9o1.webp",
    "provider": {
      "@type": "FurnitureStore",
      "name": "Muebles Maldonado",
      "address": "Quito, Ecuador"
    }
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://mueblesmaldonadoec.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryConfig.label,
        "item": `https://mueblesmaldonadoec.com/${categorySlug}`
      }
    ]
  };

  return (
    <main className="mt-20 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <section className="bg-white dark:bg-[#050505]">
        <div className="max-w-340 mx-auto flex flex-col lg:flex-row h-auto lg:h-90">
          <div className="w-full lg:w-1/2 p-4 lg:p-16 flex flex-col justify-center">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-2xl lg:text-4xl font-medium  text-zinc-900 dark:text-white leading-none">
                {categoryConfig.label}
              </h1>
              <div className="max-w-md">
                {seoContent[categorySlug]?.content || (
                  <p className="text-justify text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Explora nuestra selección exclusiva de{" "}
                    <strong>{categoryConfig.label}</strong> fabricados a medida.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-70 lg:h-full relative">
            {heroImage && (
              <Image
                src={heroImage}
                fill
                priority
                className="object-cover"
                alt={categoryConfig.label}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-14 bg-white dark:bg-[#050505]">
        <div className="max-w-360 mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-10 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
            <div className="flex items-center gap-3">
              <Squares2X2 className="w-5 h-5 text-[#4A3728]" />
              <h2 className="text-2xl md:text-2xl lg:text-3xl font-medium text-zinc-900 dark:text-white leading-none">
                Líneas Especializadas
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {categoryConfig.subcategories?.slice(0, 8).map((sub) => (
              <Link
                key={sub.sub}
                href={sub.href}
                className="group flex flex-col items-center gap-2.5"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-zinc-100 dark:ring-zinc-800 group-hover:ring-[#4A3728] transition-all duration-500 p-1 bg-white dark:bg-zinc-900 shadow-sm relative">
                  <Image
                    src={sub.imageSrc}
                    fill
                    className="p-1.5 sm:p-2 object-contain rounded-full transition-transform duration-700 ease-in-out group-hover:scale-110"
                    alt={sub.label}
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 128px"
                  />
                </div>
                <span className="text-[12px] sm:text-sm font-medium  text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white text-center transition-colors">
                  {sub.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {(categorySlug === "cocina" || categorySlug === "closets") && (
        <RecentProjects categorySlug={categorySlug} />
      )}

      <section className="py-8 md:py-14 bg-white dark:bg-[#050505]">
        <div className="max-w-360 mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-10 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-none">
              Productos{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A3728] to-[#5D4037]">
                Destacados
              </span>
            </h2>
            <Link
              href={`/productos?category=${queryKey}`}
              className="group flex items-center gap-2 text-sm md:text-base hover:text-[#4A3728] dark:hover:text-zinc-300 transition-all"
              aria-label="Ver colección de productos"
            >
              <span className="hidden sm:inline">VER CATÁLOGO</span>
              <span className="sm:hidden">VER</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform text-[#4A3728]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {productsFromDB.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-16">
              {productsFromDB.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={JSON.parse(JSON.stringify(product))}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <p className="text-zinc-400 uppercase -[0.2em] text-xs font-black">
                Próximamente más modelos exclusivos
              </p>
            </div>
          )}
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
