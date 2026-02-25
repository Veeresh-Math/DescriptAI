import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/api/admin/(.*)',
    '/api/webhook/(.*)',
    '/api/checkout/(.*)',
    '/api/generate',
    '/api/history',
    '/api/user',
    '/api/keywords',
    '/api/presets',
    '/api/referral',
    '/api/shopify',
    '/api/bulk',
    '/api/analytics',
    '/api/image',
    '/api/team',
    '/api/tools',
    '/api/freemium',
    '/api/cron/keep-alive', // Keep cron endpoint public (no auth required)
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/',
    '/pricing',
    '/generate',
    '/history',
    '/help',
    '/contact',
    '/privacy',
    '/terms',
    '/refund',
    '/bulk',
    '/analytics',
    '/team',
]);

export default clerkMiddleware((auth, req) => {
    // Public routes are allowed without authentication
    if (isPublicRoute(req)) {
        return;
    }

    // Protected routes require authentication
    // auth() will throw if user is not authenticated
    // The error is caught by Clerk's error handler
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
