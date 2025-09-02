"use client";

import React from "react";

const DeleteAccount = () => {
  const handleDelete = () => {
    // We will add a confirmation prompt before calling the API
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...");
    }
  };

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-red-800">Danger Zone</h2>
      <p className="text-red-700 mb-4">
        Deleting your account will permanently remove all of your data, including your portfolio. This action is irreversible.
      </p>
      <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;