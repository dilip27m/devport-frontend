"use client";

import React, { useEffect, useRef, useState } from "react";
import { Trash2, GripVertical, Plus, X } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsFormProps {
  skills?: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
}

const SUGGESTIONS = [
  "react", "nextjs", "typescript", "javascript", "tailwind", "vite", "vue", "svelte",
  "nodejs", "express", "django", "flask", "fastapi", "spring", "ruby", "rails",
  "flutter", "dart", "reactnative", "kotlin", "swift",
  "mongodb", "postgres", "mysql", "redis", "sqlite",
  "docker", "kubernetes", "aws", "gcp", "azure", "nginx", "git",
  "python", "pytorch", "tensorflow", "pandas", "numpy", "scikit-learn",
  "go", "rust", "java", "c", "cpp", "graphql", "prisma", "apollo", "sql",
];

const normalizeSkill = (s: string) => s.trim().toLowerCase();
const displaySkill = (s: string) =>
  s
    .split(/[\s._-]+/)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ""))
    .join(" ");
const skillIconUrl = (skill: string) =>
  `https://skillicons.dev/icons?i=${encodeURIComponent(skill)}`;

const SkillsForm: React.FC<SkillsFormProps> = ({ skills = [], onChange }) => {
  const [cats, setCats] = useState<SkillCategory[]>(
    Array.isArray(skills) ? skills : []
  );
  const [inputs, setInputs] = useState<string[]>([]);
  const [brokenIcons, setBrokenIcons] = useState<Record<string, boolean>>({});
  const [suggestionsFor, setSuggestionsFor] = useState<number | null>(null);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCats(Array.isArray(skills) ? skills : []);
  }, [skills]);

  useEffect(() => {
    setInputs((prev) => {
      const next = [...prev];
      while (next.length < cats.length) next.push("");
      while (next.length > cats.length) next.pop();
      return next;
    });
  }, [cats.length]);

  const notify = (next: SkillCategory[]) => {
    setCats(next);
    onChange(next);
  };

  const addCategory = () => {
    const next = [...cats, { name: "", skills: [] }];
    notify(next);
  };

  const removeCategory = (index: number) => {
    const next = cats.filter((_, i) => i !== index);
    notify(next);
  };

  const updateCategoryName = (index: number, value: string) => {
    const next = [...cats];
    next[index] = { ...next[index], name: value };
    notify(next);
  };

  const addSkillToCategory = (catIndex: number, raw?: string) => {
    const rawValue = (raw ?? inputs[catIndex] ?? "").trim();
    if (!rawValue) return;
    const parts = rawValue.split(",").map((p) => normalizeSkill(p)).filter(Boolean);
    if (parts.length === 0) return;

    const next = [...cats];
    const existing = new Set(next[catIndex].skills.map((s) => s.toLowerCase()));
    parts.forEach((p) => {
      if (!existing.has(p)) {
        next[catIndex].skills.push(p);
        existing.add(p);
      }
    });
    notify(next);
    setInputs((prev) => {
      const cp = [...prev];
      cp[catIndex] = "";
      return cp;
    });
    setSuggestionsFor(null);
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const next = [...cats];
    next[catIndex] = {
      ...next[catIndex],
      skills: next[catIndex].skills.filter((_, i) => i !== skillIndex),
    };
    notify(next);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === "categories" && destination.droppableId === "categories") {
      const arr = Array.from(cats);
      const [moved] = arr.splice(source.index, 1);
      arr.splice(destination.index, 0, moved);
      notify(arr);
      return;
    }

    const parseId = (id: string) => Number(id.split("-")[1]);
    if (source.droppableId.startsWith("skills-") && destination.droppableId.startsWith("skills-")) {
      const src = parseId(source.droppableId);
      const dst = parseId(destination.droppableId);
      if (isNaN(src) || isNaN(dst)) return;

      const next = Array.from(cats);
      const srcSkills = Array.from(next[src].skills);
      const [movedSkill] = srcSkills.splice(source.index, 1);

      if (src === dst) {
        srcSkills.splice(destination.index, 0, movedSkill);
        next[src] = { ...next[src], skills: srcSkills };
        notify(next);
        return;
      }

      const dstSkills = Array.from(next[dst].skills);
      if (!dstSkills.includes(movedSkill)) {
        dstSkills.splice(destination.index, 0, movedSkill);
      }
      next[src] = { ...next[src], skills: srcSkills };
      next[dst] = { ...next[dst], skills: dstSkills };
      notify(next);
    }
  };

  const getSuggestions = (catIndex: number, q: string) => {
    const query = q.trim().toLowerCase();
    const existing = new Set(cats[catIndex]?.skills?.map((s) => s.toLowerCase()) || []);
    if (!query) return SUGGESTIONS.slice(0, 8).filter((s) => !existing.has(s));
    return SUGGESTIONS.filter((s) => !existing.has(s) && s.includes(query)).slice(0, 8);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setSuggestionsFor(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const markIconBroken = (skill: string) => {
    setBrokenIcons((prev) => ({ ...prev, [skill]: true }));
  };

  return (
    <div className="space-y-8" ref={containerRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          Add Category
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories" type="CATEGORY">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
              {cats.map((cat, catIndex) => (
                <Draggable key={catIndex} draggableId={`cat-${catIndex}`} index={catIndex}>
                  {(prov, snapshot) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      className={`border border-gray-200 rounded-2xl bg-white shadow-sm transition-all ${snapshot.isDragging ? "ring-2 ring-blue-500 shadow-lg z-50" : "hover:shadow-md"}`}
                    >
                      {/* HEADER: Drag Handle + Category Name */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
                        <div className="flex items-center gap-4 flex-1">
                          <span {...prov.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                            <GripVertical size={20} />
                          </span>
                          <input
                            type="text"
                            value={cat.name ?? ""}
                            onChange={(e) => updateCategoryName(catIndex, e.target.value)}
                            placeholder="Category Name (e.g. Frontend)"
                            className="w-full bg-transparent text-base font-semibold text-gray-900 placeholder:text-gray-500 focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCategory(catIndex)}
                          className="text-red-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* BODY: Input + Skills */}
                      <div className="p-5 space-y-5">

                        {/* 1. Reduced Width Input Row */}
                        <div className="relative flex items-center gap-3">
                          <div className="relative w-72"> {/* Fixed Reduced Width */}
                            <input
                              type="text"
                              value={inputs[catIndex] ?? ""}
                              onChange={(e) => {
                                setInputs((prev) => {
                                  const cp = [...prev];
                                  cp[catIndex] = e.target.value;
                                  return cp;
                                });
                                setSuggestionsFor(catIndex);
                                setSuggestionsList(getSuggestions(catIndex, e.target.value));
                              }}
                              onFocus={() => {
                                setSuggestionsFor(catIndex);
                                setSuggestionsList(getSuggestions(catIndex, inputs[catIndex] ?? ""));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addSkillToCategory(catIndex);
                                } else if (e.key === "Escape") {
                                  setSuggestionsFor(null);
                                }
                              }}
                              placeholder="Type a skill..."
                              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            {/* Suggestions Dropdown */}
                            {suggestionsFor === catIndex && suggestionsList.length > 0 && (
                              <div className="absolute top-full left-0 mt-1 w-full z-50 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                {suggestionsList.map((sug) => (
                                  <div
                                    key={sug}
                                    onClick={() => addSkillToCategory(catIndex, sug)}
                                    className="px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer flex items-center gap-3 transition border-b border-gray-50 last:border-0"
                                  >
                                    {!brokenIcons[sug] ? (
                                      <img
                                        src={skillIconUrl(sug)}
                                        alt={sug}
                                        onError={() => markIconBroken(sug)}
                                        className="w-5 h-5 object-contain"
                                      />
                                    ) : (
                                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                                        {sug[0]?.toUpperCase()}
                                      </div>
                                    )}
                                    <span className="capitalize">{displaySkill(sug)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => addSkillToCategory(catIndex)}
                            className="h-10 px-4 bg-white text-black text-sm font-medium rounded-xl border border-black hover:bg-gray-100 transition"
                          >
                            Add
                          </button>
                        </div>

                        {/* 2. Skills List */}
                        <Droppable droppableId={`skills-${catIndex}`} type="SKILL">
                          {(dropProvided, dropSnapshot) => (
                            <div
                              ref={dropProvided.innerRef}
                              {...dropProvided.droppableProps}
                              className={`min-h-[40px] flex flex-wrap gap-3 ${dropSnapshot.isDraggingOver ? "bg-gray-50/50 rounded-lg border-2 border-dashed border-blue-200 -m-2 p-2" : ""}`}
                            >
                              {cat.skills.map((skill, skillIndex) => {
                                const broken = !!brokenIcons[skill];
                                return (
                                  <Draggable
                                    key={`${skill}-${skillIndex}`}
                                    draggableId={`skill-${catIndex}-${skillIndex}`}
                                    index={skillIndex}
                                  >
                                    {(sProv, sSnapshot) => (
                                      <div
                                        ref={sProv.innerRef}
                                        {...sProv.draggableProps}
                                        {...sProv.dragHandleProps}
                                        className={`group flex items-center gap-2 pl-3 pr-2 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm hover:border-gray-300 hover:shadow transition-all select-none ${sSnapshot.isDragging ? "ring-2 ring-blue-500 scale-105 z-50" : ""}`}
                                      >
                                        {!broken ? (
                                          <img
                                            src={skillIconUrl(skill)}
                                            alt={skill}
                                            onError={() => markIconBroken(skill)}
                                            className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity"
                                          />
                                        ) : (
                                          <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                                            {skill[0]?.toUpperCase()}
                                          </div>
                                        )}

                                        <span className="font-medium">{displaySkill(skill)}</span>

                                        <button
                                          type="button"
                                          onClick={() => removeSkill(catIndex, skillIndex)}
                                          className="ml-1 p-0.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                          <X size={14} />
                                        </button>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {dropProvided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="text-xs text-gray-500">
        Tip: Click on category name to enter category name.
      </div>
    </div>
  );
};

export default SkillsForm;