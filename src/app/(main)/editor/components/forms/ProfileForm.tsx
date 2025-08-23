"use client";

import React from "react";

export interface ProfileFormProps {
  data: {
    name: string;
    bio: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write a short bio"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="example@email.com"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
