import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Nếu vào trang /admin mà không có cookie session thì đá sang /admin/login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const session = request.cookies.get("admin_session");
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
