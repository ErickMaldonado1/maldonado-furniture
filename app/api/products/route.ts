import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/features/products/product.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {
      category: searchParams.get("category"),
      subcategory: searchParams.get("subcategory"),
      minPrice: searchParams.get("minPrice")
        ? parseFloat(searchParams.get("minPrice")!)
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? parseFloat(searchParams.get("maxPrice")!)
        : undefined,
      search: searchParams.get("search"),
    };

    const products = await ProductService.getAll(filters);
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.sku || !body.price) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name, sku, price" },
        { status: 400 },
      );
    }

    const newProduct = await ProductService.create(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "El SKU ya existe en la base de datos" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
