import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Case-sensitive on purpose: proxy's matcher (like next.config.js redirects)
// compiles patterns case-insensitively, so an exact string-key lookup here
// is what stops "/about" from being caught by the "/About" legacy rule.
const legacyRedirects: Record<string, string> = {
  "/About": "/about",
  "/Service": "/service",
  "/Contact": "/contact",
  "/Blog": "/blog",
  "/Properties": "/properties",
  "/Admin": "/admin/login",
  "/Dashboard": "/admin",
};

export function proxy(request: NextRequest) {
  const legacyTarget = legacyRedirects[request.nextUrl.pathname];
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 308);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/About",
    "/Service",
    "/Contact",
    "/Blog",
    "/Properties",
    "/Admin",
    "/Dashboard",
  ],
};
