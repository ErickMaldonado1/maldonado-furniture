import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import { slugify } from "@/utils/slug_url";

export const ProductService = {
  async getAll(filters: any) {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        category: filters.category
          ? { equals: filters.category, mode: "insensitive" }
          : undefined,
        subcategory: filters.subcategory
          ? { equals: filters.subcategory, mode: "insensitive" }
          : undefined,
        isFlashDeal:
          filters.isFeatured !== undefined ? filters.isFeatured : undefined,
        colors:
          filters.colors?.length > 0 ? { hasSome: filters.colors } : undefined,
        styles:
          filters.styles?.length > 0 ? { hasSome: filters.styles } : undefined,
        materials:
          filters.materials?.length > 0
            ? { hasSome: filters.materials }
            : undefined,

        price: {
          gte: filters.minPrice || undefined,
          lte: filters.maxPrice || undefined,
        },
        OR: filters.search
          ? [
              { name: { contains: filters.search, mode: "insensitive" } },
              {
                description: { contains: filters.search, mode: "insensitive" },
              },
            ]
          : undefined,
      },
      take: filters.limit || undefined,
      include: {
        images: true,
        variants: { include: { dimensions: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        variants: { include: { dimensions: true } },
        images: true,
      },
    });
  },

  async getBySlug(slug: string) {
    const slugNormalized = slug.trim().toLowerCase();
    const slugWithSpaces = slugNormalized.replace(/-/g, " ");

    let product = await prisma.product.findFirst({
      where: {
        isActive: true,
        OR: [
          { sku: { equals: slug, mode: "insensitive" } },
          { name: { equals: slug, mode: "insensitive" } },
          { name: { contains: slugWithSpaces, mode: "insensitive" } },
        ],
      },
      include: {
        images: true,
        variants: { include: { dimensions: true } },
      },
    });

    if (product) return product;

    const candidates = await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
    });

    const targetSlug = slugify(slug);

    const match = candidates.find((p) => slugify(p.name) === targetSlug);

    if (match) {
      return await this.getById(match.id);
    }

    return null;
  },

  async create(data: any) {
    return await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        price: data.price,
        discount: data.discount,
        category: data.category ? slugify(data.category) : data.category,
        subcategory: data.subcategory
          ? slugify(data.subcategory)
          : data.subcategory,
        isFlashDeal: data.isFlashDeal,
        isActive: data.isActive ?? true,
        colors: data.colors || [],
        styles: data.styles || [],
        materials: data.materials || [],

        variants: data.variants
          ? {
              create: data.variants.map((v: any) => ({
                name: v.name,
                sku: v.sku,
                thickness: v.thickness,
                color: v.color || null,
                material: v.material || null,
                dimensions: v.dimensions ? { create: v.dimensions } : undefined,
              })),
            }
          : undefined,

        images: data.images
          ? {
              create: data.images.map((img: any) => ({
                url: img.url,
                publicId: img.publicId,
                color: img.color || null,
                variantId: img.variantId || null,
              })),
            }
          : undefined,
      },
      include: {
        variants: { include: { dimensions: true } },
        images: true,
      },
    });
  },

  async deactivateProduct(id: string) {
    return await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  },

  async updateProduct(id: string, data: any) {
    return await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        discount: data.discount,
        category: data.category ? slugify(data.category) : data.category,
        subcategory: data.subcategory
          ? slugify(data.subcategory)
          : data.subcategory,
        colors: data.colors,
        styles: data.styles,
        materials: data.materials,
        isActive: data.isActive,
        isFlashDeal: data.isFlashDeal,
      },
    });
  },

  async getVariantById(variantId: string) {
    return await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { dimensions: true },
    });
  },

  async updateVariant(variantId: string, data: any) {
    return await prisma.productVariant.update({
      where: { id: variantId },
      data: {
        name: data.name,
        sku: data.sku,
        thickness: data.thickness,
        dimensions: data.dimensions
          ? {
              upsert: {
                update: {
                  width: data.dimensions.width,
                  height: data.dimensions.height,
                  depth: data.dimensions.depth,
                },

                create: {
                  width: data.dimensions.width,
                  height: data.dimensions.height,
                  depth: data.dimensions.depth,
                },
              },
            }
          : undefined,
      },
      include: { dimensions: true },
    });
  },

  async deleteVariant(variantId: string) {
    await prisma.variantDimensions.deleteMany({ where: { variantId } });
    return await prisma.productVariant.delete({ where: { id: variantId } });
  },

  async uploadOnly(file: string, folder: string) {
    const res = await uploadImage(file, folder);
    return { url: res.url, publicId: res.publicId };
  },

  async getByCategory(categoryName: string, limit = 8) {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        category: {
          contains: categoryName,
          mode: "insensitive",
        },
      },
      take: limit,
      include: {
        images: true,
        variants: {
          include: { dimensions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
