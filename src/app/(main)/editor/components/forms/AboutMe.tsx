"use client";

import React, { useState } from "react";
import { User, FileText, ImagePlus } from "lucide-react";
// Import our custom upload hook to handle file uploads securely
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface AboutMeFormProps {
  data: {
    greeting: string;
    name: string;
    role: string;
    bio: string;
    photo: string;   // This will store the Cloudinary URL for the profile photo
    resume: string;  // This will store the Cloudinary URL for the resume PDF
    aboutMe: string;
  };
  onChange: (field: string, value: any) => void;
}

const AboutMeForm: React.FC<AboutMeFormProps> = ({ data, onChange }) => {
  // Use the hook to get the upload function and loading state
  const { upload, isUploading } = useCloudinaryUpload();
  // State to track which specific field is being uploaded (for UI feedback)
  const [uploadingField, setUploadingField] = useState<"photo" | "resume" | null>(null);

  // This function now handles the secure upload to Cloudinary for the photo
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingField("photo"); // Set loading state for the photo field
    try {
      // Use the hook to upload the file
      const imageUrl = await upload(file);
      // On success, update the parent state with the returned Cloudinary URL
      onChange("photo", imageUrl);
    } catch (error) {
      console.error("Photo upload failed:", error);
      alert("Photo upload failed. Please try again.");
    } finally {
      setUploadingField(null); // Clear loading state
    }
  };

  // This function now handles the secure upload to Cloudinary for the resume
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingField("resume"); // Set loading state for the resume field
    try {
      // We use the exact same hook for the PDF file
      const resumeUrl = await upload(file);
      // On success, update the parent state with the returned Cloudinary URL
      onChange("resume", resumeUrl);
    } catch (error) {
      console.error("Resume upload failed:", error);
      alert("Resume upload failed. Please try again.");
    } finally {
      setUploadingField(null); // Clear loading state
    }
  };

  return (
    <div className="space-y-6 text-sm text-gray-700 animate-fade-in">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <User size={18} className="text-blue-600" />
        About Me
      </h2>

      {/* --- Text Input Fields (Unchanged) --- */}
      <div className="space-y-1">
        <label className="block font-medium">Greeting</label>
        <input type="text" value={data.greeting ?? ""} onChange={(e) => onChange("greeting", e.target.value)} placeholder="e.g. Hey there! I'm" className="w-full border rounded-md px-3 py-2 ..."/>
      </div>
      <div className="space-y-1">
        <label className="block font-medium">Name</label>
        <input type="text" value={data.name ?? ""} onChange={(e) => onChange("name", e.target.value)} placeholder="e.g. Krishna" className="w-full border rounded-md px-3 py-2 ..."/>
      </div>
      <div className="space-y-1">
        <label className="block font-medium">Role</label>
        <input type="text" value={data.role ?? ""} onChange={(e) => onChange("role", e.target.value)} placeholder="e.g. Full Stack Developer" className="w-full border rounded-md px-3 py-2 ..."/>
      </div>
      <div className="space-y-1">
        <label className="block font-medium">Bio</label>
        <textarea value={data.bio ?? ""} onChange={(e) => onChange("bio", e.target.value)} placeholder="Write a short overview about yourself..." className="w-full border rounded-md px-3 py-2 ..." rows={4}/>
      </div>
      <div className="space-y-1">
        <label className="block font-medium">About Me</label>
        <textarea value={data.aboutMe ?? ""} onChange={(e) => onChange("aboutMe", e.target.value)} placeholder="Write a detailed About Me section..." className="w-full border rounded-md px-3 py-2 ..." rows={5}/>
      </div>

      {/* --- Updated Profile Photo Upload Section --- */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 font-medium">
          <ImagePlus size={16} className="text-blue-500" />
          Profile Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
          className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
        {isUploading && uploadingField === 'photo' && <p className="text-sm text-gray-500">Uploading photo...</p>}
        {data.photo && (
          <div className="flex justify-center mt-3">
            <img src={data.photo} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border shadow-md"/>
          </div>
        )}
      </div>

      {/* --- Updated Résumé Upload Section --- */}
      {/* <div className="space-y-2">
        <label className="flex items-center gap-2 font-medium">
          <FileText size={16} className="text-blue-500" />
          Résumé (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          disabled={isUploading}
          className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
        {isUploading && uploadingField === 'resume' && <p className="text-sm text-gray-500">Uploading résumé...</p>}
        {data.resume && (
          <a href={data.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 mt-1 hover:underline font-medium">
            View Uploaded Résumé
          </a>
        )}
      </div> */}
    </div>
  );
};

export default AboutMeForm;