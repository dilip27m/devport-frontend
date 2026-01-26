"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  X,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { differenceInDays } from "date-fns";

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  isPresent?: boolean;
  descriptionBullets: string[];
  stack: string[];
  techStack?: string;
  links: { label: string; url: string }[];
}

export interface ExperienceFormProps {
  experiences?: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const formatDateMMMYYYY = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const computeDurationFriendly = (
  start?: string,
  end?: string,
  isPresent?: boolean
) => {
  if (!start) return "";
  const s = new Date(start);
  const e = isPresent || !end ? new Date() : new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";

  let years = e.getFullYear() - s.getFullYear();
  let months = e.getMonth() - s.getMonth();
  let totalMonths = years * 12 + months;

  if (e.getDate() < s.getDate()) totalMonths -= 1;
  if (totalMonths < 0) totalMonths = 0;

  if (totalMonths < 1) return "<1 mo";
  if (totalMonths < 12)
    return `${totalMonths} mo${totalMonths > 1 ? "s" : ""}`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo${m > 1 ? "s" : ""}`;
};

const emptyExperience = (): Experience => ({
  role: "",
  company: "",
  startDate: "",
  endDate: "",
  isPresent: false,
  descriptionBullets: [""],
  stack: [],
  techStack: "",
  links: [],
});

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences = [],
  onChange,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    experiences.length > 0 ? 0 : null
  );

  const safeExperiences = Array.isArray(experiences) ? experiences : [];

  const setExperiences = (updated: Experience[]) => {
    onChange(updated);
  };

  const addExperience = () => {
    const updated = [...safeExperiences, emptyExperience()];
    setExperiences(updated);
    setTimeout(() => setOpenIndex(updated.length - 1), 50);
  };

  const removeExperience = (index: number) => {
    const updated = safeExperiences.filter((_, i) => i !== index);
    setExperiences(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const updateField = (
    index: number,
    field: keyof Experience,
    value: any
  ) => {
    const updated = [...safeExperiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const updateBullet = (
    expIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...safeExperiences];
    const bullets = [...(updated[expIndex].descriptionBullets || [])];
    bullets[bulletIndex] = value;
    updated[expIndex].descriptionBullets = bullets;
    setExperiences(updated);
  };

  const addBullet = (expIndex: number) => {
    const updated = [...safeExperiences];
    const bullets = [...(updated[expIndex].descriptionBullets || [])];
    bullets.push("");
    updated[expIndex].descriptionBullets = bullets;
    setExperiences(updated);
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...safeExperiences];
    const bullets = [...(updated[expIndex].descriptionBullets || [])].filter(
      (_, i) => i !== bulletIndex
    );
    updated[expIndex].descriptionBullets = bullets.length ? bullets : [""];
    setExperiences(updated);
  };

  const updateStackFromInput = (expIndex: number, raw: string) => {
    const techStack = raw;
    const arr = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated = [...safeExperiences];
    updated[expIndex].techStack = techStack;
    updated[expIndex].stack = arr;
    setExperiences(updated);
  };

  const stackToString = (stack?: string[], techStack?: string) => {
    if (techStack && techStack.trim() !== "") return techStack;
    return (stack || []).join(", ");
  };

  const getStackArray = (exp: Experience) => {
    if (exp.stack && exp.stack.length > 0) return exp.stack;
    if (exp.techStack) {
      return exp.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  const addLink = (expIndex: number) => {
    const updated = [...safeExperiences];
    const links = [...(updated[expIndex].links || []), { label: "", url: "" }];
    updated[expIndex].links = links;
    setExperiences(updated);
  };

  const updateLink = (
    expIndex: number,
    linkIndex: number,
    field: "label" | "url",
    value: string
  ) => {
    const updated = [...safeExperiences];
    const links = [...(updated[expIndex].links || [])];
    links[linkIndex] = { ...links[linkIndex], [field]: value };
    updated[expIndex].links = links;
    setExperiences(updated);
  };

  const removeLink = (expIndex: number, linkIndex: number) => {
    const updated = [...safeExperiences];
    const links = [...(updated[expIndex].links || [])].filter(
      (_, i) => i !== linkIndex
    );
    updated[expIndex].links = links;
    setExperiences(updated);
  };

  const togglePresent = (index: number, val: boolean) => {
    const updated = [...safeExperiences];
    updated[index].isPresent = val;
    if (val) updated[index].endDate = "";
    setExperiences(updated);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(safeExperiences);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setExperiences(items);
    setOpenIndex(result.destination.index);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          Experience
        </h2>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          Add Experience
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="experience-droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {safeExperiences.map((exp, index) => {
                const startFriendly = formatDateMMMYYYY(exp.startDate) || "";
                const endFriendly = exp.isPresent
                  ? "Present"
                  : formatDateMMMYYYY(exp.endDate) || "";
                const durationFriendly = computeDurationFriendly(
                  exp.startDate,
                  exp.endDate,
                  exp.isPresent
                );
                const stackArr = getStackArray(exp);

                return (
                  <Draggable
                    key={index}
                    draggableId={`exp-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-xl bg-white shadow-md overflow-hidden transition ${snapshot.isDragging ? "ring-2 ring-blue-200" : ""
                          }`}
                      >
                        <div
                          className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
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
                              <div className="font-semibold text-gray-900 truncate">
                                {exp.role || `Untitled Role`}{" "}
                                {exp.company ? `@ ${exp.company}` : ""}
                              </div>

                              <div className="text-xs text-gray-500 truncate">
                                {startFriendly && startFriendly + " • "}{" "}
                                {endFriendly}{" "}
                                {durationFriendly
                                  ? ` · ${durationFriendly}`
                                  : ""}
                              </div>

                              {stackArr.length > 0 && (
                                <div className="text-xs text-gray-400 mt-1 truncate">
                                  {stackArr.slice(0, 3).join(", ")}
                                  {stackArr.length > 3
                                    ? ` +${stackArr.length - 3}`
                                    : ""}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeExperience(index);
                              }}
                              className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                              title="Remove experience"
                            >
                              <Trash2 size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenIndex(
                                  openIndex === index ? null : index
                                );
                              }}
                              className="text-gray-600 p-1 rounded-full"
                              aria-label="Toggle"
                            >
                              {openIndex === index ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>
                          </div>
                        </div>

                        {openIndex === index && (
                          <div className="p-4 space-y-4 border-t bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1">
                                  Role / Title
                                </label>
                                <input
                                  type="text"
                                  value={exp.role ?? ""}
                                  onChange={(e) =>
                                    updateField(
                                      index,
                                      "role",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g. Senior Software Engineer"
                                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  value={exp.company ?? ""}
                                  onChange={(e) =>
                                    updateField(
                                      index,
                                      "company",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g. Acme Corp"
                                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                            </div>

                            {/* Start + End dates in one line */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Date
                                </label>
                                <input
                                  type="date"
                                  value={exp.startDate ?? ""}
                                  onChange={(e) => updateField(index, "startDate", e.target.value)}
                                  className="w-full border border-gray-500 rounded-xl px-3 py-2 text-sm 
                                            focus:ring-2 focus:ring-blue-400"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  End Date
                                </label>
                                <input
                                  type="date"
                                  value={exp.endDate ?? ""}
                                  onChange={(e) => updateField(index, "endDate", e.target.value)}
                                  disabled={exp.isPresent}
                                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 ${exp.isPresent
                                      ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                      : "border-gray-500 focus:ring-blue-400"
                                    }`}
                                />
                              </div>
                            </div>

                            {/* Checkbox below, full row */}
                            <div className="mt-2">
                              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={!!exp.isPresent}
                                  onChange={(e) => togglePresent(index, e.target.checked)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                                />
                                <span className="text-sm text-gray-700">
                                  I currently work here
                                </span>
                              </label>
                            </div>


                            {exp.startDate &&
                              (exp.endDate || exp.isPresent) && (
                                <div className="text-xs text-gray-500">
                                  Duration:{" "}
                                  {computeDurationFriendly(
                                    exp.startDate,
                                    exp.endDate,
                                    !!exp.isPresent
                                  )}
                                </div>
                              )}

                            <div>
                              <label className="block text-sm font-medium text-gray-900 mb-1">
                                Tech Stack (comma-separated)
                              </label>
                              <input
                                type="text"
                                value={stackToString(
                                  exp.stack,
                                  exp.techStack
                                )}
                                onChange={(e) =>
                                  updateStackFromInput(index, e.target.value)
                                }
                                placeholder="React, Node.js, AWS"
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
                              />

                              {stackArr.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {stackArr.map((s, si) => (
                                    <span
                                      key={si}
                                      className="px-3 py-1 text-xs bg-gray-100 border border-gray-300 rounded-full text-gray-800 shadow-sm"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-900">
                                  Achievements / Responsibilities
                                </label>
                                <button
                                  type="button"
                                  onClick={() => addBullet(index)}
                                  className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                                >
                                  <Plus size={14} /> Add bullet
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(exp.descriptionBullets || [""]).map(
                                  (b, bi) => (
                                    <div
                                      key={bi}
                                      className="flex items-start gap-2"
                                    >
                                      <div className="mt-2 text-gray-500">•</div>
                                      <div className="flex-1">
                                        <input
                                          type="text"
                                          value={b ?? ""}
                                          onChange={(e) =>
                                            updateBullet(
                                              index,
                                              bi,
                                              e.target.value
                                            )
                                          }
                                          placeholder="e.g. Improved API latency by 40%..."
                                          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeBullet(index, bi)
                                        }
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                                        title="Remove bullet"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
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
        Tip: Enter a precise <strong>Role</strong>, <strong>Company</strong>, and correct dates.
        Add measurable <strong>achievements</strong> and highlight your <strong>tech stack</strong>.
      </div>
    </div>
  );
};

export default ExperienceForm;
