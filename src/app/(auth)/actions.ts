"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  REMEMBER_TTL_SECONDS,
  ROLE_HOME,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  verifyCredentials,
} from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export type LoginResult = { error: string };

export async function loginAction(input: z.infer<typeof schema>): Promise<LoginResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Please enter a valid email and password." };

  const { email, password, rememberMe } = parsed.data;
  const account = verifyCredentials(email, password);
  if (!account) return { error: "Invalid email or password." };

  const ttl = rememberMe ? REMEMBER_TTL_SECONDS : SESSION_TTL_SECONDS;
  (await cookies()).set(SESSION_COOKIE, createSessionToken(account, ttl), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ttl,
  });

  redirect(ROLE_HOME[account.role]);
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
