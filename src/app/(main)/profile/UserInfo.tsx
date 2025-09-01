"use client";

import React from "react";

// Define a simple type for the user prop
interface User {
  name: string;
  username: string;
  email: string;
}

const UserInfo = ({ user }: { user: User }) => {
  const portfolioUrl = `${window.location.origin}/p/${user.username}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Information</h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-500">Name</label>
          <p className="text-lg text-gray-800">{user.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Username</label>
          <p className="text-lg text-gray-800">{user.username}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-lg text-gray-800">{user.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Public Portfolio URL</label>
          <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-500 hover:underline break-all">
            {portfolioUrl}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;