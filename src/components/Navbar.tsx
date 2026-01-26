"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClasses = (path: string) =>
    `hover:text-black transition ${pathname === path ? "text-base text-black drop-shadow-md font-semibold" : ""
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-100 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-md">
        <Link
          href="/"
          className="text-2xl font-bold font-weight-300 text-gray-900 hover:text-gray-800 transition"
        >
          DEVportt
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium text-gray-700">
          {isAuthenticated ? (
            <>
              <span className="text-gray-600 text-base">Welcome, {user?.name}</span>
              <Link href="/viewTemplate" className={navLinkClasses("/viewTemplate")}>
                Templates
              </Link>
              <Link href="/editor" className={navLinkClasses("/editor")}>
                Editor
              </Link>
              <Link href="/profile" className={navLinkClasses("/profile")}>
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
              <Link href="/viewTemplate" className={navLinkClasses("/viewTemplate")}>
                Templates
              </Link>
              <Link href="/login" className={navLinkClasses("/login")}>
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Slide-in Menu Panel */}
        <div
          className={`absolute top-[60px] right-0 w-64 bg-white/95 backdrop-blur-md shadow-2xl rounded-bl-2xl border-l border-b border-gray-200 transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col py-4">
            {isAuthenticated ? (
              <>
                {/* User Welcome */}
                <div className="px-6 py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Welcome,</span>
                  <p className="text-base font-semibold text-gray-800">{user?.name}</p>
                </div>

                {/* Navigation Links */}
                <Link
                  href="/viewTemplate"
                  onClick={closeMobileMenu}
                  className={`px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors ${pathname === "/viewTemplate" ? "bg-gray-100 text-black font-semibold" : ""
                    }`}
                >
                  Templates
                </Link>
                <Link
                  href="/editor"
                  onClick={closeMobileMenu}
                  className={`px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors ${pathname === "/editor" ? "bg-gray-100 text-black font-semibold" : ""
                    }`}
                >
                  Editor
                </Link>
                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className={`px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors ${pathname === "/profile" ? "bg-gray-100 text-black font-semibold" : ""
                    }`}
                >
                  Profile
                </Link>

                {/* Logout Button */}
                <div className="px-4 pt-4 pb-2 border-t border-gray-100 mt-2">
                  <button
                    onClick={() => {
                      logoutUser();
                      closeMobileMenu();
                    }}
                    className="w-full px-4 py-2.5 text-red-500 border border-red-500 bg-transparent hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 ease-in-out font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Unauthenticated Links */}
                <Link
                  href="/viewTemplate"
                  onClick={closeMobileMenu}
                  className={`px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors ${pathname === "/viewTemplate" ? "bg-gray-100 text-black font-semibold" : ""
                    }`}
                >
                  Templates
                </Link>

                {/* Login Button */}
                <div className="px-4 pt-4 pb-2">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-4 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;