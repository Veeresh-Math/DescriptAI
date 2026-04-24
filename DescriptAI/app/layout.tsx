import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import DynamicTheme from "@/components/DynamicTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DescriptAI - AI Product Description Generator | Create SEO-Friendly Descriptions",
  description: "Generate high-converting product descriptions in seconds using AI. Supports Amazon, Shopify, eBay, Etsy. Free forever plan available.",
  keywords: ["AI product descriptions", "Amazon product descriptions", "Shopify descriptions", "SEO descriptions", "AI writer", "product copy generator"],
  authors: [{ name: "DescriptAI Team" }],
  openGraph: {
    title: "DescriptAI - AI Product Description Generator",
    description: "Generate high-converting product descriptions in seconds using AI. 100% Free forever plan.",
    url: "https://descriptai-tawny.vercel.app",
    siteName: "DescriptAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DescriptAI - AI Product Description Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DescriptAI - AI Product Description Generator",
    description: "Generate high-converting product descriptions in seconds using AI. 100% Free forever!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF9900" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <DynamicTheme mode="hourly">
          <Providers>
            {children}
          </Providers>
        </DynamicTheme>
      </body>
    </html>
  );
}
