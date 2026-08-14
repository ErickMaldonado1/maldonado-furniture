import { NextResponse } from "next/server";
import { AuthService } from "@/features/auth/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await AuthService.register(body);
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
