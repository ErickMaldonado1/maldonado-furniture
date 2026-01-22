import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return new NextResponse("Email inválido", { status: 400 });
    }

    const subscription = await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json({ message: "Suscrito con éxito", subscription });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Este email ya está suscrito", { status: 400 });
    }
    return new NextResponse("Error en el servidor", { status: 500 });
  }
}
