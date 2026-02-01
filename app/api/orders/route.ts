import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/features/auth/auth.options";
import { OrderService } from "@/features/orders/order.service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new NextResponse("Invalid JSON", { status: 400 });
    }

    const { items, total, ...shippingData } = body;

    if (!items || items.length === 0) {
      return new NextResponse("No hay items en el pedido", { status: 400 });
    }

    const order = await OrderService.createOrder({
      userId: session.user.id,
      items,
      total,
      ...shippingData,
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("[ORDERS_POST] Detailed Error:", {
      message: error.message,
      stack: error.stack,
    });
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await OrderService.getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
