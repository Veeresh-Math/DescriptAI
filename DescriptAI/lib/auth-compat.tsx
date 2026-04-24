"use client";

interface MockUser {
  firstName?: string;
  lastName?: string;
  emailAddresses?: { emailAddress?: string }[];
  email?: string;
  name?: string;
  image?: string;
}

// Safe useUser that handles SSR - returns mock user during build
export function useUser() {
  // During SSR/build, return a mock state
  if (typeof window === 'undefined') {
    return {
      user: null as MockUser | null,
      isLoading: false,
      isAuthenticated: false,
      isSignedIn: false,
    };
  }

  // Dynamic import of next-auth/react to avoid SSR issues
  try {
    const { useSession } = require("next-auth/react");
    const { data: session, status } = useSession();
    
    const user = session?.user ? {
      firstName: session.user.name?.split(' ')[0] || '',
      lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
      email: session.user.email || '',
      emailAddresses: session.user.email ? [{ emailAddress: session.user.email }] : [],
      image: session.user.image,
      name: session.user.name,
    } : null;

    return {
      user: user as MockUser | null,
      isLoading: status === "loading",
      isAuthenticated: !!session,
      isSignedIn: !!session,
    };
  } catch (e) {
    return {
      user: null as MockUser | null,
      isLoading: false,
      isAuthenticated: false,
      isSignedIn: false,
    };
  }
}

export function useAuth() {
  if (typeof window === 'undefined') {
    return {
      signIn: () => {},
      signOut: () => {},
      isAuthenticated: false,
      isLoading: false,
    };
  }

  try {
    const { signIn, signOut, useSession } = require("next-auth/react");
    const { data: session, status } = useSession();
    
    return {
      signIn: () => signIn("google"),
      signOut: () => signOut(),
      isAuthenticated: !!session,
      isLoading: status === "loading",
    };
  } catch (e) {
    return {
      signIn: () => {},
      signOut: () => {},
      isAuthenticated: false,
      isLoading: false,
    };
  }
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return null;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return null;
  }
  
  if (isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
}

export function UserButton({ afterSignOutUrl = "/", appearance }: { afterSignOutUrl?: string; appearance?: unknown }) {
  const { isAuthenticated, user } = useUser();
  
  if (!isAuthenticated) {
    if (typeof window === 'undefined') return null;
    return (
      <button
        onClick={() => {
          const { signIn } = require("next-auth/react");
          signIn("google");
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      {user?.image && (
        <img
          src={user.image}
          alt={user.name || "User"}
          className="w-8 h-8 rounded-full"
        />
      )}
      <button
        onClick={() => {
          const { signOut } = require("next-auth/react");
          signOut({ callbackUrl: afterSignOutUrl });
        }}
        className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        Sign Out
      </button>
    </div>
  );
}

export function useNextAuthSession() {
  if (typeof window === 'undefined') {
    return {
      data: null,
      status: "unauthenticated" as const,
    };
  }

  try {
    const { useSession } = require("next-auth/react");
    return useSession();
  } catch (e) {
    return {
      data: null,
      status: "unauthenticated" as const,
    };
  }
}
