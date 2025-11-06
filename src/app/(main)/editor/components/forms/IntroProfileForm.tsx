"use client";

import React from "react";
import { User, FileText, ImagePlus } from "lucide-react";

interface IntroProfileFormProps {
  data: {
    greeting: string;
    name: string;
    role: string;
    bio: string;
    photo: string;
    resume: string;
    aboutMe: string;
  };
  onChange: (field: string, value: any) => void;
}

const IntroProfileForm: React.FC<IntroProfileFormProps> = ({ data, onChange }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange("photo", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange("resume", file.name);
  };

  return (
    <div className="space-y-6 text-sm text-gray-700 animate-fade-in">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <User size={18} className="text-blue-600" />
        Intro & Profile
      </h2>

      <div className="space-y-1">
        <label className="block font-medium">Greeting</label>
        <input
          type="text"
          value={data.greeting ?? ""}
          onChange={(e) => onChange("greeting", e.target.value)}
          placeholder="e.g. Hey there! I'm"
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={data.name ?? ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g. Krishna"
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block font-medium">Role</label>
        <input
          type="text"
          value={data.role ?? ""}
          onChange={(e) => onChange("role", e.target.value)}
          placeholder="e.g. Full Stack Developer"
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block font-medium">Bio</label>
        <textarea
          value={data.bio ?? ""}
          onChange={(e) => onChange("bio", e.target.value)}
          placeholder="Write a short overview about yourself..."
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </div>

      <div className="space-y-1">
        <label className="block font-medium">About Me</label>
        <textarea
          value={data.aboutMe ?? ""}
          onChange={(e) => onChange("aboutMe", e.target.value)}
          placeholder="Write a detailed About Me section..."
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 font-medium">
          <ImagePlus size={16} className="text-blue-500" />
          Profile Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {data.photo && (
          <div className="flex justify-center mt-3">
            <img
              src={data.photo}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border shadow-md transition-transform hover:scale-105"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 font-medium">
          <FileText size={16} className="text-blue-500" />
          Résumé (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {data.resume && (
          <p className="text-sm text-green-600 mt-1">
            Uploaded: <span className="font-medium">{data.resume}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default IntroProfileForm;
