"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const { registerUser, sendOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState<"form" | "otp">("form");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const [error, setError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false); 
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateUsername = (value: string) => {
    if (value.length < 3) return "Username must be at least 3 characters.";
    if (value.length > 20) return "Username cannot exceed 20 characters.";
    if (!/^[a-z0-9-]+$/.test(value))
      return "Only letters, numbers, and hyphens allowed.";
    return "";
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Enter a valid email address.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  useEffect(() => {
    if (step === "otp") {
      const input = document.getElementById("otp-input");
      input && (input as HTMLInputElement).focus();
    }
  }, [step]);

  const handleSendOtp = async (e: React.FormEvent) => {
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

    setOtpLoading(true);

    try {
      await sendOtp(email);
      setStep("otp");
      setTimer(60);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    }

    setOtpLoading(false);
  };

  const handleResendOtp = async () => {
    if (!email) return;
    setError("");
    setOtp("");
    setOtpLoading(true);

    try {
      await sendOtp(email);
      setTimer(60);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    }

    setOtpLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setVerifyLoading(true);

    try {
      await verifyOtp(email, otp);
      await registerUser({ name, username, email, password });
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    }

    setVerifyLoading(false);
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

        {/* ==============================  
             STEP 1: USER FORM
        ============================== */}
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500"
            />

            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  setUsername(val);
                  setFieldErrors((prev) => ({
                    ...prev,
                    username: validateUsername(val),
                  }));
                }}
                className={`w-full rounded-3xl border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 ${
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

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => {
                  const val = e.target.value;
                  setEmail(val);
                  setFieldErrors((prev) => ({
                    ...prev,
                    email: validateEmail(val),
                  }));
                }}
                className={`w-full rounded-3xl border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500${
                  fieldErrors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-gray-800"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);

                    // trigger validation + show error
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: validatePassword(val),
                    }));
                  }}
                  className={`w-full rounded-3xl border px-4 py-3 pr-10 text-sm text-gray-900 placeholder:text-gray-500 ${
                    fieldErrors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-gray-800"
                  }`}
                />

                {/* Eye icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-900 hover:text-gray-800"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>

                {/* Password error display */}
                {fieldErrors.password && (
                  <p className="text-red-600 text-xs mt-1">{fieldErrors.password}</p>
                )}
              </div>


            <button
              type="submit"
              disabled={otpLoading}
              className={`w-full rounded-3xl py-2.5 font-medium border ${
                otpLoading
                  ? "bg-gray-400 text-white"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
              }`}
            >
              {otpLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* ==============================  
             STEP 2: OTP INPUT UI
        ============================== */}
        {step === "otp" && (
          <div className="space-y-5">
            <p className="text-center text-gray-900 text-sm">
              We sent a 6-digit verification code to:
              <br />
              <span className="font-semibold">{email}</span>
            </p>

            {/* SIMPLE OTP INPUT */}
            <input
              id="otp-input"
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setOtp(val);
              }}
              className="w-full rounded-3xl border border-gray-300 px-4 py-3 text-center text-lg tracking-widest text-gray-900 placeholder:text-gray-500"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={verifyLoading}
              className={`w-full rounded-3xl py-2.5 font-medium border ${
                verifyLoading
                  ? "bg-gray-400 text-white"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
              }`}
            >
              {verifyLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="flex items-center justify-between text-sm mt-2">
              {timer > 0 ? (
                <span className="text-gray-600">
                  Resend OTP in <strong>{timer}</strong>s
                </span>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={otpLoading}
                  className="text-gray-800 underline disabled:opacity-60"
                >
                  {otpLoading ? "Resending..." : "Resend OTP"}
                </button>
              )}

              <button
                className="text-gray-800 underline"
                onClick={() => {
                  setStep("form");
                  setError("");
                  setOtp("");
                  setTimer(0);
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}

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
