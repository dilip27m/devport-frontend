"use client";

import React, { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsFormProps {
  skills: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    Array.isArray(skills) && skills.length > 0 ? 0 : null
  );

  const updateCategoryName = (index: number, name: string) => {
    const updated = [...skills];
    updated[index].name = name;
    onChange(updated);
  };

  const addCategory = () => {
    onChange([...skills, { name: "", skills: [] }]);
    setOpenIndex(skills.length);
  };

  const removeCategory = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const addSkill = (index: number, skill: string) => {
    const trimmed = skill.trim().toLowerCase();
    if (!trimmed || skills[index].skills.includes(trimmed)) return;
    const updated = [...skills];
    updated[index].skills.push(trimmed);
    onChange(updated);
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[catIndex].skills.splice(skillIndex, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          ➕ Add Category
        </button>
      </div>

      {/* Category Cards */}
      {Array.isArray(skills) &&
        skills.map((cat, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all"
          >
            {/* Card Header */}
            <div
              className="flex justify-between items-center px-5 py-3 bg-gray-50 rounded-t-xl border-b cursor-pointer"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <div className="text-sm font-medium text-gray-800 truncate">
                {cat.name || "Untitled Category"}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCategory(index);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
                aria-label="Remove category"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Card Body */}
            {openIndex === index && (
              <div className="p-5 space-y-4">
                {/* Category Name */}
                <div>
                  <label
                    htmlFor={`category-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    id={`category-${index}`}
                    type="text"
                    value={cat.name}
                    onChange={(e) =>
                      updateCategoryName(index, e.target.value)
                    }
                    placeholder="e.g. Frontend, Backend, DevOps"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Skill Input */}
                <SkillInput onAdd={(skill) => addSkill(index, skill)} />

                {/* Skill Chips with Icons */}
                {Array.isArray(cat.skills) &&
                  cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                      <img
                        src={`https://skillicons.dev/icons?i=${skill}`}
                        alt={skill}
                        className="w-5 h-5 mr-2"
                      />
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index, i)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        aria-label="Remove skill"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

// Subcomponent for adding a skill
const SkillInput: React.FC<{ onAdd: (skill: string) => void }> = ({
  onAdd,
}) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a skill"
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleAdd}
        className="bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition"
      >
        Add
      </button>
    </div>
  );
};

export default SkillsForm;
