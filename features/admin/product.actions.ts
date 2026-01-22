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

export async function createFullProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        price: data.price,
        category: data.category,
        images: {
          create: data.images, 
        },
        variants: {
          create: data.variants.map((v: any) => ({
            name: v.name,
            sku: v.sku,
            thickness: v.thickness,
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