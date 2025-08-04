import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

import { Role } from "../generated/prisma";

import { auth } from "./auth";
import { authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (!isLoggedIn) return NextResponse.next();

    return NextResponse.redirect(new URL("/", nextUrl));
  }
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  const roleHelper = (role: string, nextUrl: NextURL) => {
    if (nextUrl.pathname.startsWith(role)) return NextResponse.next();

    return NextResponse.redirect(new URL("/404", nextUrl));
  };

  if (req.auth?.user.role) {
    const role = req.auth.user.role as Role;

    switch (role) {
      case "MEMBER":
        return roleHelper("/student", nextUrl);
      case "EMPLOYEE":
        return roleHelper("/employee", nextUrl);
      case "PROFESSOR":
        return roleHelper("/professor", nextUrl);
      case "ADMIN":
        return roleHelper("/admin", nextUrl);
      default:
        return NextResponse.redirect(new URL("/404", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
