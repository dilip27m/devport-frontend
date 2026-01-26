import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/context/AlertContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPort - Professional Portfolio Builder",
  description: "Create stunning portfolios effortlessly with DevPort - the ultimate portfolio builder for developers and creators",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["portfolio", "developer", "creator", "nextjs", "react", "tailwind"],
  authors: [
    {
      name: "DevPort",
    },
  ],
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-152x152.png",
  },
  openGraph: {
    type: "website",
    url: "https://devport.com",
    title: "DevPort - Professional Portfolio Builder",
    description: "Create stunning portfolios effortlessly",
    siteName: "DevPort",
    images: [
      {
        url: "/icons/icon-512x512.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevPort - Professional Portfolio Builder",
    description: "Create stunning portfolios effortlessly",
    images: ["/icons/icon-512x512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="DevPort" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DevPort" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.png" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.className} h-full bg-gray-100`}>
        <AuthProvider>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}