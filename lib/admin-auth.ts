import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "tb_admin_session";
const DEFAULT_ADMIN_EMAIL = "thebusygrowth@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "TheBusyGrowthAdmin2026!";
const DEFAULT_SECRET = "thebusygrowth-secure-admin-session-secret-key-2026";

function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function getSecretKey(): string {
  return process.env.ADMIN_JWT_SECRET || DEFAULT_SECRET;
}

/**
 * Validate admin credentials using timing-safe comparison
 */
export function validateAdminCredentials(email?: string, password?: string): boolean {
  if (!email || !password) return false;

  const targetEmail = getAdminEmail().trim().toLowerCase();
  const targetPassword = getAdminPassword();

  const inputEmail = email.trim().toLowerCase();
  const inputPassword = password;

  // Use Buffer timingSafeEqual for equal length strings, or basic comparison
  const isEmailMatch = inputEmail === targetEmail;
  const isPasswordMatch = safeCompare(inputPassword, targetPassword);

  return isEmailMatch && isPasswordMatch;
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Create HMAC SHA-256 token for admin session
 */
export function createAdminSessionToken(email: string, durationHours = 24): string {
  const secret = getSecretKey();
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + durationHours * 3600;

  const payloadObj = { email, iat, exp };
  const payloadStr = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payloadStr);
  const signature = hmac.digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Verify HMAC SHA-256 session token
 */
export function verifyAdminSessionToken(token: string): { valid: boolean; email?: string } {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadStr, signature] = parts;
  const secret = getSecretKey();

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payloadStr);
  const expectedSignature = hmac.digest("base64url");

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return { valid: false };
  }

  try {
    const payloadObj = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    const now = Math.floor(Date.now() / 1000);

    if (payloadObj.exp && payloadObj.exp < now) {
      return { valid: false };
    }

    return { valid: true, email: payloadObj.email };
  } catch {
    return { valid: false };
  }
}

/**
 * Set HTTP-only admin session cookie
 */
export async function createAdminSession(email: string) {
  const token = createAdminSessionToken(email);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours
  });
}

/**
 * Clear admin session cookie
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Get current admin session info from cookies
 */
export async function getAdminSession(): Promise<{ authenticated: boolean; email?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return { authenticated: false };
  }

  const verification = verifyAdminSessionToken(token);
  if (!verification.valid) {
    return { authenticated: false };
  }

  return { authenticated: true, email: verification.email };
}

export { ADMIN_COOKIE_NAME };
