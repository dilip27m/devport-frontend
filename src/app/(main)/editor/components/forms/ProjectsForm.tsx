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
}

export interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const { upload } = useCloudinaryUpload();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addProject = () => {
    onChange([
      ...projects,
      { title: "", description: "", links: [], image: "" },
    ]);
    setExpandedIndex(projects.length);
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: any
  ) => {
    const updated = [...projects];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  const removeProject = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
    setExpandedIndex(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(projects);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onChange(reordered);
  };



  return (
    <div className="space-y-4  pr-2">
      {/* Header */}


      {/* Projects with DragDrop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {projects.map((project, index) => {
                const isExpanded = expandedIndex === index;

                return (
                  <Draggable
                    key={index}
                    draggableId={project-${index}}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="border rounded-xl bg-white shadow-md overflow-hidden"
                      >
                        {/* Accordion Header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : index)
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={18} />
                            </span>
                            <span className="font-semibold text-gray-900">
                              {project.title || Untitled Project ${index + 1}}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              title="Remove Project"
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
                              <ChevronDown
                                className="text-gray-600"
                                size={18}
                              />
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
                                <input
                                  type="file"
                                  id={file-input-${index}}
                                  className="hidden"
                                  accept="image/png, image/jpeg, image/gif, image/webp"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    try {
                                      const imageUrl = await upload(file);
                                      updateProject(index, "image", imageUrl);
                                    } catch (error) {
                                      console.error("Upload failed", error);
                                      alert(
                                        "Image upload failed. Please try again."
                                      );
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    document
                                      .getElementById(
                                        file-input-${index}
                                      )
                                      ?.click()
                                  }
                                  className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition text-sm"
                                >
                                  Upload Image
                                </button>
                              </div>

                              {/* Project Title */}
                              <input
                                type="text"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={(e) =>
                                  updateProject(index, "title", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                              />

                              {/* Project Description */}
                              <textarea
                                placeholder="Project Description"
                                value={project.description}
                                onChange={(e) =>
                                  updateProject(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                              />

                              {/* Multiple Project Links */}
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Project Links
                                </label>
                                {(project.links ?? []).map((link, linkIndex) => (
                                  <div
                                    key={linkIndex}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Label (e.g. GitHub, Live)"
                                      value={link.label}
                                      onChange={(e) => {
                                        const updatedLinks = [
                                          ...(project.links ?? []),
                                        ];
                                        updatedLinks[linkIndex].label =
                                          e.target.value;
                                        updateProject(index, "links", updatedLinks);
                                      }}
                                      className="w-1/3 border border-gray-300 rounded-md p-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                    />
                                    <div className="relative flex-1">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        {(link.url)}
                                      </span>
                                      <input
                                        type="text"
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => {
                                          const updatedLinks = [
                                            ...(project.links ?? []),
                                          ];
                                          updatedLinks[linkIndex].url =
                                            e.target.value;
                                          updateProject(
                                            index,
                                            "links",
                                            updatedLinks
                                          );
                                        }}
                                        className="w-full border border-gray-300 rounded-md p-2 pl-10 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                                      />
                                      {link.url && (
                                        <a
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          title={Open ${link.label || 'link'} in new tab}
                                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                        >
                                          <ExternalLink size={18} />
                                        </a>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      title="Remove Link"
                                      onClick={() => {
                                        const updatedLinks = [
                                          ...(project.links ?? []),
                                        ].filter((_, i) => i !== linkIndex);
                                        updateProject(index, "links", updatedLinks);
                                      }}
                                      className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedLinks = [
                                      ...(project.links ?? []),
                                      { label: "", url: "" },
                                    ];
                                    updateProject(index, "links", updatedLinks);
                                  }}
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Plus size={16} className="mr-1" /> Add Link
                                </button>
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
          
      
        <button
          type="button"
          onClick={addProject}
className="flex m-auto items-center border border-gray-600 text-black px-7 py-2 rounded-3xl shadow hover:bg-black hover:text-white transition"        >
          Add Project
        </button>
   
    </div>
  );
};

export default ProjectsForm;