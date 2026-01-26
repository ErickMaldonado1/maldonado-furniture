import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ variantId: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  const { variantId } = await params;

  try {
    await prisma.favorite.delete({
      where: {
        userId_variantId: {
          userId: session.user.id,
          variantId: variantId,
        },
      },
    });

    return NextResponse.json({ message: "Eliminado de favoritos" });
  } catch (error) {
    console.error(error);
    return new NextResponse("No se pudo eliminar", { status: 400 });
  }
}
