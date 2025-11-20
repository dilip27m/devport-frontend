"use client";

import React, { useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
  Plus,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  links: ProjectLink[];
  image?: string;
  startDate?: string;
  endDate?: string;
  stack?: string[];
  techStack?: string;
  type?: string;
}

export interface ProjectsFormProps {
  projects: Project[] | undefined;
  onChange: (projects: Project[]) => void;
}

/* --- Helpers --- */

// 1. THIS WAS MISSING BEFORE - FIXED NOW
const normalizeGithubUsername = (raw: string) => {
  const v = raw.trim();
  if (!v) return "";
  // If it starts with http, assume it's a full link
  if (v.startsWith("http")) return v;
  // If it starts with github.com, add https://
  if (v.startsWith("github.com")) return `https://${v}`;
  // Otherwise, assume it's 'user/repo' and add the prefix
  return `https://github.com/${v}`;
};

const ConfirmBox: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-[92%] sm:w-[420px] bg-white rounded-xl p-4 shadow-lg"
    >
      <p className="text-sm text-gray-800 mb-4">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-1 rounded-full text-sm bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </div>
);

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const computeDuration = (start?: string, end?: string) => {
  if (!start) return "";
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";

  const years = e.getFullYear() - s.getFullYear();
  const months = e.getMonth() - s.getMonth();
  let total = years * 12 + months;
  if (e.getDate() - s.getDate() < 0) total -= 1;
  if (total < 0) total = 0;

  if (total < 1) return "<1 month";
  if (total < 12) return `${total} month${total > 1 ? "s" : ""}`;
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo${m > 1 ? "s" : ""}`;
};

/* --- Component --- */

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const { upload } = useCloudinaryUpload();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    safeProjects.length > 0 ? 0 : null
  );
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const setProjects = (updated: Project[]) => onChange(updated);

  const addProject = () => {
    setProjects([
      ...safeProjects,
      {
        title: "",
        description: "",
        links: [],
        image: "",
        startDate: "",
        endDate: "",
        stack: [],
        techStack: "",
        type: "",
      },
    ]);
    setExpandedIndex(safeProjects.length);
  };

  const removeProject = (index: number) => {
    const updated = safeProjects.filter((_, i) => i !== index);
    setProjects(updated);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...safeProjects];
    (updated[index] as any)[field] = value;
    setProjects(updated);
  };

  const updateStack = (index: number, raw: string) => {
    const updated = [...safeProjects];
    updated[index].techStack = raw;
    updated[index].stack = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setProjects(updated);
  };

  const handleImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingIndex(index);
      const url = await upload(file);
      updateProject(index, "image", url);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = [...safeProjects];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setProjects(reordered);
  };

  const stackPreview = (p: Project) => {
    const arr = p.stack?.length
      ? p.stack
      : p.techStack
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [];
    if (!arr.length) return null;
    return arr.length <= 2
      ? arr.join(", ")
      : `${arr.slice(0, 2).join(", ")} +${arr.length - 2}`;
  };

  const stackToString = (p: Project) =>
    p.techStack && p.techStack.trim() !== ""
      ? p.techStack
      : (p.stack || []).join(", ");

  // Reusable Styles
  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
  const labelClass =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects-droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {safeProjects.map((project, index) => {
                const isExpanded = expandedIndex === index;
                const isUploading = uploadingIndex === index;
                const dateError =
                  project.startDate &&
                  project.endDate &&
                  project.endDate < project.startDate;
                
                const ghLink = project.links.find(
                  (l) => l.label === "GitHub"
                ) || { label: "GitHub", url: "" };
                const otLink = project.links.find(
                  (l) => l.label === "Others"
                ) || { label: "Others", url: "" };

                const friendlyDates = project.startDate
                  ? `${formatDate(project.startDate)} → ${
                      formatDate(project.endDate) || "Present"
                    }`
                  : "";
                const duration = computeDuration(
                  project.startDate,
                  project.endDate
                );

                return (
                  <Draggable
                    key={index}
                    draggableId={`project-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-xl bg-white shadow-sm overflow-hidden transition ${
                          snapshot.isDragging ? "ring-2 ring-blue-200" : ""
                        }`}
                      >
                        {/* Header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : index)
                          }
                        >
                          <div className="flex items-center space-x-2 min-w-0">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={16} />
                            </span>
                            <div className="min-w-0">
                              <div className="font-medium text-sm text-gray-900 truncate">
                                {project.title ||
                                  `Untitled Project ${index + 1}`}
                              </div>
                              {(stackPreview(project) || friendlyDates) && (
                                <div className="text-xs text-gray-500 truncate">
                                  {stackPreview(project)}
                                  {friendlyDates
                                    ? ` · ${friendlyDates}`
                                    : ""}{" "}
                                  {duration ? `(${duration})` : ""}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmIndex(index);
                                setShowConfirm(true);
                              }}
                              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                            >
                              <Trash2 size={16} />
                            </button>
                            <div className="text-gray-400">
                                {isExpanded ? (
                                  <ChevronUp size={18} />
                                ) : (
                                  <ChevronDown size={18} />
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="p-4 border-t bg-white space-y-5"
                            >
                              {/* 1. Image Section */}
                              <div>
                                <span className={labelClass}>
                                  Project Cover Image
                                </span>
                                <div className="group relative">
                                  <input
                                    id={`proj-img-${index}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="hidden"
                                  />

                                  <label
                                    htmlFor={`proj-img-${index}`}
                                    className={`relative w-full h-48 rounded-xl overflow-hidden border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                                    ${
                                      project.image
                                        ? "border-transparent shadow-sm"
                                        : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50"
                                    }`}
                                  >
                                    {project.image ? (
                                      <>
                                        <img
                                          src={project.image}
                                          alt="Preview"
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm">
                                          Change Image
                                        </div>
                                      </>
                                    ) : (
                                      <div className="text-gray-400 flex flex-col items-center">
                                        {isUploading ? (
                                          <span className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                                        ) : (
                                          <ImageIcon
                                            size={32}
                                            className="mb-2 opacity-50"
                                          />
                                        )}
                                        <span className="text-sm font-medium">
                                          {isUploading
                                            ? "Uploading..."
                                            : "Upload Cover Image"}
                                        </span>
                                      </div>
                                    )}
                                  </label>

                                  {project.image && !isUploading && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateProject(index, "image", "");
                                      }}
                                      className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-100 hover:bg-red-50 transition-colors z-10"
                                      title="Remove image"
                                    >
                                      <X size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* 2. Form Fields Section */}
                              <div className="space-y-4">
                                <div>
                                  <label className={labelClass}>
                                    Project Title
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. E-commerce Dashboard"
                                    value={project.title}
                                    onChange={(e) =>
                                      updateProject(index, "title", e.target.value)
                                    }
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>
                                    Description
                                  </label>
                                  <textarea
                                    placeholder="Briefly describe the project features and impact..."
                                    value={project.description}
                                    onChange={(e) =>
                                      updateProject(
                                        index,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                    className={inputClass}
                                    rows={3}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>
                                    Project Type
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Web App, Mobile, AI Model"
                                    value={project.type ?? ""}
                                    onChange={(e) =>
                                      updateProject(index, "type", e.target.value)
                                    }
                                    className={inputClass}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className={labelClass}>
                                      Start Date
                                    </label>
                                    <input
                                      type="date"
                                      value={project.startDate ?? ""}
                                      onChange={(e) =>
                                        updateProject(
                                          index,
                                          "startDate",
                                          e.target.value
                                        )
                                      }
                                      className={`${inputClass} ${
                                        dateError
                                          ? "border-red-400 focus:ring-red-200"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                  <div>
                                    <label className={labelClass}>
                                      End Date
                                    </label>
                                    <input
                                      type="date"
                                      value={project.endDate ?? ""}
                                      onChange={(e) =>
                                        updateProject(
                                          index,
                                          "endDate",
                                          e.target.value
                                        )
                                      }
                                      className={`${inputClass} ${
                                        dateError
                                          ? "border-red-400 focus:ring-red-200"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </div>
                                {dateError && (
                                  <p className="text-red-500 text-xs">
                                    End date cannot be earlier than start date.
                                  </p>
                                )}

                                <div>
                                  <label className={labelClass}>
                                    Tech Stack (comma separated)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="React, Node.js, MongoDB"
                                    value={stackToString(project)}
                                    onChange={(e) =>
                                      updateStack(index, e.target.value)
                                    }
                                    className={inputClass}
                                  />
                                  {project.stack && project.stack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {project.stack.map((t, i) => (
                                        <span
                                          key={i}
                                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md font-medium border border-blue-100"
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className={labelClass}>
                                        GitHub Link
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="username/repo"
                                        value={ghLink.url}
                                        onChange={(e) => {
                                          const newLinks = project.links.filter(
                                            (l) => l.label !== "GitHub"
                                          );
                                          updateProject(index, "links", [
                                            ...newLinks,
                                            { label: "GitHub", url: e.target.value },
                                          ]);
                                        }}
                                        onBlur={(e) => {
                                            const newLinks = project.links.filter(
                                              (l) => l.label !== "GitHub"
                                            );
                                            updateProject(index, "links", [
                                              ...newLinks,
                                              { 
                                                  label: "GitHub", 
                                                  url: normalizeGithubUsername(e.target.value) 
                                              },
                                            ]);
                                        }}
                                        className={inputClass}
                                      />
                                    </div>

                                    <div>
                                      <label className={labelClass}>
                                        Live/Other Link
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="https://myproject.com"
                                        value={otLink.url}
                                        onChange={(e) => {
                                          const newLinks = project.links.filter(
                                            (l) => l.label !== "Others"
                                          );
                                          updateProject(index, "links", [
                                            ...newLinks,
                                            { label: "Others", url: e.target.value },
                                          ]);
                                        }}
                                        className={inputClass}
                                      />
                                    </div>
                                </div>
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
            <div className="text-xs text-gray-500">
        Tip: After entering the username/repo once click some where in that form and then click save ,it shows full link.
      </div>

      {showConfirm && confirmIndex !== null && (
        <ConfirmBox
          message="Are you sure you want to delete this project?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            removeProject(confirmIndex);
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectsForm;