import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/features/products/product.service";

export async function POST(req: NextRequest) {
  try {
    const { file, folder, variantId } = await req.json();

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 },
      );
    }

    const cloudinaryData = await ProductService.uploadOnly(
      file,
      folder || "productos",
    );
    return NextResponse.json({
      url: cloudinaryData.url,
      publicId: cloudinaryData.publicId,
      variantId: variantId || null,
    });
  } catch (error: any) {
    console.error("Error en API de imágenes:", error);
    return NextResponse.json(
      { error: "Error al procesar la imagen: " + error.message },
      { status: 500 },
    );
  }
}
