"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const DeleteAccount = () => {
  // Add state for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the deleteAccount function from our context
  const { deleteAccount } = useAuth();

  const handleDelete = async () => {
    setError(""); // Clear previous errors

    // The confirmation prompt is a crucial UX step
    const confirmDelete = window.confirm(
      "Are you absolutely sure you want to delete your account?\n\nThis will permanently erase all your user and portfolio data. This action cannot be undone."
    );

    if (confirmDelete) {
      setLoading(true);
      try {
        // Call the context function to delete the account
        await deleteAccount();
        // If successful, the context's logoutUser will handle the redirect.
        // We don't need to do anything else here.
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred. Please try again.");
        setLoading(false); // Stop loading only if there's an error
      }
    }
  };

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
      <p className="mt-1 text-sm leading-5 text-red-800">
        Deleting your account will permanently remove all of your data, including your portfolio. This action is irreversible.
      </p>
      
      {/* Display an error message if the deletion fails */}
      {error && <p className="mt-4 text-sm text-red-600 font-bold">{error}</p>}

      <div className="mt-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300 disabled:cursor-not-allowed"
        >
          {loading ? "Deleting Account..." : "Delete My Account"}
        </button>
      </div>
    </section>
  );
};

export default DeleteAccount;