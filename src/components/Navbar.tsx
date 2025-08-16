"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white shadow">
      {/* Logo / App Name */}
      <Link href="/" className="text-xl font-bold hover:text-blue-400">
        DevPort 🚀
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link href="/templates" className="hover:text-blue-400">
          Templates
        </Link>
        <Link href="/pricing" className="hover:text-blue-400">
          Pricing
        </Link>
        <Link href="/profile" className="hover:text-blue-400">
          Profile
        </Link>
      </div>
    </nav>
  );
}
