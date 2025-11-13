"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useAuth } from "@/context/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  
  const { forgotPassword } = useAuth();
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);
     
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
   
  };

  return (
    <div className="flex pt-20 min-h-[calc(100vh-80px)] items-center justify-center bg-white font-sans px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-3xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Reset Password
        </h2>

        <p className="text-sm text-gray-700 text-center mb-6">
          No problem! Enter your email and we'll send you a 6-digit code to get back into your account.
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-3xl py-2.5 font-medium border ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white border-black hover:bg-white hover:text-black"
            } transition-all duration-300 ease-in-out`}
          >
            {loading ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          Remember your password?{" "}
          <Link href="/login" className="text-black font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;