"use client";

import React, { useState } from "react";
import { User, X } from "lucide-react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface AboutMeFormProps {
  data: {
    greeting: string;
    name: string;
    role: string;
    bio: string;
    photo: string;
    aboutMe: string;
  };
  onChange: (field: string, value: any) => void;
}

const AboutMeForm: React.FC<AboutMeFormProps> = ({ data, onChange }) => {
  const { upload } = useCloudinaryUpload();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Prevent crash when `data` is undefined or partially missing
  const safe = {
    greeting: data?.greeting ?? "",
    name: data?.name ?? "",
    role: data?.role ?? "",
    bio: data?.bio ?? "",
    photo: data?.photo ?? "",
    aboutMe: data?.aboutMe ?? "",
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);

      const url = await upload(file);
      onChange("photo", url);

      // Prevent 413 error
      e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Photo upload failed.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  return (
    <div className="space-y-6 text-sm text-gray-700">
      {/* SECTION HEADER */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <User size={18} className="text-blue-600" />
        About Me
      </h2>

      {/* PROFILE PHOTO */}
      <div className="space-y-2">
        <label className="block font-medium">Profile Photo</label>

        <input
          key={safe.photo}  // 🔥 safe — never undefined
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="block w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3
                     file:rounded-full file:border file:border-gray-300
                     file:bg-white file:text-gray-800 hover:file:bg-gray-100"
        />

        {uploadingPhoto && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
            Uploading...
          </div>
        )}

        {safe.photo && !uploadingPhoto && (
          <div className="flex items-center gap-4 mt-3">
            <img
              src={safe.photo}
              alt="Profile"
              className="w-24 h-24 rounded-md object-cover border shadow-sm"
            />

            <button
              type="button"
              onClick={() => onChange("photo", "")}
              className="px-3 py-1.5 text-sm text-red-600 border border-gray-300 rounded-full 
                         hover:bg-red-50 transition shadow-sm inline-flex items-center gap-1"
            >
              <X size={14} />
              Remove
            </button>
          </div>
        )}
      </div>

      {/* GREETING */}
      <div className="space-y-1">
        <label className="block font-medium">Greeting</label>
        <input
          type="text"
          value={safe.greeting}
          onChange={(e) => onChange("greeting", e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-800 
                     focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* NAME */}
      <div className="space-y-1">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={safe.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-800 
                     focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ROLE */}
      <div className="space-y-1">
        <label className="block font-medium">Role</label>
        <input
          type="text"
          value={safe.role}
          onChange={(e) => onChange("role", e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-800 
                     focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* BIO */}
      <div className="space-y-1">
        <label className="block font-medium">Bio</label>
        <textarea
          value={safe.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-800 
                     focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ABOUT ME */}
      <div className="space-y-1">
        <label className="block font-medium">About Me</label>
        <textarea
          value={safe.aboutMe}
          onChange={(e) => onChange("aboutMe", e.target.value)}
          rows={5}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-800 
                     focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="text-xs text-gray-500">
        Tip: Your <strong>Greeting</strong> appears before your name  
        (e.g., “Hey there! I’m”). Keep the <strong>Name</strong> & 
        <strong>Role</strong> short. Write a short <strong>Bio</strong> 
        for quick intro and a detailed <strong>About Me</strong> section 
        for your journey. Upload a clean, professional <strong>Profile Photo</strong>.
      </div>
    </div>
  );
};

export default AboutMeForm;
