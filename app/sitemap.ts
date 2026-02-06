import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { slugify } from "@/utils/slug_url";

const BASE_URL = "https://www.mueblesmaldonadoec.com";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicios/asesoria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/servicios/envio-montaje`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/catalogo-colores`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/preguntas-frecuentes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terminos-condiciones`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: {
        name: true,
        category: true,
        subcategory: true,
        updatedAt: true,
      },
    });

    const dynamicMap = new Map<string, MetadataRoute.Sitemap[number]>();

    products.forEach((product) => {
      if (!product.category || !product.subcategory || !product.name) return;

      const catSlug = slugify(product.category);
      const subSlug = slugify(product.subcategory);
      const prodSlug = slugify(product.name);

      const catUrl = `${BASE_URL}/${catSlug}`;
      const subUrl = `${BASE_URL}/${catSlug}/${subSlug}`;
      const prodUrl = `${BASE_URL}/${catSlug}/${subSlug}/${prodSlug}`;

      if (!dynamicMap.has(catUrl)) {
        dynamicMap.set(catUrl, {
          url: catUrl,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }

      if (!dynamicMap.has(subUrl)) {
        dynamicMap.set(subUrl, {
          url: subUrl,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      dynamicMap.set(prodUrl, {
        url: prodUrl,
        lastModified: product.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    return [...staticRoutes, ...Array.from(dynamicMap.values())];
  } catch (error) {
    console.error("Error al generar sitemap.xml:", error);
    return staticRoutes;
  }
}
