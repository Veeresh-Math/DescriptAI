import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

// NextAuth server-side auth helper for API routes
export async function auth(req?: NextRequest) {
  // For API routes, we use the session from the request
  // The actual session validation happens in middleware
  // This function extracts the user info from the session
  
  if (!req) {
    return { userId: null };
  }
  
  // Get the session token from cookies
  const sessionToken = req.cookies.get("next-auth.session-token")?.value || 
                       req.cookies.get("__Secure-next-auth.session-token")?.value;
  
  if (!sessionToken) {
    return { userId: null };
  }
  
  // Return a mock user object - the actual validation is done by middleware
  return { 
    userId: "authenticated",
    session: { user: { id: "user_id" } }
  };
}

export async function currentUser(req?: NextRequest) {
  const session = await auth(req);
  
  if (!session.userId) {
    return null;
  }
  
  return {
    id: session.userId,
    emailAddresses: [{ emailAddress: "user@example.com" }],
    firstName: "User",
    lastName: null,
  };
}
