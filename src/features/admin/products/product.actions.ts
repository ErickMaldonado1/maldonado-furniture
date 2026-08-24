"use server";

import { uploadImage, deleteImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/slug_url";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";

async function verifyAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("No autorizado. Se requiere rol de administrador.");
  }
  return session;
}

interface UploadSuccess {
  success: true;
  url: string;
  publicId: string;
}

interface UploadError {
  success: false;
  error: string;
}

interface GeneratedVariant {
  name: string;
  sku: string;
  thickness: number | null;
  color: string | null;
  material: string | null;
  price: number | null;
  sizeLabel: string;
  width: number;
  height: number;
  depth: number;
}

function skuPart(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";

  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^A-Z0-9.-]/g, "");
}

function colorSkuPart(color: string | null | undefined): string {
  if (!color) return "GEN";

  const normalized = color
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (normalized.length <= 3) {
    return normalized;
  }

  return normalized.substring(0, 3);
}

function createSizeLabel(width: number, height: number, depth: number): string {
  return `${width} × ${height} × ${depth} cm`;
}

function generateVariants(
  productName: string,
  productSku: string,
  dimensions: any[],
  colors: string[],
  productPrice: number,
  productMaterials: string[] = [],
): GeneratedVariant[] {
  const safeDimensions = Array.isArray(dimensions) ? dimensions : [];

  const safeColors =
    Array.isArray(colors) && colors.length > 0 ? colors : [null];

  const variants: GeneratedVariant[] = [];

  for (const dimension of safeDimensions) {
    const width = Number(dimension.width);
    const height = Number(dimension.height);
    const depth = Number(dimension.depth);

    const thickness =
      dimension.thickness === null ||
      dimension.thickness === undefined ||
      dimension.thickness === ""
        ? null
        : Number(dimension.thickness);

    const price =
      dimension.price === null ||
      dimension.price === undefined ||
      dimension.price === ""
        ? productPrice
        : Number(dimension.price);

    const sizeLabel =
      dimension.sizeLabel || createSizeLabel(width, height, depth);

    for (const color of safeColors) {
      const colorValue = color || null;
      const generatedSku = skuPart(productSku);
      const variantName = colorValue
        ? `${productName.trim()} - ${colorValue}`
        : productName.trim();

      variants.push({
        name: variantName,
        sku: generatedSku,
        thickness,
        color: colorValue,
        material: productMaterials.length > 0 ? productMaterials[0] : null,
        price,
        sizeLabel,
        width,
        height,
        depth,
      });
    }
  }

  return variants;
}

export async function uploadProductImage(
  base64Image: string,
): Promise<UploadSuccess | UploadError> {
  try {
    const res = await uploadImage(base64Image, "maldonado-furniture/products");

    return {
      success: true,
      url: res.url,
      publicId: res.publicId,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function createFullProduct(data: any) {
  try {
    await verifyAdminSession();
    const normalizedSubcategory = data.subcategory
      ? slugify(data.subcategory)
      : data.subcategory;

    const normalizedCategory = data.category
      ? slugify(data.category)
      : data.category;

    const variantConfig = data.variantConfig || {};

    const dimensions = Array.isArray(variantConfig.dimensions)
      ? variantConfig.dimensions
      : [];

    const variantColors = Array.isArray(variantConfig.colors)
      ? variantConfig.colors
      : [];

    const productColors =
      variantColors.length > 0
        ? variantColors
        : Array.isArray(data.colors)
          ? data.colors
          : [];

    const generatedVariants = generateVariants(
      data.name,
      data.sku,
      dimensions,
      productColors,
      Number(data.price || 0),
      Array.isArray(data.materials) ? data.materials : [],
    );

    if (generatedVariants.length === 0) {
      return {
        success: false,
        error: "Debes agregar al menos una medida para generar las variantes.",
      };
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: slugify(data.name),
        sku: data.sku,
        description: data.description,
        price: Number(data.price || 0),
        discount: Number(data.discount || 0),
        deliveryDays: Number(data.deliveryDays || 8),

        category: normalizedCategory,
        subcategory: normalizedSubcategory,

        colors: data.colors || [],
        styles: data.styles || [],
        materials: data.materials || [],

        isFlashDeal: Boolean(data.isFlashDeal),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,

        images: {
          create: Array.isArray(data.images)
            ? data.images.map((img: any) => ({
                url: img.url,
                publicId: img.publicId,
                color: img.color || null,
                variantId: img.variantId || null,
              }))
            : [],
        },

        variants: {
          create: generatedVariants.map((variant) => ({
            name: variant.name,
            sku: variant.sku,
            thickness: variant.thickness,
            color: variant.color,
            material: variant.material,
            price: variant.price,
            sizeLabel: variant.sizeLabel,

            dimensions: {
              create: {
                width: variant.width,
                height: variant.height,
                depth: variant.depth,
              },
            },
          })),
        },
      },

      include: {
        variants: {
          include: {
            dimensions: true,
          },
        },
        images: true,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath(`/${normalizedCategory}`);

    return {
      success: true,
      product,
    };
  } catch (error: any) {
    console.error("Create Product Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateFullProduct(id: string, data: any) {
  try {
    await verifyAdminSession();
    const normalizedSubcategory = data.subcategory
      ? slugify(data.subcategory)
      : data.subcategory;

    const normalizedCategory = data.category
      ? slugify(data.category)
      : data.category;

    const variantConfig = data.variantConfig || {};

    const dimensions = Array.isArray(variantConfig.dimensions)
      ? variantConfig.dimensions
      : [];

    const variantColors = Array.isArray(variantConfig.colors)
      ? variantConfig.colors
      : [];

    const productColors =
      variantColors.length > 0
        ? variantColors
        : Array.isArray(data.colors)
          ? data.colors
          : [];

    const generatedVariants = generateVariants(
      data.name,
      data.sku,
      dimensions,
      productColors,
      Number(data.price || 0),
      Array.isArray(data.materials) ? data.materials : [],
    );

    if (generatedVariants.length === 0) {
      return {
        success: false,
        error: "Debes agregar al menos una medida para generar las variantes.",
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },

        data: {
          name: data.name,
          slug: slugify(data.name),
          sku: data.sku,
          description: data.description,

          price: Number(data.price || 0),
          discount: Number(data.discount || 0),
          deliveryDays: Number(data.deliveryDays || 8),

          category: normalizedCategory,
          subcategory: normalizedSubcategory,

          colors: data.colors || [],
          styles: data.styles || [],
          materials: data.materials || [],

          isFlashDeal: Boolean(data.isFlashDeal),

          isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
        },
      });

      await tx.productImage.deleteMany({
        where: {
          productId: id,
        },
      });

      if (Array.isArray(data.images) && data.images.length > 0) {
        await tx.productImage.createMany({
          data: data.images.map((img: any) => ({
            productId: id,
            url: img.url,
            publicId: img.publicId,
            color: img.color || null,
            variantId: img.variantId || null,
          })),
        });
      }

      const existingVariants = await tx.productVariant.findMany({
        where: {
          productId: id,
        },
        include: {
          dimensions: true,
          orderItems: {
            select: {
              id: true,
            },
          },
          favorites: {
            select: {
              id: true,
            },
          },
        },
      });

      const existingMap = new Map<string, (typeof existingVariants)[number]>();

      for (const existing of existingVariants) {
        const width = existing.dimensions?.width ?? 0;

        const height = existing.dimensions?.height ?? 0;

        const depth = existing.dimensions?.depth ?? 0;

        const key = [width, height, depth, existing.color || ""].join("|");

        existingMap.set(key, existing);
      }

      const incomingKeys = new Set<string>();

      for (const variant of generatedVariants) {
        const key = [
          variant.width,
          variant.height,
          variant.depth,
          variant.color || "",
        ].join("|");

        incomingKeys.add(key);

        const existing = existingMap.get(key);

        if (existing) {
          await tx.productVariant.update({
            where: {
              id: existing.id,
            },

            data: {
              name: variant.name,
              sku: variant.sku,
              thickness: variant.thickness,
              color: variant.color,
              material: variant.material,
              price: variant.price,
              sizeLabel: variant.sizeLabel,

              dimensions: {
                upsert: {
                  create: {
                    width: variant.width,
                    height: variant.height,
                    depth: variant.depth,
                  },

                  update: {
                    width: variant.width,
                    height: variant.height,
                    depth: variant.depth,
                  },
                },
              },
            },
          });
        } else {
          await tx.productVariant.create({
            data: {
              productId: id,

              name: variant.name,
              sku: variant.sku,
              thickness: variant.thickness,
              color: variant.color,
              material: variant.material,
              price: variant.price,
              sizeLabel: variant.sizeLabel,

              dimensions: {
                create: {
                  width: variant.width,
                  height: variant.height,
                  depth: variant.depth,
                },
              },
            },
          });
        }
      }

      for (const existing of existingVariants) {
        const width = existing.dimensions?.width ?? 0;

        const height = existing.dimensions?.height ?? 0;

        const depth = existing.dimensions?.depth ?? 0;

        const key = [width, height, depth, existing.color || ""].join("|");

        if (incomingKeys.has(key)) {
          continue;
        }

        const hasOrders = existing.orderItems.length > 0;

        const hasFavorites = existing.favorites.length > 0;

        if (hasOrders || hasFavorites) {
          continue;
        }

        await tx.variantDimensions.deleteMany({
          where: {
            variantId: existing.id,
          },
        });

        await tx.productVariant.delete({
          where: {
            id: existing.id,
          },
        });
      }
    });

    revalidatePath("/admin/products");

    revalidatePath(`/admin/products/${id}`);

    revalidatePath("/");
    revalidatePath(`/${normalizedCategory}`);

    revalidatePath("/(shop)/[category]", "page");

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Update Product Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteFullProduct(productId: string) {
  try {
    await verifyAdminSession();
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },

      include: {
        images: true,
        variants: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: "Producto no encontrado",
      };
    }
    const cloudinaryDeletes = product.images.map((img) =>
      deleteImage(img.publicId),
    );

    await Promise.all(cloudinaryDeletes);

    const variantIds = product.variants.map((v) => v.id);

    if (variantIds.length > 0) {
      await prisma.variantDimensions.deleteMany({
        where: {
          variantId: {
            in: variantIds,
          },
        },
      });

      await prisma.favorite.deleteMany({
        where: {
          variantId: {
            in: variantIds,
          },
        },
      });

      await prisma.orderItem.deleteMany({
        where: {
          variantId: {
            in: variantIds,
          },
        },
      });

      await prisma.productVariant.deleteMany({
        where: {
          productId,
        },
      });
    }

    await prisma.productImage.deleteMany({
      where: {
        productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/admin/products");

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Delete Product Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function activateAllProducts() {
  "use server";
  try {
    await verifyAdminSession();
    const result = await prisma.product.updateMany({
      where: { isActive: false },
      data: { isActive: true },
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, count: result.count };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleProductStatus(id: string, isActive: boolean) {
  "use server";
  try {
    await verifyAdminSession();
    await prisma.product.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getProductsPaginated(
  query: string = "",
  category?: string,
  subcategory?: string,
  skip: number = 0,
  take: number = 20
) {
  "use server";
  try {
    const whereClause: any = {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { sku: { contains: query, mode: "insensitive" } },
      ],
    };

    if (category) whereClause.category = category;
    if (subcategory) whereClause.subcategory = subcategory;

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        images: true,
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: take + 1, 
    });

    const hasMore = products.length > take;
    const paginatedProducts = hasMore ? products.slice(0, take) : products;

    return { success: true, products: paginatedProducts, hasMore };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}