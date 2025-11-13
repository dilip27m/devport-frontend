"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export interface Achievement {
  title: string;
  description: string;
  year: string;
}

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

const AchievementsForm: React.FC<AchievementsFormProps> = ({
  achievements,
  onChange,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    achievements.length > 0 ? 0 : null
  );

  const handleChange = (
    index: number,
    field: keyof Achievement,
    value: string
  ) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addAchievement = () => {
    onChange([
      ...achievements,
      { title: "", description: "", year: "" },
    ]);
    setOpenIndex(achievements.length);
  };

  const removeAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  return (
    <div className="space-y-6">
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

      {achievements.map((ach, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all"
        >
          <div
            className="flex justify-between items-center px-5 py-3 bg-gray-50 rounded-t-xl border-b cursor-pointer"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <div className="text-sm font-medium text-gray-800 truncate">
              {ach.title || "Untitled Achievement"}{" "}
              {ach.year && (
                <span className="text-xs text-gray-500">({ach.year})</span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeAchievement(index);
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
              aria-label="Remove achievement"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {openIndex === index && (
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={ach.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                  placeholder="e.g. Published AI research paper"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={ach.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  placeholder="Briefly describe what you achieved and its impact"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={ach.year}
                  onChange={(e) =>
                    handleChange(index, "year", e.target.value)
                  }
                  placeholder="e.g. 2023"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AchievementsForm;
