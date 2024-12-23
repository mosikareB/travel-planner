import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const privatePath = ["/home"];
  const isPrivate = privatePath.includes(path);

    const token = request.cookies.get("__Secure-next-auth.session-token")?.value;

  // const token = request.cookies.get("next-auth.session-token")?.value;

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

export const config = {
  matcher: ["/home", "/api/auth/signin", "/signup", "/"],
};
