import { getServerSession } from "next-auth/next";
import type { NextRequest } from "next/server";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// Inline auth options - same as in app/api/auth/[...nextauth]/route.ts
const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              id: user.id || crypto.randomUUID(),
              email: user.email!,
              name: user.name,
              image: user.image,
              tier: "free",
              shortCredits: 3,
              mediumCredits: 2,
            },
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
};

// Re-export authOptions for use in other files
export { authOptions };

// NextAuth server-side auth helper for API routes
export async function auth(req?: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return { userId: null };
    }
    
    return { 
      userId: session.user.id || (session.user as any).email,
      session: session
    };
  } catch (error) {
    console.error("[AUTH_ERROR]", error);
    return { userId: null };
  }
}

export async function currentUser(req?: NextRequest) {
  const session = await auth(req);
  
  if (!session.userId) {
    return null;
  }
  
  // Try to get more user info from session
  const s = session.session as any;
  return {
    id: session.userId,
    emailAddresses: [{ emailAddress: s?.user?.email || "user@example.com" }],
    firstName: s?.user?.name?.split(" ")[0] || "User",
    lastName: s?.user?.name?.split(" ")[1] || null,
  };
}

