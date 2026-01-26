"use server";

import prisma from "@/lib/prisma";

export async function getProducts(params: {
  category: string;
  subcategory?: string;
}) {
  try {
    const { category, subcategory } = params;

    const where: any = {
      isActive: true,
      category: { equals: category, mode: "insensitive" },
    };

    if (subcategory) {
      where.subcategory = { equals: subcategory, mode: "insensitive" };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: true,
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, products };
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return { success: false, error: error.message, products: [] };
  }
}
