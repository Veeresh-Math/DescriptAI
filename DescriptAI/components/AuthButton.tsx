"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (isAuthenticated && session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-white/70 hover:text-white text-sm"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/sign-in"
      className="text-white/70 hover:text-white text-sm sm:text-base transition"
    >
      Sign In
    </Link>
  );
}

export function AuthStatus() {
  const { data: session, status } = useSession();
  
  return {
    isSignedIn: status === "authenticated",
    isLoading: status === "loading",
    user: session?.user,
    userId: session?.user?.id,
  };
}
