import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Daftar path yang memerlukan autentikasi
const protectedRoutes = [
  "/home",
  "/map/sitemap",
  "/map/citymap",
  "/map/regionmap",
];

export function middleware(request: NextRequest) {
  // Mendapatkan path saat ini
  const path = request.nextUrl.pathname;

  // Mendapatkan token dari cookies
  const token = request.cookies.get("token")?.value;

  // Cek apakah path saat ini termasuk dalam protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // Jika ini adalah protected route dan tidak ada token
  if (isProtectedRoute && !token) {
    // Redirect ke halaman login
    const response = NextResponse.redirect(new URL("/auth/login", request.url));

    // Simpan URL yang dicoba diakses untuk redirect setelah login
    response.cookies.set("redirectTo", path);

    return response;
  }

  // Jika mengakses halaman login/register saat sudah memiliki token
  if ((path === "/auth/login" || path === "/auth/register") && token) {
    // Redirect ke home
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/home",
    "/map/:path*", // Akan menangkap semua path yang dimulai dengan /map/
    // Auth routes
    "/auth/login",
    "/auth/register",
  ],
};
