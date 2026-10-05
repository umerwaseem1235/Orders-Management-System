import { NextResponse, type NextRequest } from "next/server";
import { ROLE_HOME, SESSION_COOKIE, readSessionToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/login") {
    return session
      ? NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url))
      : NextResponse.next();
  }

  if (!session) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Super admin may open any area; other roles only their own.
  const home = ROLE_HOME[session.role];
  if (session.role !== "super_admin" && pathname !== "/" && !pathname.startsWith(home)) {
    return NextResponse.redirect(new URL(home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
