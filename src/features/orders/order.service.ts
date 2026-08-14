import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export const OrderService = {
  async createOrder(data: any) {
    const { userId, items, total, ...shippingData } = data;

    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          total,
          status: OrderStatus.PENDING,
          ...shippingData,
          items: {
            create: items.map((item: any) => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });
  },

  async getAllOrders() {
    return await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  },

  async getOrderById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  },

  async updateOrderStatus(id: string, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  },

  async getOrdersByUser(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  },
};
