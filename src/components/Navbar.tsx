"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const pathname = usePathname();
  

  return (
<nav
  className="fixed top-0 left-0 right-0 z-50  bg-gray-100 backdrop-blur-md border-b border-gray-00 px-4 py-3 flex items-center justify-between shadow-md"

>
    <Link href="/" className="text-2xl font-bold  font-weight-300 text-gray-900 hover:text-gray-800 transition">
        DEVport
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-base font-medium text-gray-700">
        {isAuthenticated ? (
          <>
            <span className="text-gray-600 text-base">Welcome, {user?.name}!</span>

            <Link
              href="/editor"
              className={`hover:text-black transition ${
                pathname === "/editor" ? "text-base text-black drop-shadow-md font-semibold" : ""
              }`}
            >
              Editor
            </Link>

            <Link
              href="/profile"
              className={`hover:text-black transition ${
                pathname === "/profile" ? "text-xl text-black drop-shadow-md font-semibold" : ""
              }`}
            >
              Profile
            </Link>

<button
  onClick={logoutUser}
  className="px-4 py-2 text-red-500 border border-red-500 bg-transparent hover:bg-red-500 hover:text-white rounded-3xl transition-all duration-300 ease-in-out"
>
  Logout
</button>

          </>
        ) : (
          <>
            <Link
              href="/templates"
              className={`hover:text-black transition ${
                pathname === "/templates" ? "text-black drop-shadow-md font-semibold" : ""
              }`}
            >
              Templates
            </Link>

            <Link
              href="/login"
              className={`hover:text-black transition ${
                pathname === "/login" ? "text-black drop-shadow-md font-semibold" : ""
              }`}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;