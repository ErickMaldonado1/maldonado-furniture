import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    const isAdminPage = pathname.startsWith("/admin");
    const isAdmin = token?.role === "ADMIN";

    if (isAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (token && token.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = typeof token.exp === "number" ? token.exp : 0;
      if (currentTime > expirationTime) {
        const url = new URL("/login", req.url);
        url.searchParams.set("expired", "true");
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/ordenes/:path*", "/perfil/:path*"],
};
