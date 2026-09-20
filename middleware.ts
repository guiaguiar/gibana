import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "gibana_admin_session";

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A própria página de login não deve ser protegida (senão ninguém consegue logar)
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, getSecretKey());
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
