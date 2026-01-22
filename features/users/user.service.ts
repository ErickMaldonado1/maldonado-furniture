import prisma from "@/lib/prisma";

export const UserService = {
  async getAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async update(id: string, data: { name?: string; role?: "USER" | "ADMIN" }) {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
  },

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
