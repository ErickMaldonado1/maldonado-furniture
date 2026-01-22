import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/features/products/product.service";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ variantId: string }> },
) {
  const { variantId } = await params;
  const body = await req.json();
  try {
    const updated = await ProductService.updateVariant(variantId, body);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
