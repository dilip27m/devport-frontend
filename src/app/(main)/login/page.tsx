"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      // Redirect handled by AuthContext
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[Poppins]">
      <div className="relative w-[750px] h-[450px] bg-white border-2 border-black rounded-xl shadow-2xl overflow-hidden flex">
        {/* Left: Login Form */}
        <div className="w-1/2 h-full flex flex-col justify-center px-10">
          <h2 className="text-3xl font-bold text-black mb-6 text-center relative after:content-[''] after:w-10 after:h-1 after:bg-black after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2">
            Log In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="bg-red-100 text-red-700 p-3 rounded-md text-center">
                {error}
              </p>
            )}

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer w-full border-b-2 border-black focus:border-blue-600 bg-transparent outline-none text-base py-2 pr-8"
              />
              <label className="absolute left-0 top-2 text-gray-700 text-base transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600">
                Email
              </label>
              <i className="bx bxs-envelope absolute right-0 top-1/2 -translate-y-1/2 text-lg text-gray-500 peer-focus:text-blue-600"></i>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full border-b-2 border-black focus:border-blue-600 bg-transparent outline-none text-base py-2 pr-8"
              />
              <label className="absolute left-0 top-2 text-gray-700 text-base transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600">
                Password
              </label>
              <i className="bx bxs-lock-alt absolute right-0 top-1/2 -translate-y-1/2 text-lg text-gray-500 peer-focus:text-blue-600"></i>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-black text-white rounded-full font-semibold hover:shadow-md transition disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-black text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right: Info Section */}
        <div className="w-1/2 h-full bg-black text-white flex flex-col justify-center px-10 text-right">
          <h2 className="text-3xl font-bold uppercase leading-snug mb-2">
            DevPort Welcome Back!
          </h2>
          <p className="text-base">where users dock their portfolios.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
