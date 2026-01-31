"use server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UploadSuccess {
  success: true;
  url: string;
  publicId: string;
}

interface UploadError {
  success: false;
  error: string;
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
    return { success: false, error: error.message };
  }
}

const toSlug = (str: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export async function createFullProduct(data: any) {
  try {
    const normalizedSubcategory = data.subcategory
      ? toSlug(data.subcategory)
      : data.subcategory;
    const normalizedCategory = data.category
      ? data.category.toLowerCase()
      : data.category;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        price: data.price,
        discount: data.discount,
        deliveryDays: data.deliveryDays || 8,
        category: normalizedCategory,
        subcategory: normalizedSubcategory,
        colors: data.colors,
        styles: data.styles,
        materials: data.materials,
        isFlashDeal: data.isFlashDeal,
        isActive: data.isActive,
        images: {
          create: data.images.map((img: any) => ({
            url: img.url,
            publicId: img.publicId,
            color: img.color || null,
          })),
        },
        variants: {
          create: data.variants.map((v: any) => ({
            name: v.name,
            sku: v.sku,
            thickness: v.thickness,
            color: v.color || null,
            material: v.material || null,
            dimensions: {
              create: {
                width: v.width,
                height: v.height,
                depth: v.depth,
              },
            },
          })),
        },
      },
    });
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

export async function updateFullProduct(id: string, data: any) {
  try {
    const normalizedSubcategory = data.subcategory
      ? toSlug(data.subcategory)
      : data.subcategory;

    const normalizedCategory = data.category
      ? data.category.toLowerCase()
      : data.category;

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          name: data.name,
          sku: data.sku,
          description: data.description,
          price: data.price,
          discount: data.discount,
          deliveryDays: data.deliveryDays || 8,
          category: normalizedCategory,
          subcategory: normalizedSubcategory,
          colors: data.colors,
          styles: data.styles,
          materials: data.materials,
          isFlashDeal: data.isFlashDeal,
          isActive: data.isActive,
        },
      });
      await tx.productImage.deleteMany({ where: { productId: id } });
      if (data.images && data.images.length > 0) {
        await tx.productImage.createMany({
          data: data.images.map((img: any) => ({
            productId: id,
            url: img.url,
            publicId: img.publicId,
            color: img.color || null,
          })),
        });
      }

      const existingVariants = await tx.productVariant.findMany({
        where: { productId: id },
        select: { id: true },
      });
      const existingIds = existingVariants.map((v) => v.id);
      const incomingIds = data.variants
        .map((v: any) => v.id)
        .filter((id: any) => id);

      const toDelete = existingIds.filter((id) => !incomingIds.includes(id));

      for (const varId of toDelete) {
        await tx.variantDimensions.deleteMany({ where: { variantId: varId } });
        await tx.productVariant.delete({ where: { id: varId } });
      }

      for (const v of data.variants) {
        if (v.id) {
          await tx.productVariant.update({
            where: { id: v.id },
            data: {
              name: v.name,
              sku: v.sku,
              thickness: v.thickness,
              color: v.color || null,
              material: v.material || null,
              dimensions: {
                upsert: {
                  create: {
                    width: v.width,
                    height: v.height,
                    depth: v.depth,
                  },
                  update: {
                    width: v.width,
                    height: v.height,
                    depth: v.depth,
                  },
                },
              },
            },
          });
        } else {
          await tx.productVariant.create({
            data: {
              productId: id,
              name: v.name,
              sku: v.sku,
              thickness: v.thickness,
              color: v.color || null,
              material: v.material || null,
              dimensions: {
                create: {
                  width: v.width,
                  height: v.height,
                  depth: v.depth,
                },
              },
            },
          });
        }
      }
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFullProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) return { success: false, error: "Producto no encontrado" };

    const deletePromises = product.images.map((img) =>
      deleteImage(img.publicId),
    );
    await Promise.all(deletePromises);

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
