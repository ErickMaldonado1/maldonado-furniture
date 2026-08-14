import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/features/products/product.service";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ variantId: string }> },
) {
  try {
    const { variantId } = await params;
    const body = await req.json();

    if (!variantId) {
      return NextResponse.json(
        { error: "ID de variante requerido" },
        { status: 400 },
      );
    }
    const updated = await ProductService.updateVariant(variantId, body);

    return NextResponse.json(updated, { status: 200 });
  } catch (e: any) {
    console.error("Error actualizando variante:", e);
    return NextResponse.json(
      { error: "No se pudo actualizar la variante: " + e.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ variantId: string }> },
) {
  try {
    const { variantId } = await params;
    await ProductService.deleteVariant(variantId);
    return NextResponse.json({ message: "Variante eliminada correctamente" });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error desconocido" },
      { status: 500 },
    );
  }
}
