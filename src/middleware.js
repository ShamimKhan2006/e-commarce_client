import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Define private routes that require authentication
  const privateRoutes = ["/dashboard", "/add-product", "/checkout"];
  
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  
  if (isPrivateRoute) {
    // Check for the better-auth session cookie
    // Note: checking the cookie existence in Edge middleware is the safest way
    // without triggering Prisma/SQLite Edge runtime errors.
    const sessionCookie = request.cookies.get("better-auth.session_token");
    const secureSessionCookie = request.cookies.get("__Secure-better-auth.session_token");
    
    if (!sessionCookie && !secureSessionCookie) {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
