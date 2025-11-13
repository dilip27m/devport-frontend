"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { updatePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const message = await updatePassword({ currentPassword, newPassword });
      setSuccess(message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-2">
        <h2 className="text-base font-semibold text-neutral-900">Change Password</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Keep your account secure with a strong password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1">
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            {success}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200 focus:outline-none"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200 focus:outline-none"
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200 focus:outline-none"
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-1">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1 disabled:opacity-60 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;