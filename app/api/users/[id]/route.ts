import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/features/auth/auth.options";
import { UserService } from "@/features/users/user.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN")
    return NextResponse.json({ message: "No autorizado" }, { status: 403 });

  const user = await UserService.getById(id);
  if (!user)
    return NextResponse.json({ message: "No encontrado" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PATCH(
  req: Request,

  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN")
    return NextResponse.json({ message: "No autorizado" }, { status: 403 });

  const body = await req.json();
  const updated = await UserService.update(id, body);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN")
    return NextResponse.json({ message: "No autorizado" }, { status: 403 });

  await UserService.delete(id);
  return NextResponse.json({ message: "Usuario eliminado" });
}
