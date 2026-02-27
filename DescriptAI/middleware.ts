import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Public paths that don't require authentication
        const publicPaths = [
          "/",
          "/pricing",
          "/sign-in",
          "/sign-up",
          "/help",
          "/contact",
          "/privacy",
          "/terms",
          "/refund",
        ];
        
        const isPublicPath = publicPaths.some(path => 
          req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + "/")
        );
        
        // API routes that are public
        const publicApiPaths = [
          "/api/auth",
          "/api/checkout",
          "/api/webhook",
        ];
        
        const isPublicApi = publicApiPaths.some(path =>
          req.nextUrl.pathname.startsWith(path)
        );
        
        if (isPublicPath || isPublicApi) {
          return true;
        }
        
        // All other routes require auth
        return token !== null;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
