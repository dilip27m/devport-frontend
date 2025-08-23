import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

// Assuming your main app navbar is here. Update path if needed.
import Navbar from "@/components/Navbar"; 

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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar /> {/* Your main application navbar */}
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}