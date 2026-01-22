import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/features/products/product.service";

export async function POST(req: NextRequest) {
  try {
    const { file, folder } = await req.json();
    const cloudinaryData = await ProductService.uploadOnly(
      file,
      folder || "productos",
    );
    return NextResponse.json(cloudinaryData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
