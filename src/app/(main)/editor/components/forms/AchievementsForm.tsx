"use client";

import React, { useState } from "react";
import {
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  ImagePlus,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface Achievement {
  title: string;
  description: string;
  year: string;
  image?: string; // NEW
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
          <Plus size={14} /> Add Achievement
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="achievements-droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
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
                        className={`border rounded-xl bg-white shadow-md overflow-hidden transition ${
                          snapshot.isDragging ? "ring-2 ring-blue-200" : ""
                        }`}
                      >
                        {/* Header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() =>
                            setOpenIndex(isOpen ? null : index)
                          }
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={18} />
                            </span>

                            <div className="min-w-0">
                              <div className="font-semibold text-gray-900 truncate max-w-xs">
                                {ach.title || `Untitled Achievement`}
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
                              className="text-red-500 hover:bg-red-100 p-1 rounded-full"
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
                        {isOpen && (
                          <div className="p-4 space-y-4 border-t bg-white">

                            {/* Image Upload */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Achievement Image
                              </label>

                              <input
                                type="file"
                                id={`ach-img-${index}`}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(index, e)}
                              />

                              {ach.image ? (
                                <img
                                  src={ach.image}
                                  className="w-full h-32 object-cover rounded-lg border mb-2"
                                  alt="Achievement"
                                />
                              ) : (
                                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500 mb-2">
                                  No image uploaded
                                </div>
                              )}

                              <div className="flex gap-2">
                                <label
                                  htmlFor={`ach-img-${index}`}
                                  className={`px-4 py-1 rounded-full border bg-white shadow text-black text-sm cursor-pointer hover:bg-gray-50 ${
                                    isUploading
                                      ? "opacity-60 cursor-wait"
                                      : ""
                                  }`}
                                >
                                  Upload Image
                                </label>

                                {ach.image && (
                                  <button
                                    onClick={() => updateField(index, "image", "")}
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 
                  text-sm text-red-600 border border-gray-300 rounded-full 
                  hover:bg-red-50 transition shadow-sm"                                  >
                                    <X size={14} /> Remove
                                  </button>
                                )}
                              </div>

                              {isUploading && (
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                  <span className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                                  Uploading...
                                </p>
                              )}
                            </div>

                            {/* Title */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                              </label>
                              <input
                                type="text"
                                value={ach.title ?? ""}
                                onChange={(e) =>
                                  updateField(index, "title", e.target.value)
                                }
                                placeholder="e.g. National Hackathon Winner"
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            {/* Description */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                value={ach.description ?? ""}
                                onChange={(e) =>
                                  updateField(index, "description", e.target.value)
                                }
                                rows={3}
                                placeholder="Describe what the achievement was about..."
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            {/* Year */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Year
                              </label>
                              <input
                                type="text"
                                value={ach.year ?? ""}
                                onChange={(e) =>
                                  updateField(index, "year", e.target.value)
                                }
                                placeholder="e.g. 2024"
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                          </div>
                        )}
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
  Tip: Use clear, measurable <strong> Achievements </strong> such as 
  “<strong> Solved 100+ LeetCode problems </strong>”, 
  “<strong> Won 1st prize in a Hackathon </strong>”, or 
  “<strong> Published a research paper </strong>”. 
  Add a short <strong> Description </strong> only if needed. 
  Mention the <strong> Year </strong> when relevant, or leave it empty if not applicable.
</div>


    </div>
  );
};

export default AchievementsForm;
