import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { UserRoleType } from "@/lib/constants";
import { DEMO_ACCOUNTS, type DemoAccount } from "@/lib/demo-accounts";

/**
 * DEMO AUTHENTICATION ONLY.
 * Replace `DEMO_ACCOUNTS` with a database lookup (bcrypt/argon2 hashes) and set
 * AUTH_SECRET in the environment before deploying to production.
 */

export const SESSION_COOKIE = "at_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
export const REMEMBER_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export const ROLE_HOME: Record<UserRoleType, string> = {
  super_admin: "/super-admin",
  main_office: "/main-office",
  order_booker: "/order-booker",
  accounts: "/accounts",
};

export interface Session {
  email: string;
  name: string;
  role: UserRoleType;
  exp: number;
}

const sha256 = (value: string) => createHash("sha256").update(value).digest();

function safeEqual(a: string, b: string) {
  return timingSafeEqual(sha256(a), sha256(b));
}

export function verifyCredentials(email: string, password: string): DemoAccount | null {
  const account = DEMO_ACCOUNTS.find((a) => a.email === email.trim().toLowerCase());
  // Always run a comparison so response time doesn't reveal valid emails.
  const passwordOk = safeEqual(password, account?.password ?? "\0invalid");
  return account && passwordOk ? account : null;
}

function secret() {
  return process.env.AUTH_SECRET ?? "dev-only-secret-change-me";
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function createSessionToken(account: DemoAccount, ttlSeconds: number): string {
  const session: Session = {
    email: account.email,
    name: account.name,
    role: account.role,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined): Session | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    return session.exp > Date.now() / 1000 ? session : null;
  } catch {
    return null;
  }
}
