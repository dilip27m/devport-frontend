"use client";

import React from "react";

const DeleteAccount = () => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...");
    }
  };

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
      <p className="mt-1 text-sm leading-5 text-red-800">
        Deleting your account will permanently remove all of your data, including your portfolio. This action is irreversible.
      </p>
      <div className="mt-2">
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete My Account
        </button>
      </div>
    </section>
  );
};

export default DeleteAccount;
