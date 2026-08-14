import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "tb_admin_session";
const DEFAULT_SECRET = "thebusygrowth-secure-admin-session-secret-key-2026";

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function verifyAdminSessionInMiddleware(token: string): Promise<boolean> {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;
  const secretStr = process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secretStr),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payloadStr)
    );

    const expectedSignature = arrayBufferToBase64Url(signatureBuffer);
    if (expectedSignature !== signature) {
      return false;
    }

    const decodedPayload = JSON.parse(base64UrlDecode(payloadStr));
    const now = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp && decodedPayload.exp < now) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware on /admin and /api/admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = token ? await verifyAdminSessionInMiddleware(token) : false;

  // 1. Handle API admin routes
  if (isAdminApiRoute) {
    // Exception: /api/admin/login
    if (pathname === "/api/admin/login") {
      return NextResponse.next();
    }
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // 2. Handle Admin Page routes
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    // If logged in, redirect to admin dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected admin routes (/admin/dashboard, /admin/enquiries, /admin/settings, /admin, etc.)
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If requesting root /admin, redirect to /admin/dashboard
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
