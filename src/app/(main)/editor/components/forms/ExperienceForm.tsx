"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { differenceInDays } from "date-fns";

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onChange,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const addExperience = () => {
    const newEntry = {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...experiences, newEntry]);
    setTimeout(() => {
      setOpenIndex(experiences.length);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updated = [...experiences];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return "";
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const days = differenceInDays(endDate, startDate);
      return days >= 0 ? `${days} days` : "Invalid range";
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-6 text-sm text-gray-800" ref={containerRef}>
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <Briefcase size={20} className="text-blue-600" />
          Experience
        </h2>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {/* Experience Cards */}
      {experiences.map((exp, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all"
        >
          {/* Card Header */}
          <div className="flex justify-between items-center px-5 py-4 bg-gray-50 rounded-t-xl border-b">
            <button
              type="button"
              onClick={() => toggleOpen(i)}
              className="text-left font-medium text-gray-800 flex-1 text-sm hover:underline focus:outline-none"
            >
              {exp.role || "Untitled Role"} at {exp.company || "Company"}
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => removeExperience(i)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
                aria-label="Remove experience"
              >
                <Trash2 size={18} />
              </button>
              <button
                type="button"
                onClick={() => toggleOpen(i)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition"
                aria-label="Toggle panel"
              >
                {openIndex === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>

          {/* Card Body */}
          {openIndex === i && (
            <div className="p-5 space-y-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(i, "role", e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(i, "company", e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(i, "startDate", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(i, "endDate", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {exp.startDate && exp.endDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Duration: {calculateDays(exp.startDate, exp.endDate)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(i, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
