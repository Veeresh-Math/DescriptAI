"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

// Clerk-compatible hooks and components for easy migration

export function useUser() {
  const { data: session, status } = useSession();
  
  return {
    isSignedIn: status === "authenticated",
    isLoaded: status !== "loading",
    user: session?.user ? {
      id: session.user.id,
      firstName: session.user.name?.split(" ")[0] || null,
      lastName: session.user.name?.split(" ").slice(1).join(" ") || null,
      fullName: session.user.name,
      emailAddresses: [{ emailAddress: session.user.email }],
      imageUrl: session.user.image,
    } : null,
  };
}

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    userId: session?.user?.id || null,
    sessionId: session ? "active" : null,
    getToken: async () => session ? "token" : null,
  };
}

interface SignedInProps {
  children: ReactNode;
}

export function SignedIn({ children }: SignedInProps) {
  const { status } = useSession();
  
  if (status === "authenticated") {
    return <>{children}</>;
  }
  
  return null;
}

interface SignedOutProps {
  children: ReactNode;
}

export function SignedOut({ children }: SignedOutProps) {
  const { status } = useSession();
  
  if (status === "unauthenticated") {
    return <>{children}</>;
  }
  
  return null;
}

interface UserButtonProps {
  afterSignOutUrl?: string;
  appearance?: {
    elements?: {
      avatarBox?: string;
    };
  };
}

export function UserButton({ afterSignOutUrl = "/", appearance }: UserButtonProps) {
  const { data: session } = useSession();
  
  if (!session?.user) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2">
      {session.user.image ? (
        <img
          src={session.user.image}
          alt={session.user.name || "User"}
          className={`rounded-full ${appearance?.elements?.avatarBox || "w-8 h-8"}`}
        />
      ) : (
        <div className={`rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold ${appearance?.elements?.avatarBox || "w-8 h-8"}`}>
          {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
        </div>
      )}
      <button
        onClick={() => signOut({ callbackUrl: afterSignOutUrl })}
        className="text-sm text-gray-400 hover:text-white"
      >
        Sign Out
      </button>
    </div>
  );
}

// Auth helper for API routes
export async function auth() {
  // This is a client-side compat, actual auth check is in middleware
  return { userId: null };
}

export { useSession as useNextAuthSession };
