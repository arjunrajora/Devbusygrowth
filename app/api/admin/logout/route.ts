import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/admin-auth";

export async function POST() {
  try {
    await destroyAdminSession();
    return NextResponse.json(
      { success: true, message: "Logged out successfully", redirectTo: "/admin/login" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
