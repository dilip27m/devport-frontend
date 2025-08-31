"use client";

import React, { useRef, useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { SiVercel, SiNetlify } from "react-icons/si";

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addProject = () => {
    onChange([...projects, { title: "", description: "", link: "", image: "" }]);
    setExpandedIndex(projects.length);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
    setExpandedIndex(null);
  };

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(projects);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onChange(reordered);
  };

  // Detect link type → return correct icon
  const getLinkIcon = (link: string) => {
    if (!link) return null;
    if (link.includes("github.com")) return <FaGithub className="text-gray-700" size={18} />;
    if (link.includes("linkedin.com")) return <FaLinkedin className="text-blue-600" size={18} />;
    if (link.includes("vercel.app")) return <SiVercel className="text-black" size={18} />;
    if (link.includes("netlify.app")) return <SiNetlify className="text-green-600" size={18} />;
    return <FaGlobe className="text-gray-500" size={18} />;
  };

  return (
    <div className="space-y-4 h-[70vh] overflow-y-auto pr-2">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="bg-green-500 text-white px-3 py-1 rounded-md shadow hover:bg-green-600 transition"
        >
          + Add Project
        </button>
      </div>

      {/* Projects with DragDrop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {projects.map((project, index) => {
                const isExpanded = expandedIndex === index;

                return (
                  <Draggable key={index} draggableId={`project-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="border rounded-xl bg-white shadow-md overflow-hidden"
                      >
                        {/* Accordion Header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={18} />
                            </span>
                            <span className="font-semibold text-gray-900">
                              {project.title || `Untitled Project ${index + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeProject(index);
                              }}
                              className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                            >
                              <Trash2 size={16} />
                            </button>
                            {isExpanded ? (
                              <ChevronUp className="text-gray-600" size={18} />
                            ) : (
                              <ChevronDown className="text-gray-600" size={18} />
                            )}
                          </div>
                        </div>

                        {/* Accordion Body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="p-4 space-y-4 border-t bg-gray-50"
                            >
                              {/* Project Image */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Project Image
                                </label>
                                {project.image && (
                                  <img
                                    src={project.image}
                                    alt="Project Preview"
                                    className="w-full h-32 object-cover rounded mb-2 border"
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleUploadButtonClick(index)}
                                  disabled={isUploading && uploadingIndex === index}
                                  className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                  {isUploading && uploadingIndex === index
                                    ? "Uploading..."
                                    : "Upload Image"}
                                </button>
                              </div>

                              {/* Project Title */}
                              <input
                                type="text"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={(e) => updateProject(index, "title", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                              />

                              {/* Project Description */}
                              <textarea
                                placeholder="Project Description"
                                value={project.description}
                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                              />

                              {/* Project Link */}
                              <div className="relative flex items-center">
                                <span className="absolute left-3">
                                  {getLinkIcon(project.link)}
                                </span>
                                <input
                                  type="text"
                                  placeholder="Project Link (GitHub/Live)"
                                  value={project.link}
                                  onChange={(e) => updateProject(index, "link", e.target.value)}
                                  className="w-full border border-gray-300 rounded-md p-2 pl-10 pr-10 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                />
                                {project.link && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute right-3 text-gray-500 hover:text-blue-600"
                                  >
                                    <ExternalLink size={18} />
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ProjectsForm;
