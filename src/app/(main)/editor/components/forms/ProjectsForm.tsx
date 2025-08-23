"use client";

import React from "react";

export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const addProject = () => {
    onChange([...projects, { title: "", description: "", link: "" }]);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
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
        <div key={index} className="border rounded p-3 space-y-2 bg-white shadow-sm">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => updateProject(index, "title", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => updateProject(index, "description", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Project Link (GitHub/Live)"
            value={project.link}
            onChange={(e) => updateProject(index, "link", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => removeProject(index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
