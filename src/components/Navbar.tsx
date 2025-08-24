"use client";

import React from "react";
import Link from "next/link";
// 1. Import the useAuth hook to access the context
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  // 2. Get the authentication status, user info, and logout function
  const { isAuthenticated, user, logoutUser } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      {/* Logo */}
      <div>
        <Link href="/" className="text-xl font-bold">
          DevPort 🚀
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {/* 3. Use a ternary operator for conditional rendering */}
        {isAuthenticated ? (
          // --- Show these links if the user IS logged in ---
          <>
            <span className="text-gray-300">Welcome, {user?.name}!</span>
            <Link href="/editor" className="hover:text-blue-300 transition">
              Editor
            </Link>
            <Link href="/profile" className="hover:text-blue-300 transition">
              Profile
            </Link>
            <button
              onClick={logoutUser}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          // --- Show these links if the user IS NOT logged in ---
          <>
            <Link href="/templates" className="hover:text-blue-300 transition">
              Templates
            </Link>
            <Link href="/login" className="hover:text-blue-300 transition">
              Login
            </Link>
            <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;