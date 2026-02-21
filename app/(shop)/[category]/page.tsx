import { Metadata } from "next";
import { categories } from "@/utils/categories";
import ProductCard from "@/components/shop/product/ProductCard";
import { ContactForm } from "@/components/shop/contact/ContactForm";
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
      <p className="text-justify text-lg leading-relaxed text-zinc-800 dark:text-zinc-400">
        En <strong>Muebles Maldonado</strong> ofrecemos{" "}
        <strong>camas modernas, cómodas, closets y veladores</strong> de diseño
        lineal. Confort con materiales de alta calidad.
      </p>
    ),
  },
  sala: {
    prefix: "Creamos tu",
    title: "Muebles de Sala | Aparadores, Muebles Tv,  Mesas de Centro",
    description:
      "Creamos ambientes elegantes con muebles de sala modernos, paneles de TV y mesas de centro personalizadas.",
    content: (
      <p className="text-justify text-lg leading-relaxed text-zinc-800 dark:text-zinc-400">
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
      <p className="text-justify text-lg leading-relaxed text-zinc-800 dark:text-zinc-400">
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
      <p className="text-justify text-lg leading-relaxed text-zinc-800 dark:text-zinc-400">
        Optimiza tu productividad con{" "}
        <strong>escritorios ergonómicos, estanterías, libreros a medida</strong>{" "}
        de alta resistencia con acabados profesionales.
      </p>
    ),
  },
};

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryConfig = categories.find((c) => c.slug === categorySlug);

  if (!categoryConfig) return { title: "Categoría no encontrada" };

  const data = seoContent[categorySlug];

  return {
    title:
      data?.title || `${categoryConfig.label} Modernos | Muebles Maldonado`,
    description:
      data?.description || `Explora nuestra línea de ${categoryConfig.label}.`,
    alternates: { canonical: `https://mueblesmaldonadoec.com/${categorySlug}` },
    openGraph: {
      title: data?.title,
      description: data?.description,
      url: `https://mueblesmaldonadoec.com/${categorySlug}`,
      images: [{ url: categoryConfig.featuredContent[0]?.imageSrc || "" }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const categoryConfig = categories.find((c) => c.slug === categorySlug);

  if (!categoryConfig) return notFound();

  const allCategoryProducts = await ProductService.getAll({
    category: categorySlug,
  });

  const productsFromDB = allCategoryProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  const heroImage = categoryConfig.featuredContent[0]?.imageSrc;

  return (
    <main className="mt-20 min-h-screen bg-white dark:bg-[#050505] transition-colors">
      <section className="bg-[#FDFCFB] dark:bg-black">
        <div className="max-w-340 mx-auto flex flex-col lg:flex-row h-auto lg:h-90">
          <div className="w-full lg:w-1/2 p-4 lg:p-16 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#4A3728] text-2xl font-black uppercase ">
                  {seoContent[categorySlug]?.prefix}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
                {categoryConfig.label}
              </h1>
              <div className="max-w-md">
                {seoContent[categorySlug]?.content}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-70 lg:h-full">
            <img
              src={heroImage}
              className="w-full h-full object-cover"
              alt={categoryConfig.label}
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FDFCFB] dark:bg-black">
        <div className="max-w-360 mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-8 pl-4">
            <Squares2X2 className="w-6 h-6 text-[#4A3728] text-2xl" />
            <h2 className="text-2xl font-black uppercase text-zinc-800 dark:text-zinc-200">
              Lineas Especializadas
            </h2>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {categoryConfig.subcategories.slice(0, 8).map((sub) => (
              <Link
                key={sub.sub}
                href={sub.href}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-zinc-100 dark:ring-zinc-800 group-hover:ring-[#4A3728] transition-all duration-500 p-1 bg-white dark:bg-zinc-900 shadow-md">
                  <img
                    src={sub.imageSrc}
                    className="p-2 w-full h-full object-contain rounded-full transition-transform duration-700 ease-in-out group-hover:scale-110"
                    alt={sub.label}
                  />
                </div>
                <span className="text-[14px] font-bold uppercase tracking-tight text-zinc-500 group-hover:text-black dark:group-hover:text-white text-center transition-colors">
                  {sub.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FDFCFB] dark:bg-black">
        <div className="max-w-360 mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-14">
            Productos <span className="text-[#4A3728]">Destacados</span>
          </h2>

          {productsFromDB.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
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
              <p className="text-zinc-400 uppercase tracking-[0.2em] text-xs font-black">
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
