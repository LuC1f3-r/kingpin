import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.toLowerCase().startsWith("kignpinvisionforge.com")) {
    const url = new URL(request.url);
    url.hostname = "kingpinvisionforge.com";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};
