// features/admin/admin.service.ts
import prisma from "@/lib/prisma";

export const AdminService = {
  // Obtener productos con stock y variantes para la tabla
  async getInventory() {
    return await prisma.product.findMany({
      include: {
        variants: {
          include: { dimensions: true },
        },
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getDashboardStats() {
    const [totalProducts, totalOrders, totalUsers] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
    ]);
    return { totalProducts, totalOrders, totalUsers };
  },

  async getRecentOrders() {
    return await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: true,
      },
    });
  },
};
