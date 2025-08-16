"use client";

import React from "react";

export interface Activity {
  title: string;
  description: string;
  date: string;
}

export interface ActivitiesFormProps {
  activities: Activity[];
  onChange: (activities: Activity[]) => void;
}

const ActivitiesForm: React.FC<ActivitiesFormProps> = ({
  activities,
  onChange,
}) => {
  const addActivity = () => {
    onChange([...activities, { title: "", description: "", date: "" }]);
  };

  const updateActivity = (
    index: number,
    field: keyof Activity,
    value: string
  ) => {
    const updated = [...activities];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeActivity = (index: number) => {
    const updated = activities.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Extra-Curricular & Achievements</h2>
        <button
          type="button"
          onClick={addActivity}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          + Add Activity
        </button>
      </div>

      {activities.map((act, index) => (
        <div
          key={index}
          className="border rounded p-3 space-y-2 bg-white shadow-sm"
        >
          <input
            type="text"
            placeholder="Activity / Achievement Title"
            value={act.title}
            onChange={(e) => updateActivity(index, "title", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Description"
            value={act.description}
            onChange={(e) =>
              updateActivity(index, "description", e.target.value)
            }
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={act.date}
            onChange={(e) => updateActivity(index, "date", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => removeActivity(index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesForm;
