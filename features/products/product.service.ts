// features/products/product.service.ts
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export const ProductService = {
  // --- PRODUCTOS ---

  async getAll(filters: any) {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        category: filters.category || undefined,
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

  async create(data: any) {
    return await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        price: data.price,
        discount: data.discount,
        category: data.category,
        subcategory: data.subcategory,
        isFlashDeal: data.isFlashDeal,
        isActive: data.isActive ?? true,
        variants: data.variants
          ? {
              create: data.variants.map((v: any) => ({
                name: v.name,
                sku: v.sku,
                thickness: v.thickness,
                dimensions: v.dimensions ? { create: v.dimensions } : undefined,
              })),
            }
          : undefined,
        images: data.images ? { create: data.images } : undefined,
      },
      include: { variants: true, images: true },
    });
  },

  // ESTE MÉTODO ES EL QUE TE DABA EL ERROR EN EL ROUTE.TS
  async deactivateProduct(id: string) {
    return await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  },

  // --- VARIANTES ---

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
                create: data.dimensions,
                update: data.dimensions,
              },
            }
          : undefined,
      },
      include: { dimensions: true },
    });
  },

  async deleteVariant(variantId: string) {
    // Primero borramos dimensiones por la relación 1:1 en MongoDB si existen
    await prisma.variantDimensions.deleteMany({ where: { variantId } });
    return await prisma.productVariant.delete({ where: { id: variantId } });
  },

  // --- UTILIDADES ---

  async uploadOnly(file: string, folder: string) {
    const res = await uploadImage(file, folder);
    return { url: res.url, publicId: res.publicId };
  },
};
