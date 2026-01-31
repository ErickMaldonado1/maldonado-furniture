import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/features/products/product.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    let product = await ProductService.getById(productId);

    if (!product) {
      product = await ProductService.getBySlug(productId);
    }

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    const body = await req.json();

    const updatedProduct = await ProductService.updateProduct(productId, body);

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    await ProductService.deactivateProduct(productId);
    return NextResponse.json({ message: "Producto desactivado correctamente" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
