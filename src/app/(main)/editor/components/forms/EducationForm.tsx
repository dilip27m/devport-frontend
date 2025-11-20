"use client";

import React, { useMemo, useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    education.length > 0 ? 0 : null
  );

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = currentYear + 1; y >= 1980; y--) arr.push(y);
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

    const start = startMonth && startYear
      ? `${startMonth} ${startYear}`
      : startYear || startMonth || "";

    const end =
      endMonth && endYear ? `${endMonth} ${endYear}` : endYear || endMonth || "Present";

    return `${start}${start ? " – " : ""}${end}`;
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(education);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    onChange(items);
    setOpenIndex(result.destination.index);
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Education</h2>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          Add Education
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="education-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">

              {education.map((edu, index) => {
                const duration = formatDuration(edu);
                const isOpen = openIndex === index;

                return (
                  <Draggable key={index} draggableId={`edu-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border border-gray-200 rounded-xl bg-white shadow-sm transition 
                          ${snapshot.isDragging ? "ring-2 ring-blue-300" : ""}`}
                      >

                        <div
                          className="flex justify-between items-center px-5 py-3 bg-gray-50 border-b cursor-pointer"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab"
                            >
                              <GripVertical size={18} />
                            </span>

                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {edu.degree || "Untitled Degree"}
                              </div>

                              {edu.institution && (
                                <div className="text-xs text-gray-500 truncate">{edu.institution}</div>
                              )}

                              {duration && (
                                <div className="text-xs text-gray-400 truncate">{duration}</div>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeEducation(index);
                            }}
                            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {isOpen && (
                          <div className="p-5 space-y-4">

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Degree / Qualification
                              </label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                placeholder="e.g. B.Tech in CSE"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Institution
                              </label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                placeholder="e.g. NIT Calicut / Govt School"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Month
                                </label>
                                <select
                                  value={edu.startMonth}
                                  onChange={(e) => updateEducation(index, "startMonth", e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                                >
                                  <option value="">Month</option>
                                  {months.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Year
                                </label>
                                <select
                                  value={edu.startYear}
                                  onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  End Month
                                </label>
                                <select
                                  value={edu.endMonth}
                                  onChange={(e) => updateEducation(index, "endMonth", e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                                >
                                  <option value="">Month</option>
                                  {months.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  End Year (or Present)
                                </label>
                                <select
                                  value={edu.endYear}
                                  onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                                >
                                  <option value="">Year or Present</option>
                                  {["Present", ...years].map((y) => (
                                    <option key={y} value={String(y)}>{y}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Grade / GPA
                              </label>
                              <input
                                type="text"
                                value={edu.grade}
                                onChange={(e) => updateEducation(index, "grade", e.target.value)}
                                placeholder="e.g. 8.5 CGPA / 92% / A+"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500"
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
        Tip: Add clear details such as <strong>Degree</strong>, <strong>Institution</strong>,
        <strong>Duration</strong>, and <strong>Grade</strong>.
      </div>

    </div>
  );
};

export default EducationForm;
