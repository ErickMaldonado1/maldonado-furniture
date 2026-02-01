import { ProductService } from "./product.service";
import { revalidatePath } from "next/cache";

export const getProductsAction = async (filters: any) => {
  return await ProductService.getAll(filters);
};

export const createProductAction = async (data: any) => {
  const product = await ProductService.create(data);
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
  return product;
};

export const updateVariantAction = async (variantId: string, data: any) => {
  const updated = await ProductService.updateVariant(variantId, data);
  revalidatePath("/shop");
  return updated;
};

export const deleteVariantAction = async (variantId: string) => {
  await ProductService.deleteVariant(variantId);
  revalidatePath("/admin/products");
};

export async function deleteProductAction(id: string) {
  try {
    await ProductService.deactivateProduct(id);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { error: "No se pudo desactivar el producto" };
  }
}
