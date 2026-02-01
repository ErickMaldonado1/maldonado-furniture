import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/features/auth/auth.options";
import { OrderService } from "@/features/orders/order.service";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let orderId: string | undefined;
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    orderId = id;
    const body = await req.json();
    const { status } = body;

    console.log(`[ORDER_PATCH] Updating order ${id} to status: ${status}`);

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    const order = await OrderService.updateOrderStatus(id, status);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("[ORDER_PATCH] Detailed Error:", {
      message: error.message,
      stack: error.stack,
      id: orderId,
    });
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
