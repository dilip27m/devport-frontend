"use client";

import React, { useState } from "react";
import Link from "next/link";
// 1. Import the useAuth hook
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Get the registerUser function from our context
  const { registerUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      // 3. Call the registerUser function from the context
      await registerUser({ name, username, email, password });
      
      // If registration is successful, the context will automatically redirect
      // to the /editor page. We don't need to do anything else here.

    } catch (err: any) {
      // 4. If an error is thrown, display it to the user
      setError(err.message || "An unexpected error occurred.");
      setLoading(false); // Stop the loading indicator
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your DevPort Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* This will now display backend errors */}
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-center">{error}</p>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., dilip-k (letters, numbers, hyphens)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Min. 6 characters"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;