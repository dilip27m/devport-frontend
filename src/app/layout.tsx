import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPort",
  description: "Create your developer portfolio instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Add h-full to the html tag
    <html lang="en" className="h-full">
      {/* 2. Add h-full and a default background color to the body */}
      <body className={`${inter.className} h-full bg-gray-100`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}