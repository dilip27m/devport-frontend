"use client";

import React, { useState } from "react";
import { User, FileText, ImagePlus } from "lucide-react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface AboutMeFormProps {
  data: {
    greeting: string;
    name: string;
    role: string;
    bio: string;
    photo: string;   // should hold public URL after upload
    resume: string;  // should hold public URL after upload
    aboutMe: string;
  };
  onChange: (field: string, value: any) => void;
}

const AboutMeForm: React.FC<AboutMeFormProps> = ({ data, onChange }) => {
  const { upload } = useCloudinaryUpload();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // optional: validate file type/size here
    try {
      setUploadingPhoto(true);
      const imageUrl = await upload(file); // same as ProjectsForm
      onChange("photo", imageUrl);
    } catch (err) {
      console.error("Profile photo upload failed", err);
      alert("Profile photo upload failed. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ensure PDF
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file for the résumé.");
      return;
    }

    try {
      setUploadingResume(true);
      const resumeUrl = await upload(file); // upload pdf to cloudinary (or other)
      onChange("resume", resumeUrl);
    } catch (err) {
      console.error("Resume upload failed", err);
      alert("Résumé upload failed. Please try again.");
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div className="space-y-6 text-sm text-gray-700 animate-fade-in">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <User size={18} className="text-blue-600" />
        About Me
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

        {uploadingPhoto ? (
          <p className="text-sm text-gray-500 mt-2">Uploading photo...</p>
        ) : data.photo ? (
          <div className="flex flex-col items-center mt-3">
            <img
              src={data.photo}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border shadow-md transition-transform hover:scale-105"
            />
            <button
              type="button"
              onClick={() => onChange("photo", "")}
              className="mt-2 text-xs text-red-600"
            >
              Remove photo
            </button>
          </div>
        ) : null}
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

        {uploadingResume ? (
          <p className="text-sm text-gray-500 mt-1">Uploading résumé...</p>
        ) : data.resume ? (
          <p className="text-sm text-green-600 mt-1">
            Uploaded:{" "}
            <a
              href={data.resume}
              className="font-medium underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View résumé
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AboutMeForm;