import { createRouteMatcher } from "@clerk/nextjs/server";

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

// Simplified middleware - just allow all requests
// Clerk authentication is handled in individual API routes
export default function middleware(request: Request) {
    // Allow all requests through
    // Auth is handled per-route
    return;
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
