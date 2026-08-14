"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ColorCompany = "PELIKANO" | "EDIMCA" | "MASISA";

function slugify(text: string): string {
  if (!text) return "";

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Obtener todos los colores
 */
export async function getColors() {
  try {
    const colors = await prisma.color.findMany({
      orderBy: [
        {
          company: "asc",
        },
        {
          name: "asc",
        },
      ],
    });

    return {
      success: true,
      colors,
    };
  } catch (error) {
    console.error("Error obteniendo colores:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudieron obtener los colores",
      colors: [],
    };
  }
}

/**
 * Crear un nuevo color
 */
export async function createColor(data: {
  name: string;
  company: ColorCompany;
  hexCode?: string;
  imageUrl?: string;
}) {
  try {
    const name = data.name.trim();

    if (!name) {
      return {
        success: false,
        error: "El nombre del color es requerido",
      };
    }

    /**
     * Validar empresa
     */
    const validCompanies: ColorCompany[] = ["PELIKANO", "EDIMCA", "MASISA"];

    if (!validCompanies.includes(data.company)) {
      return {
        success: false,
        error: "La empresa seleccionada no es válida",
      };
    }

    const slug = slugify(name);

    if (!slug) {
      return {
        success: false,
        error: "No se pudo generar un identificador válido para el color",
      };
    }

    /**
     * Buscar si ya existe el mismo color
     * para la misma empresa.
     *
     * Ejemplo:
     *
     * Cartagena + PELIKANO  -> no puede repetirse
     * Cartagena + EDIMCA    -> sí puede existir
     * Cartagena + MASISA    -> sí puede existir
     */
    const existingColor = await prisma.color.findFirst({
      where: {
        company: data.company,
        slug,
      },
    });

    if (existingColor) {
      return {
        success: false,
        error: `El color "${name}" ya existe para ${data.company}`,
      };
    }

    const color = await prisma.color.create({
      data: {
        name,
        slug,
        company: data.company,
        hexCode: data.hexCode?.trim() || null,
        imageUrl: data.imageUrl?.trim() || null,
      },
    });

    /**
     * Actualizar las páginas donde se utilizan los colores
     */
    revalidatePath("/admin/colors");
    revalidatePath("/admin/products");
    revalidatePath("/admin/products/new");

    return {
      success: true,
      color,
    };
  } catch (error) {
    console.error("Error creando color:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "No se pudo crear el color",
    };
  }
}

/**
 * Eliminar un color
 */
export async function deleteColor(id: string) {
  try {
    const color = await prisma.color.findUnique({
      where: {
        id,
      },
    });

    if (!color) {
      return {
        success: false,
        error: "El color no existe",
      };
    }

    await prisma.color.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/colors");
    revalidatePath("/admin/products");
    revalidatePath("/admin/products/new");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error eliminando color:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "No se pudo eliminar el color",
    };
  }
}
