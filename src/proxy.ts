import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE_NAME, isAccessGateEnabled, isValidAccessToken } from "@/lib/site-auth";

export function proxy(request: NextRequest) {
  if (!isAccessGateEnabled()) return NextResponse.next();

  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  if (isValidAccessToken(token)) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
