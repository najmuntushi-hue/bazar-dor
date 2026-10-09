import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
const { pathname } = request.nextUrl;

// Profile pages require authentication.
if (pathname.startsWith("/profile")) {
const sessionToken =
request.cookies.get("better-auth.session_token")?.value ||
request.cookies.get("__Secure-better-auth.session_token")?.value;


if (!sessionToken) {
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("callbackURL", pathname);

  return NextResponse.redirect(signInUrl);
}


}

return NextResponse.next();
}

export const config = {
matcher: ["/profile/:path*"],
};
