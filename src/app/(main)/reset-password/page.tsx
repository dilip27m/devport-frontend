"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);

    try {
      const message = await resetPassword({ email, resetCode, password });
      setSuccess(message + " Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-20 min-h-[calc(100vh-80px)] items-center justify-center bg-white font-sans px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Set New Password
        </h2>
        
        {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center mb-4">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 text-sm p-3 rounded-md text-center mb-4">{success}</p>}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input type="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm"/>
            </div>
            <div>
              <input type="text" placeholder="6-Digit Code from Email" value={resetCode} onChange={(e) => setResetCode(e.target.value)} required className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm"/>
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm"/>
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div>
              <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm"/>
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-3xl py-2.5 font-medium border bg-black text-white hover:bg-white hover:text-black transition-all disabled:bg-gray-400">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
        
        {success && (
          <div className="text-center">
             <Link href="/login" className="text-black font-semibold hover:underline">
              Proceed to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;