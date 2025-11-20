"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword, forgotPassword } = useAuth();
  const router = useRouter();

  const canEditPassword = otp.length === 6;

  // Timer
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  // Clear fields if otp incomplete
  useEffect(() => {
    if (otp.length !== 6) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [otp]);

  // Resend OTP
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    try {
      await forgotPassword(email);
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      setTimer(60);
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    }
  };

  // Submit new password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit code first.");
      return;
    }

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
      const msg = await resetPassword({ email, resetCode: otp, password });
      setSuccess(msg + " Redirecting...");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-20 min-h-[calc(100vh-80px)] items-center justify-center bg-white font-sans px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Set New Password
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 text-sm p-3 rounded-md text-center mb-4">
            {success}
          </p>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (prefilled) */}
            <p className="text-gray-700 text-sm font-medium items-center justify-center">
              Resetting password for:{" "}
              <span className="text-gray-900 font-semibold">{email}</span>
            </p>

            {/* SIMPLE OTP INPUT */}
            <input
              id="otp-input"
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setOtp(val);
              }}
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-center text-lg tracking-widest text-gray-900 placeholder:text-gray-500"
            />

            {/* Resend + Back */}
            <div className="flex items-center justify-between text-sm">
              {timer > 0 ? (
                <span className="text-gray-600">
                  Resend code in <strong>{timer}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-black underline font-medium"
                >
                  Resend Code
                </button>
              )}

              <button
                type="button"
                onClick={() => router.back()}
                className="text-gray-800 underline"
              >
                Back
              </button>
            </div>

            {/* PASSWORD FIELDS */}
            <div
              className={`space-y-4 ${
                !canEditPassword ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={canEditPassword}
                  className="w-full rounded-3xl border border-gray-300 px-4 py-3 pr-10 text-sm text-gray-900 placeholder:text-gray-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={canEditPassword}
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !canEditPassword}
              className={`w-full rounded-3xl py-2.5 font-medium border transition-all ${
                loading || !canEditPassword
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {success && (
          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-black font-semibold hover:underline"
            >
              Proceed to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
