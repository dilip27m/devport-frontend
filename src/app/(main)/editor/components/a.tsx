"use client";

import React, { useEffect, useState } from "react";
import ProfileForm from "./forms/ProfileForm";
import ProjectsForm from "./forms/ProjectsForm";
import { SaveStatus } from "./Bottombar";

interface FormContainerProps {
  section: string;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  saveStatus: SaveStatus;
  lastSaved: string | null;
}

const FormContainer: React.FC<FormContainerProps> = ({
  section,
  data,
  setData,
  onSave,
  saveStatus,
  lastSaved,
}) => {
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return {
          text: "Saving...",
          disabled: true,
          className:
            "bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed",
        };
      case "error":
        return {
          text: "Save Failed",
          disabled: false,
          className:
            "bg-red-500 text-white border border-red-600 hover:bg-red-600 hover:border-black",
        };
      default:
        return {
          text: "Save",
          disabled: false,
          className:
            "bg-white text-gray-800 border border-gray-400 hover:bg-gray-900 hover:text-white hover:border-black",
        };
    }
  };

  const saveButton = getSaveButtonContent();

  // ✅ Fade effect for timestamp
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    // Trigger only if saveStatus indicates a successful save
    if (saveStatus === "success" && lastSaved) {
      // Reset highlight immediately
      setHighlight(false);

      // Small delay to re-trigger transition properly
      const startTimer = setTimeout(() => setHighlight(true), 10);

      // Remove highlight after 3s
      const stopTimer = setTimeout(() => setHighlight(false), 1000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
      };
    }
  }, [saveStatus, lastSaved ?? ""]); // ✅ Keep dependencies count constant

  return (
    <div className="flex flex-col h-full">
      {/* Header divider */}
      <div className="border-b bg-gray-50" />

      {/* Scrollable content */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
        {section === "Profile" && (
          <ProfileForm
            data={data.profile}
            onChange={(field, value) =>
              setData({
                ...data,
                profile: { ...data.profile, [field]: value },
              })
            }
          />
        )}
        {section === "Projects" && (
          <ProjectsForm
            projects={data.projects}
            onChange={(projects) => setData({ ...data, projects })}
          />
        )}
      </div>

      {/* Sticky Save bar */}
      <div className="sticky bottom-0 w-full bg-white border-t px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-md">
        <button
          onClick={onSave}
          disabled={saveButton.disabled}
          className={`font-bold py-2 px-6 rounded-3xl transition duration-300 ease-in-out ${saveButton.className}`}
        >
          {saveButton.text}
        </button>

        {/* ✅ Timestamp transition: gray → black */}
        {lastSaved && (
          <p
            className={`text-xs font-semibold transition-all duration-[100ms] ease-in-out ${
              highlight ? "text-black scale-105" : "text-gray-600 scale-100"
            }`}
          >
            {lastSaved}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormContainer;