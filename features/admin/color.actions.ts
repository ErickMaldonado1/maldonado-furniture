"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getColors() {
  try {
    const colors = await prisma.color.findMany({
      orderBy: { name: 'asc' }
    });
    return { success: true, colors };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

export async function createColor(data: { name: string; hexCode?: string }) {
  try {
    const color = await prisma.color.create({
      data: {
        name: data.name,
        hexCode: data.hexCode
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin/products/new");
    return { success: true, color };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
