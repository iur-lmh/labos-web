import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "labos_token";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profesionales/:path*", "/pacientes/:path*"],
};
