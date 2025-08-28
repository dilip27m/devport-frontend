"use client";

import React, { useRef, useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface Project {
  title: string;
  description: string;
  link: string;
  image?: string;
}

export interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const { upload, isUploading } = useCloudinaryUpload();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- THIS IS THE FIX ---
  // We need to provide the full, correct logic for these functions.

  const addProject = () => {
    // When adding a new project, ensure it matches the FULL Project interface.
    onChange([...projects, { title: "", description: "", link: "", image: "" }]);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    // This casting is a safe way to handle dynamic field updates in TypeScript.
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };
  // -----------------------

  const handleUploadButtonClick = (index: number) => {
    setUploadingIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || uploadingIndex === null) return;

    try {
      const imageUrl = await upload(file);
      updateProject(uploadingIndex, "image", imageUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingIndex(null);
    }
  };

  // I've also replaced the "..." in your className props with the full styles
  // to ensure everything looks correct.
  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          + Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="border rounded p-3 space-y-3 bg-white shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
            {project.image && (
              <div className="mb-2">
                <img src={project.image} alt="Project Preview" className="w-full h-32 object-cover rounded" />
              </div>
            )}
            <button
              type="button"
              onClick={() => handleUploadButtonClick(index)}
              disabled={isUploading && uploadingIndex === index}
              className="w-full bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {(isUploading && uploadingIndex === index) ? "Uploading..." : "Upload Image"}
            </button>
          </div>
          
          <input type="text" placeholder="Project Title" value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400" />
          <textarea placeholder="Project Description" value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400" />
          <input type="text" placeholder="Project Link (GitHub/Live)" value={project.link} onChange={(e) => updateProject(index, "link", e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400" />
          <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700">✕ Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;