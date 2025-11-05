"use client";

import React, { useState } from "react";
// 1. Import the useAuth hook
import { useAuth } from "@/context/AuthContext";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 2. Add state for success and error messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 3. Get the updatePassword function from our context
  const { updatePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
      
  if (newPassword.length < 6) {
    setError("New password must be at least 6 characters long.");
    return; // Stop the function before the API call
  }
    
    // Basic validation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    
    setLoading(true);

    try {
      // 4. Call the context function with the form data
      const message = await updatePassword({ currentPassword, newPassword });
      setSuccess(message); // On success, show the success message

      // Clear the form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err: any) {
      // On failure, show the error message from the backend
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 5. Display success or error messages */}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-md text-center">{success}</p>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;