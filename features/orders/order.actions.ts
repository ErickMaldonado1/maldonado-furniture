"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import prisma from "@/lib/prisma";

export async function deleteOrderAction(orderId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return { error: "No autorizado" };
    }
    await prisma.order.delete({
      where: { id: orderId },
    });

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { error: "No se pudo eliminar la orden" };
  }
}
