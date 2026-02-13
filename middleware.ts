import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/api/admin/(.*)',
    '/api/webhook/(.*)',
    '/api/checkout/(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/',
    '/pricing',
    '/generate',
    '/history',
    '/api/generate',
    '/api/history',
    '/api/user',
    '/api/keywords',
    '/api/presets',
    '/api/referral',
]);

export default clerkMiddleware(async (auth, req) => {
    // Skip auth for public routes - allow all access
    if (isPublicRoute(req)) {
        return;
    }
    
    // For protected routes, try to authenticate but don't fail if Clerk is not configured
    try {
        await auth.protect();
    } catch (error) {
        // If auth fails, redirect to sign-in
        return Response.redirect(new URL('/sign-in', req.url));
    }
});


export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
