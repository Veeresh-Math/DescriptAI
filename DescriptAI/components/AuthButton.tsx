"use client";

import Link from "next/link";

export function AuthButton() {
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
  return {
    isSignedIn: false,
    isLoading: false,
    user: null,
    userId: undefined,
  };
}
