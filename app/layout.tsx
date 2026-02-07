import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DescriptAI - Professional AI Product Description Generator",
  description: "Generate high-converting, SEO-optimized product descriptions in seconds. The ultimate marketing engine for modern merchants.",
  keywords: "AI product descriptions, e-commerce marketing, Shopify SEO, Amazon copy, professional copywriting tool",
  openGraph: {
    title: "DescriptAI - Free AI Product Description Generator",
    description: "Turn 3 hours into 3 minutes. Generate product descriptions with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
