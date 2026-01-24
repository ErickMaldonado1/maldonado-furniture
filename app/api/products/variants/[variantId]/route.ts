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
    return NextResponse.json(updated);
  } catch (e: any) {
    console.error("Error actualizando variante:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
