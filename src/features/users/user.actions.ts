"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { revalidatePath } from "next/cache";

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]{3,60}$/;
const PHONE_REGEX = /^09\d{8}$/;

export async function updateUserProfile(data: { name: string; phone?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Debes iniciar sesión para editar tu perfil." };
  }

  const trimmedName = data.name?.trim();
  if (!trimmedName || trimmedName.length < 3) {
    return { success: false, error: "El nombre debe tener al menos 3 caracteres." };
  }
  if (!NAME_REGEX.test(trimmedName)) {
    return { success: false, error: "Ingresa un nombre válido sin caracteres especiales." };
  }

  const trimmedPhone = data.phone?.trim();
  if (trimmedPhone && !PHONE_REGEX.test(trimmedPhone)) {
    return { success: false, error: "Formato de celular ecuatoriano inválido: 09XXXXXXXX (10 dígitos)." };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: trimmedName,
        phone: trimmedPhone || null,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
      },
    });

    revalidatePath("/profile");
    return { success: true, user: updated };
  } catch (err: unknown) {
    console.error("Error updating user profile:", err);
    return { success: false, error: "Ocurrió un error al guardar los cambios." };
  }
}
