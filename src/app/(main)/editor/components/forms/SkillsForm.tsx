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
  skills: string[]; // normalized lower-case strings
}

export interface SkillsFormProps {
  skills?: SkillCategory[]; // optional incoming
  onChange: (skills: SkillCategory[]) => void;
}

/* ---------- configs ---------- */
const SUGGESTIONS = [
  "react","nextjs","typescript","javascript","tailwind","vite","vue","svelte",
  "nodejs","express","django","flask","fastapi","spring","ruby","rails",
  "flutter","dart","reactnative","kotlin","swift",
  "mongodb","postgres","mysql","redis","sqlite",
  "docker","kubernetes","aws","gcp","azure","nginx","git",
  "python","pytorch","tensorflow","pandas","numpy","scikit-learn",
  "go","rust","java","c","cpp","graphql","prisma","apollo","sql",
];

const normalizeSkill = (s: string) => s.trim().toLowerCase();
const displaySkill = (s: string) =>
  s
    .split(/[\s._-]+/)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ""))
    .join(" ");
const skillIconUrl = (skill: string) =>
  `https://skillicons.dev/icons?i=${encodeURIComponent(skill)}`;

/* ---------- component ---------- */
const SkillsForm: React.FC<SkillsFormProps> = ({ skills = [], onChange }) => {
  const [cats, setCats] = useState<SkillCategory[]>(
    Array.isArray(skills) ? skills : []
  );
  const [inputs, setInputs] = useState<string[]>([]);
  const [brokenIcons, setBrokenIcons] = useState<Record<string, boolean>>({});
  const [suggestionsFor, setSuggestionsFor] = useState<number | null>(null);
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // sync incoming prop
  useEffect(() => {
    setCats(Array.isArray(skills) ? skills : []);
  }, [skills]);

  // ensure inputs length matches categories
  useEffect(() => {
    setInputs((prev) => {
      const next = [...prev];
      while (next.length < cats.length) next.push("");
      while (next.length > cats.length) next.pop();
      return next;
    });
  }, [cats.length]);

  // notify parent
  const notify = (next: SkillCategory[]) => {
    setCats(next);
    onChange(next);
  };

  // add category
  const addCategory = () => {
    const next = [...cats, { name: "", skills: [] }];
    notify(next);
    setTimeout(() => {
      setSuggestionsFor(null);
    }, 10);
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

  // add skill (supports raw comma-separated bulk paste or suggestion)
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

  // drag & drop logic
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // reorder categories
    if (source.droppableId === "categories" && destination.droppableId === "categories") {
      const arr = Array.from(cats);
      const [moved] = arr.splice(source.index, 1);
      arr.splice(destination.index, 0, moved);
      notify(arr);
      return;
    }

    // skills move (droppableId: skills-{catIndex})
    const parseId = (id: string) => {
      const parts = id.split("-");
      return Number(parts[1]);
    };

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

  // suggestions filtering
  const getSuggestions = (catIndex: number, q: string) => {
    const query = q.trim().toLowerCase();
    const existing = new Set(cats[catIndex]?.skills?.map((s) => s.toLowerCase()) || []);
    if (!query) return SUGGESTIONS.slice(0, 8).filter((s) => !existing.has(s));
    return SUGGESTIONS.filter((s) => !existing.has(s) && s.includes(query)).slice(0, 8);
  };

  // click outside to close suggestion box
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

  // paste handler for bulk-add
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, catIndex: number) => {
    const text = e.clipboardData.getData("text");
    if (text.includes(",")) {
      e.preventDefault();
      const parts = text.split(",").map((p) => normalizeSkill(p)).filter(Boolean);
      if (parts.length) {
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
      }
    }
  };

  // icon broken handler
  const markIconBroken = (skill: string) => {
    setBrokenIcons((prev) => ({ ...prev, [skill]: true }));
  };

  return (
    <div className="space-y-6" ref={containerRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories" type="CATEGORY">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {cats.map((cat, catIndex) => (
                <Draggable key={catIndex} draggableId={`cat-${catIndex}`} index={catIndex}>
                  {(prov, snapshot) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      className={`border rounded-xl bg-white shadow-sm overflow-hidden transition ${snapshot.isDragging ? "ring-2 ring-blue-200" : ""}`}
                    >
                      {/* Category header */}
                      <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span {...prov.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing flex-shrink-0">
                            <GripVertical size={18} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={cat.name ?? ""}
                              onChange={(e) => updateCategoryName(catIndex, e.target.value)}
                              placeholder="Category name (e.g., Frontend, DevOps)"
                              className="w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="text-xs text-gray-500 mt-1 px-1">
                              {cat.skills.length} skill{cat.skills.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => removeCategory(catIndex)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                            title="Remove category"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Body (compact pill UI) */}
                      <div className="p-4 space-y-3 border-t bg-white">
                        {/* input + Add */}
                        <div className="relative">
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
                            onPaste={(e) => handlePaste(e, catIndex)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkillToCategory(catIndex);
                              } else if (e.key === "Escape") {
                                setSuggestionsFor(null);
                              }
                            }}
                            placeholder="Add a skill (press Enter). Try: react, nodejs, aws"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-20 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <button
                              type="button"
                              onClick={() => addSkillToCategory(catIndex)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-gray-100 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                            >
                              <Plus size={14} /> Add
                            </button>
                          </div>
                        </div>

                        {/* suggestions dropdown */}
                        {suggestionsFor === catIndex && suggestionsList.length > 0 && (
                          <div className="border border-gray-200 rounded-md bg-white mt-1 max-h-48 overflow-auto shadow-lg">
                            {suggestionsList.map((sug) => (
                              <div
                                key={sug}
                                onClick={() => {
                                  addSkillToCategory(catIndex, sug);
                                }}
                                className="px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition"
                              >
                                {!brokenIcons[sug] ? (
                                  <img
                                    src={skillIconUrl(sug)}
                                    alt={sug}
                                    onError={() => markIconBroken(sug)}
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                    {sug[0]?.toUpperCase() ?? "?"}
                                  </div>
                                )}
                                <span>{displaySkill(sug)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* skills list (compact pills) */}
                        <Droppable droppableId={`skills-${catIndex}`} type="SKILL">
                          {(dropProvided, dropSnapshot) => (
                            <div
                              ref={dropProvided.innerRef}
                              {...dropProvided.droppableProps}
                              className={`min-h-[40px] flex flex-wrap gap-2 p-2 rounded-md transition ${dropSnapshot.isDraggingOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : "border-2 border-transparent"}`}
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
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-900 shadow-sm hover:shadow-md transition ${sSnapshot.isDragging ? "ring-2 ring-blue-400 scale-105 z-10" : ""}`}
                                      >
                                        {/* icon or fallback */}
                                        {!broken ? (
                                          <img
                                            src={skillIconUrl(skill)}
                                            alt={skill}
                                            onError={() => markIconBroken(skill)}
                                            className="w-5 h-5 rounded-sm"
                                          />
                                        ) : (
                                          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                            {skill[0]?.toUpperCase() ?? "?"}
                                          </div>
                                        )}

                                        <span className="max-w-[120px] truncate">{displaySkill(skill)}</span>

                                        <button
                                          type="button"
                                          onClick={() => removeSkill(catIndex, skillIndex)}
                                          className="ml-1 text-red-500 hover:text-red-700 hover:bg-red-50 p-0.5 rounded-full transition"
                                          aria-label={`Remove ${skill}`}
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
      {/* TIPS */}
      <div className="text-xs text-gray-500">
        Tip: Enter a precise <strong> Role </strong>, <strong> Company </strong>, and correct dates, 
        including the <strong> tenure </strong> for roles or projects. Describe your work by focusing 
        on your <strong> main responsibilities </strong> and <strong> notable achievements </strong>. 
        Use the drag handle to reorder your experience entries.
      </div>
    </div>
  );
};

export default SkillsForm;