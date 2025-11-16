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

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { registerUser } = useAuth();

  // Validate username
  const validateUsername = (value: string) => {
    if (value.length < 3) return "Username must be at least 3 characters.";
    if (value.length > 20) return "Username cannot exceed 20 characters.";
    if (!/^[a-z0-9-]+$/.test(value))
      return "Only letters, numbers, and hyphens allowed.";

    return "";
  };

  // Validate email
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Enter a valid email address.";
    return "";
  };

  // Validate password
  const validatePassword = (value: string) => {
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setFieldErrors({
      username: usernameErr,
      email: emailErr,
      password: passwordErr,
    });

    if (usernameErr || emailErr || passwordErr) return;

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

        {error && (
          <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm"
          />

          {/* USERNAME */}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                const val = e.target.value.toLowerCase();
                setUsername(val);
                setFieldErrors((prev) => ({
                  ...prev,
                  username: validateUsername(val),
                }));
              }}
              required
              className={`w-full rounded-3xl border px-4 py-3 text-sm ${
                fieldErrors.username
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-gray-800"
              }`}
            />
            {fieldErrors.username && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.username}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                setFieldErrors((prev) => ({
                  ...prev,
                  email: validateEmail(val),
                }));
              }}
              required
              className={`w-full rounded-3xl border px-4 py-3 text-sm ${
                fieldErrors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-gray-800"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setFieldErrors((prev) => ({
                    ...prev,
                    password: validatePassword(val),
                  }));
                }}
                required
                className={`peer w-full rounded-3xl border px-4 py-3 pr-10 text-sm ${
                  fieldErrors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-gray-800"
                }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>

            {fieldErrors.password && (
              <p className="text-red-600 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-3xl py-2.5 font-medium border ${
              loading
                ? "bg-gray-400 text-white"
                : "bg-black text-white border-black hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-semibold hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;