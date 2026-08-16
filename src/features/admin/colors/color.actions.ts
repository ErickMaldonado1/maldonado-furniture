"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteImage } from "../media/image.actions";

type ColorCompany = "PELIKANO" | "EDIMCA" | "MASISA";

const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const revalidateColors = () => {
  revalidatePath("/admin/colors");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
  revalidatePath("/catalogo-colores");
};

export async function getColors() {
  try {
    const colors = await prisma.color.findMany({
      orderBy: [{ company: "asc" }, { name: "asc" }],
    });

    return {
      success: true as const,
      colors,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false as const,
      error: "No se pudieron obtener los colores.",
      colors: [],
    };
  }
}

export async function createColor(data: {
  name: string;
  company: ColorCompany;
  hexCode?: string;
  imageUrl?: string;
  publicId?: string;
}) {
  try {
    const name = data.name.trim();
    const slug = slugify(name);

    if (!name) {
      return {
        success: false as const,
        error: "El nombre del color es requerido.",
      };
    }

    if (!["PELIKANO", "EDIMCA", "MASISA"].includes(data.company)) {
      return {
        success: false as const,
        error: "La empresa seleccionada no es válida.",
      };
    }

    if (!slug) {
      return {
        success: false as const,
        error: "Nombre de color no válido.",
      };
    }

    const exists = await prisma.color.findFirst({
      where: {
        company: data.company,
        slug,
      },
    });

    if (exists) {
      return {
        success: false as const,
        error: `El color "${name}" ya existe para ${data.company}.`,
      };
    }

    const color = await prisma.color.create({
      data: {
        name,
        slug,
        company: data.company,
        hexCode: data.hexCode?.trim() || null,
        imageUrl: data.imageUrl?.trim() || null,
        publicId: data.publicId?.trim() || null,
      },
    });

    revalidateColors();

    return {
      success: true as const,
      color,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo crear el color.",
    };
  }
}

export async function deleteColor(id: string) {
  try {
    if (!id) {
      return {
        success: false as const,
        error: "ID del color no válido.",
      };
    }

    const color = await prisma.color.findUnique({
      where: { id },
    });

    if (!color) {
      return {
        success: false as const,
        error: "El color no existe.",
      };
    }

    if (color.publicId) {
      await deleteImage(color.publicId);
    }

    await prisma.color.delete({
      where: { id },
    });

    revalidateColors();

    return {
      success: true as const,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el color.",
    };
  }
}