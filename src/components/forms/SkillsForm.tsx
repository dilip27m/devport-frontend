"use client";

import React from "react";

export interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const addSkill = () => {
    onChange([...skills, ""]);
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    onChange(updated);
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Skills</h2>
        <button
          type="button"
          onClick={addSkill}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          + Add Skill
        </button>
      </div>

      {skills.map((skill, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => updateSkill(index, e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`Skill ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkillsForm;
