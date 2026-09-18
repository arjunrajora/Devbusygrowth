import { NextResponse } from "next/server";
import { validateAdminCredentials, createAdminSession } from "@/lib/admin-auth";

// Basic email format validator
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanPassword = typeof password === "string" ? password : "";

    // Validation checks
    if (!cleanEmail && !cleanPassword) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!cleanEmail) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!cleanPassword) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Static Server-Side Credential Verification
    const isValid = validateAdminCredentials(cleanEmail, cleanPassword);

    if (!isValid) {
      // Security rule: Do not reveal whether email or password specifically was incorrect
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Create HTTP-only session cookie
    await createAdminSession(cleanEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        redirectTo: "/admin/dashboard",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "An error occurred during authentication." },
      { status: 500 }
    );
  }
}
