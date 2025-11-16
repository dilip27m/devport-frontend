"use client";

import React, { useState } from "react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
  ExternalLink,
  Plus,
  X,
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
  // dates & metadata
  startDate?: string; // yyyy-mm-dd
  endDate?: string;
  stack?: string[]; // stored as array
  type?: string;
}

export interface ProjectsFormProps {
  projects: Project[] | undefined;
  onChange: (projects: Project[]) => void;
}

/** small inline confirm */
const ConfirmBox: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => {
  return (
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
};

/** helper: format date as 'MMM yyyy' */
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

/** helper: compute duration between two dates; returns human friendly like '3 months' or '1 yr 2 mos' */
const computeDuration = (start?: string, end?: string) => {
  if (!start) return "";
  const s = new Date(start);
  const e = end ? new Date(end) : new Date(); // if no end, use now
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";

  // calculate months difference
  const years = e.getFullYear() - s.getFullYear();
  const months = e.getMonth() - s.getMonth();
  let totalMonths = years * 12 + months;

  // adjust by day
  const dayDiff = e.getDate() - s.getDate();
  if (dayDiff < 0) totalMonths -= 1;

  if (totalMonths < 0) totalMonths = 0;

  if (totalMonths < 1) return "<1 month";
  if (totalMonths < 12) return `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo${m > 1 ? "s" : ""}`;
};

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const safeProjects: Project[] = Array.isArray(projects) ? projects : [];
  const { upload } = useCloudinaryUpload();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    safeProjects.length > 0 ? 0 : null
  );

  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const setProjects = (updated: Project[]) => onChange(updated);

  const addProject = () => {
    const newProject: Project = {
      title: "",
      description: "",
      links: [],
      image: "",
      startDate: "",
      endDate: "",
      stack: [],
      type: "",
    };
    setProjects([...safeProjects, newProject]);
    setExpandedIndex(safeProjects.length);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...safeProjects];
    (updated[index] as any)[field] = value;
    setProjects(updated);
  };

  const updateStackFromInput = (index: number, raw: string) => {
    const arr = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    updateProject(index, "stack", arr);
  };

  const stackToString = (stack?: string[]) => (stack || []).join(", ");

  const requestDelete = (index: number) => {
    setConfirmIndex(index);
    setShowConfirm(true);
  };

  const removeProject = (index: number) => {
    const updated = safeProjects.filter((_, i) => i !== index);
    setProjects(updated);
    setExpandedIndex(null);
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingIndex(index);
      const url = await upload(file);
      updateProject(index, "image", url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(safeProjects);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setProjects(reordered);
  };

  const stackPreview = (stack?: string[]) => {
    const s = stack || [];
    if (s.length === 0) return null;
    if (s.length <= 2) return s.join(", ");
    const firstTwo = s.slice(0, 2).join(", ");
    const rest = s.length - 2;
    return `${firstTwo} +${rest}`;
  };

  return (
    <div className="space-y-4 pr-2">
      {/* Header (matches Blogs style) */}
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
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {safeProjects.map((project, index) => {
                const isExpanded = expandedIndex === index;
                const isUploading = uploadingIndex === index;

                // date validation
                const invalidDate =
                  project.startDate && project.endDate && project.endDate < project.startDate;

                const friendlyDates =
                  project.startDate || project.endDate
                    ? `${formatDate(project.startDate) || "—"} → ${formatDate(project.endDate) || "Present"}`
                    : "";

                const duration = project.startDate ? computeDuration(project.startDate, project.endDate) : "";

                return (
                  <Draggable key={index} draggableId={`project-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-xl bg-white shadow-md overflow-hidden transition
                          ${snapshot.isDragging ? "ring-2 ring-blue-200" : ""}`}
                      >
                        {/* header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        >
                          <div className="flex items-center space-x-2 min-w-0">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={18} />
                            </span>
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-900 truncate">
                                {project.title || `Untitled Project ${index + 1}`}
                              </div>

                              {/* stack preview */}
                              {project.stack && project.stack.length > 0 && (
                                <div className="text-xs text-gray-500 truncate">{stackPreview(project.stack)}</div>
                              )}

                              {/* dates + duration */}
                              {friendlyDates && (
                                <div className="text-xs text-gray-500 truncate">
                                  {friendlyDates} {duration ? ` · ${duration}` : ""}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              title="Remove Project"
                              onClick={(e) => {
                                e.stopPropagation();
                                requestDelete(index);
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

                        {/* body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="p-4 space-y-4 border-t bg-white"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* left: image */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>

                                  <input
                                    type="file"
                                    id={`file-input-${index}`}
                                    accept="image/png, image/jpeg, image/gif, image/webp"
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="hidden"
                                  />

                                  {project.image ? (
                                    <img
                                      src={project.image}
                                      alt="Project Preview"
                                      className="w-full h-32 object-cover rounded mb-2 border"
                                    />
                                  ) : (
                                    <div className="w-full h-32 max-w-xs border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-xs text-gray-400 mb-2">
                                      No image
                                    </div>
                                  )}

                                  <div className="flex items-center gap-2 flex-wrap">
                                    <label
                                      htmlFor={`file-input-${index}`}
                                      className={`inline-flex items-center justify-center gap-1
                                        px-4 py-1 text-sm font-medium
                                        bg-white text-gray-700 border border-gray-300
                                        rounded-full cursor-pointer hover:bg-gray-50 transition shadow-sm
                                        ${isUploading ? "opacity-60 cursor-wait" : ""}`}
                                    >
                                      Upload
                                    </label>

                                    {project.image && (
                                      <button
                                        type="button"
                                        onClick={() => updateProject(index, "image", "")}
                                        className="inline-flex items-center justify-center gap-1
                                          px-3 py-1 text-sm font-medium text-red-600
                                          bg-white border border-gray-300 rounded-full cursor-pointer
                                          hover:bg-red-50 transition shadow-sm"
                                      >
                                        <X size={14} /> Remove
                                      </button>
                                    )}
                                  </div>

                                  {/* upload loader area */}
                                  <div className="mt-2 min-h-[18px]">
                                    {isUploading && (
                                      <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
                                        <span>Uploading image...</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* right: form fields */}
                                <div className="md:col-span-2 space-y-3">
                                  {/* Title (label fixed) */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                    <input
                                      type="text"
                                      placeholder="Project Title"
                                      value={project.title}
                                      onChange={(e) => updateProject(index, "title", e.target.value)}
                                      className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                    />
                                  </div>

                                  {/* Description (label fixed) */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                                    <textarea
                                      placeholder="Project Description"
                                      value={project.description}
                                      onChange={(e) => updateProject(index, "description", e.target.value)}
                                      className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                      rows={3}
                                    />
                                  </div>

                                  {/* Project Type above dates */}
                                  
                                    <div >
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                                      <input
                                        type="text"
                                        value={project.type ?? ""}
                                        onChange={(e) => updateProject(index, "type", e.target.value)}
                                        placeholder="e.g. Web, AI, Mobile..."
                                        className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="md:col-span-1">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                      <input
                                        type="date"
                                        value={project.startDate ?? ""}
                                        onChange={(e) => updateProject(index, "startDate", e.target.value)}
                                        className={`w-full border rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2
                                          ${project.endDate && project.startDate && project.startDate > project.endDate
                                            ? "border-red-400 ring-red-200"
                                            : "border-gray-300 focus:ring-blue-400"}`}
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                      <input
                                        type="date"
                                        value={project.endDate ?? ""}
                                        onChange={(e) => updateProject(index, "endDate", e.target.value)}
                                        className={`w-full border rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2
                                          ${project.endDate && project.startDate && project.endDate < project.startDate
                                            ? "border-red-400 ring-red-200"
                                            : "border-gray-300 focus:ring-blue-400"}`}
                                      />
                                    </div>
                                  </div>

                                  {/* validation message */}
                                  {project.startDate &&
                                    project.endDate &&
                                    project.endDate < project.startDate && (
                                      <p className="text-red-500 text-xs mt-1">End date cannot be earlier than start date.</p>
                                    )}

                                  {/* Tech stack input */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma-separated)</label>
                                    <input
                                      type="text"
                                      value={stackToString(project.stack)}
                                      onChange={(e) => updateStackFromInput(index, e.target.value)}
                                      placeholder="React, Node.js, Tailwind"
                                      className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                    />

                                    {/* badges */}
                                    {project.stack && project.stack.length > 0 && (
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {project.stack.map((tech, tI) => (
                                          <span key={tI} className="px-3 py-1 text-xs bg-gray-100 border border-gray-300 rounded-full text-gray-800 shadow-sm">
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* Links - elevated card design integrated */}
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Project Links</label>

                                    {(project.links ?? []).map((link, linkIndex) => (
                                      <div
                                        key={linkIndex}
                                        className="p-3 rounded-xl bg-gray-50 border border-gray-200 shadow-sm"
                                      >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center mb-2">
                                          <div className="flex items-center gap-2 text-gray-700 font-medium">
                                            
                                            <input
                                              type="text"
                                              placeholder="Label (e.g. GitHub, Live)"
                                              value={link.label}
                                              onChange={(e) => {
                                                const updatedLinks = [...(project.links ?? [])];
                                                updatedLinks[linkIndex].label = e.target.value;
                                                updateProject(index, "links", updatedLinks);
                                              }}
                                              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-grey-500 focus:border-transparent w-32"
                                            />
                                          </div>

                                          <div className="flex items-center gap-2">
                                            {link.url && (
                                              <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                                title="Open link"
                                              >
                                                ⧉
                                              </a>
                                            )}

                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updatedLinks = (project.links ?? []).filter(
                                                  (_, i) => i !== linkIndex
                                                );
                                                updateProject(index, "links", updatedLinks);
                                              }}
                                              className="text-red-500 hover:bg-red-100 px-2 py-1 rounded-md"
                                              title="Remove Link"
                                            >
                                              <X size={14} />
                                            </button>
                                          </div>
                                        </div>

                                        {/* URL Field */}
                                        <input
                                          type="text"
                                          placeholder="URL"
                                          value={link.url}
                                          onChange={(e) => {
                                            const updatedLinks = [...(project.links ?? [])];
                                            updatedLinks[linkIndex].url = e.target.value;
                                            updateProject(index, "links", updatedLinks);
                                          }}
                                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        />
                                      </div>
                                    ))}

                                    {/* Add Link Button */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updatedLinks = [
                                              ...(project.links ?? []),
                                              { label: "", url: "" },
                                            ];
                                            updateProject(index, "links", updatedLinks);
                                          }}
                                          className="inline-flex items-center gap-2 px-3 py-1.5 
                                                    text-sm text-gray-800 border border-gray-400 
                                                    rounded-full shadow-sm bg-white
                                                    hover:bg-gray-100 transition"
                                        >
                                          <Plus size={14} /> Add Link
                                        </button>

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
  Tip: Use a clear <strong>Project Title</strong> and select accurate 
  <strong>Start–End</strong> dates (or “Present”). Write your description using the 
  <strong>STAR method</strong> — explain the <strong>Situation</strong>, your <strong>Task</strong>, 
  the <strong>Action</strong> you took, and the <strong>Result</strong> achieved. Add useful 
  links such as your <strong>GitHub repo</strong>, <strong>live website</strong>
  or <strong>README in git</strong> for more project context. Keep your tech stack precise and relevant.
  select correct project image.
  you can rearrange entries by dragging the grip icon.
</div>

{/* 
      <div className="flex justify-center">
        <button
          type="button"
          onClick={addProject}
          className="flex items-center border border-gray-600 text-black px-7 py-2 rounded-3xl shadow hover:bg-black hover:text-white transition"
        >
          Add Project
        </button>
      </div> */}

      {showConfirm && confirmIndex !== null && (
        <ConfirmBox
          message="Are you sure you want to delete this project?"
          onCancel={() => {
            setShowConfirm(false);
            setConfirmIndex(null);
          }}
          onConfirm={() => {
            if (confirmIndex !== null) removeProject(confirmIndex);
            setShowConfirm(false);
            setConfirmIndex(null);
          }}
        />
      )}
    </div>
    
  );
};

export default ProjectsForm;
