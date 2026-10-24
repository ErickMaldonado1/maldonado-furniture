import prisma from "@/lib/prisma";

export const AdminService = {
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
    const [
      totalProducts,
      activeProducts,
      inactiveProducts,
      productsCatalog,
      totalOrders,
      pendingOrders,
      paidOrders,
      completedOrders,
      cancelledOrders,
      paidOrdersList,
      totalUsers,
      adminUsers,
      totalColors,
      totalSubscribers,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: false } }),
      prisma.product.findMany({ select: { category: true, subcategory: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.count({ where: { status: "COMPLETED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
      prisma.order.findMany({
        where: { status: { in: ["PAID", "COMPLETED"] } },
        select: { total: true },
      }),
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.color.count(),
      prisma.newsletter.count(),
    ]);

    const categoriesSet = new Set<string>();
    const subcategoriesSet = new Set<string>();
    productsCatalog.forEach((p) => {
      if (p.category) categoriesSet.add(p.category.trim());
      if (p.subcategory) subcategoriesSet.add(p.subcategory.trim());
    });

    const totalRevenue = paidOrdersList.reduce((acc, curr) => acc + (curr.total || 0), 0);

    return {
      totalProducts,
      activeProducts,
      inactiveProducts,
      categoriesCount: categoriesSet.size,
      subcategoriesCount: subcategoriesSet.size,
      totalOrders,
      pendingOrders,
      paidOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue,
      totalUsers,
      adminUsers,
      clientUsers: Math.max(0, totalUsers - adminUsers),
      totalColors,
      totalSubscribers,
    };
  },

  async getRecentOrders() {
    return await prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: {
          include: {
            variant: {
              select: {
                name: true,
                sku: true,
                color: true,
                product: { select: { name: true } },
              },
            },
          },
        },
      },
    });
  },
};
