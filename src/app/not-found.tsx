"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white">
      <h1 className="text-6xl md:text-9xl font-extrabold text-gray-800 tracking-wider">
        404
      </h1>
      <p className="mt-4 text-xl md:text-2xl font-medium text-gray-600">
        Page Not Found
      </p>
      <p className="mt-2 text-md text-gray-500 max-w-sm">
        Sorry, we couldn’t find the page you’re looking for. Maybe you mistyped the URL or the portfolio is private.
      </p>
      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-block bg-black text-white font-semibold text-lg rounded-full px-8 py-3 hover:bg-gray-800 transition-transform duration-200 hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}