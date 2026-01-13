import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session");
    const isLoginPage = request.nextUrl.pathname === "/admin/login";

    // If accessing login page and already logged in, redirect to dashboard
    if (isLoginPage && adminSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If accessing protected route and not logged in, redirect to login
    if (!isLoginPage && !adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
