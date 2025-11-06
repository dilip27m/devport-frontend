"use client";

import React, { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

export interface Education {
  degree: string;
  institution: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  grade: string;
}

export interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const degreeOptions = [
  "Higher Secondary",
  "Diploma",
  "B.Tech",
  "M.Tech",
  "B.Sc",
  "M.Sc",
  "BCA",
  "MCA",
  "Ph.D",
  "Other",
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(education.length > 0 ? 0 : null);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const start = 1980;
    const arr: number[] = [];
    for (let y = currentYear + 1; y >= start; y--) arr.push(y);
    return arr;
  }, [currentYear]);

  const addEducation = () => {
    onChange([
      ...education,
      {
        degree: "",
        institution: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        grade: "",
      },
    ]);
    setOpenIndex(education.length);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const formatDuration = (edu: Education) => {
    const { startMonth, startYear, endMonth, endYear } = edu;
    if (!startMonth && !startYear && !endMonth && !endYear) return "";
    const start = startMonth && startYear ? `${startMonth} ${startYear}` : startYear || startMonth || "";
    const end = endMonth && endYear ? `${endMonth} ${endYear}` : endYear || endMonth || "Present";
    return `${start}${start ? " – " : ""}${end}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          ➕ Add Education
        </button>
      </div>

      {/* Education Cards */}
      {education.map((edu, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center px-5 py-3 bg-gray-50 rounded-t-xl border-b cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="text-sm font-medium text-gray-800 truncate">
              {edu.degree || "Untitled Degree"}{" "}
              {edu.institution && <span className="text-xs text-gray-500">– {edu.institution}</span>}
              {formatDuration(edu) && (
                <span className="ml-2 text-xs text-gray-400">{formatDuration(edu)}</span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeEducation(index);
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
              aria-label="Remove education"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Body */}
          {openIndex === index && (
            <div className="p-5 space-y-4">
              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Qualification</label>
                <select
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select degree</option>
                  {degreeOptions.map((deg) => (
                    <option key={deg} value={deg}>
                      {deg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="e.g. Government Higher Secondary School / NIT Calicut"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Duration - start and end month/year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
                  <select
                    value={edu.startMonth}
                    onChange={(e) => updateEducation(index, "startMonth", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                  <select
                    value={edu.startYear}
                    onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
                  <select
                    value={edu.endMonth}
                    onChange={(e) => updateEducation(index, "endMonth", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Year (or Present)</label>
                  <select
                    value={edu.endYear}
                    onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Year or Present</option>
                    {["Present", ...years].map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade / GPA</label>
                <input
                  type="text"
                  value={edu.grade}
                  onChange={(e) => updateEducation(index, "grade", e.target.value)}
                  placeholder="e.g. 95% or 8.5 CGPA or First Class"
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

export default EducationForm;
