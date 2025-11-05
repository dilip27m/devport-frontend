"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const { registerUser } = useAuth();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, username, email, password });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  

  return (
    <div className="flex pt-20 min-h-[calc(100vh-80px)] items-center justify-center bg-white font-sans px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
         Create Your Account
        </h2>
        
          <p className="mt-4 text-center text-sm text-gray-600 italic mb-4">
            Your journey starts here. Build, share, and shine.
          </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 ease-in-out"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            required
            className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 ease-in-out"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 ease-in-out"
          />

<div className="relative group">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="peer w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 ease-in-out"
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-800 transition-opacity opacity-0 peer-focus:opacity-100 group-hover:opacity-100"
    title={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
  </span>
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;