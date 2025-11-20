"use client";

import React, { useState } from "react";
import {
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface Achievement {
  title: string;
  description: string;
  year: string;
  image?: string;
}

interface AchievementsFormProps {
  achievements?: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

const AchievementsForm: React.FC<AchievementsFormProps> = ({
  achievements = [],
  onChange,
}) => {
  const { upload } = useCloudinaryUpload();
  const [openIndex, setOpenIndex] = useState<number | null>(
    achievements.length > 0 ? 0 : null
  );
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const setAchievements = (updated: Achievement[]) => onChange(updated);

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      { title: "", description: "", year: "", image: "" },
    ]);
    setOpenIndex(achievements.length);
  };

  const updateField = (
    index: number,
    field: keyof Achievement,
    value: any
  ) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    setAchievements(updated);
  };

  const removeAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    setAchievements(updated);

    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(achievements);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setAchievements(items);
    setOpenIndex(result.destination.index);
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
      updateField(index, "image", url);
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setUploadingIndex(null);
    }
  };

  // Shared Styles
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Achievements</h2>

        <button
          type="button"
          onClick={addAchievement}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
         Add Achievement
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="achievements-droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {achievements.map((ach, index) => {
                const isOpen = openIndex === index;
                const isUploading = uploadingIndex === index;

                return (
                  <Draggable
                    key={index}
                    draggableId={`ach-${index}`}
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
                          className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={16} />
                            </span>

                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {ach.title || `Untitled Achievement ${index + 1}`}
                              </div>

                              {ach.year && (
                                <div className="text-xs text-gray-500">
                                  {ach.year}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAchievement(index);
                              }}
                              className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
                            >
                              <Trash2 size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenIndex(isOpen ? null : index);
                              }}
                              className="text-gray-600 p-1 rounded-full"
                            >
                              {isOpen ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Body */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="p-4 space-y-5 border-t bg-white"
                            >
                              
                              {/* --- Image Upload Section --- */}
                              <div>
                                <span className={labelClass}>Proof / Certificate Image</span>
                                <div className="group relative">
                                    <input
                                        id={`ach-img-${index}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(index, e)}
                                        className="hidden"
                                    />

                                    <label
                                        htmlFor={`ach-img-${index}`}
                                        className={`relative w-full h-48 rounded-xl overflow-hidden border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                                        ${ach.image ? "border-transparent shadow-sm" : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50"}`}
                                    >
                                        {ach.image ? (
                                            <>
                                                <img 
                                                    src={ach.image} 
                                                    alt="Achievement Proof" 
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
                                                    <ImageIcon size={32} className="mb-2 opacity-50" />
                                                )}
                                                <span className="text-sm font-medium">{isUploading ? "Uploading..." : "Upload Image"}</span>
                                            </div>
                                        )}
                                    </label>

                                    {/* Remove Button */}
                                    {ach.image && !isUploading && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                updateField(index, "image", "");
                                            }}
                                            className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-100 hover:bg-red-50 transition-colors z-10"
                                            title="Remove image"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                              </div>

                              {/* --- Fields --- */}
                              <div className="space-y-4">
                                <div>
                                  <label className={labelClass}>Achievement Title</label>
                                  <input
                                    type="text"
                                    value={ach.title}
                                    onChange={(e) =>
                                      updateField(index, "title", e.target.value)
                                    }
                                    placeholder="e.g. National Hackathon Winner"
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>Description</label>
                                  <textarea
                                    value={ach.description}
                                    onChange={(e) =>
                                      updateField(index, "description", e.target.value)
                                    }
                                    rows={3}
                                    placeholder="Briefly describe the achievement..."
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>Year / Date</label>
                                  <input
                                    type="text"
                                    value={ach.year}
                                    onChange={(e) =>
                                      updateField(index, "year", e.target.value)
                                    }
                                    placeholder="e.g. 2024"
                                    className={inputClass}
                                  />
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

      {/* TIPS */}
      <div className="text-xs text-gray-500">
        Tip: Use clear, measurable <strong>Achievements</strong> such as
        “<strong>Solved 100+ LeetCode problems</strong>”,
        “<strong>Won 1st prize in a Hackathon</strong>”, or
        “<strong>Published a research paper</strong>”. Upload a photo of your certificate or award if available.
      </div>
    </div>
  );
};

export default AchievementsForm;