import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/auth.options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("No autorizado", { status: 401 });

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      variant: {
        include: { product: true },
      },
    },
  });

  return NextResponse.json(favorites);
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("No autorizado", { status: 401 });

  const { variantId } = await req.json();

  try {
    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        variantId: variantId,
      },
    });
    return NextResponse.json(favorite);
  } catch {
    return new NextResponse("Error o ya existe en favoritos", { status: 400 });
  }
}
