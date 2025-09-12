"use client";

import React from "react";
import ProfileForm from "./forms/ProfileForm";
import ProjectsForm from "./forms/ProjectsForm";
// We need the SaveStatus type here
import { SaveStatus } from "./Bottombar";

interface FormContainerProps {
  section: string;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  // Add the new props for saving
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
      case "saving": return { text: "Saving...", disabled: true, className: "bg-yellow-500" };
      case "success": return { text: "Saved!", disabled: false, className: "bg-green-500" };
      case "error": return { text: "Save Failed", disabled: false, className: "bg-red-500" };
      default: return { text: "Save", disabled: false, className: "bg-blue-500 hover:bg-blue-600" };
    }
  };

  const saveButton = getSaveButtonContent();

  return (
    <div className="flex flex-col h-full">
      {/* --- NEW HEADER for Save Button --- */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Editor</h2>
          <button
            onClick={onSave}
            disabled={saveButton.disabled}
            className={`font-bold py-2 px-6 rounded-lg transition text-white ${saveButton.className}`}
          >
            {saveButton.text}
          </button>
        </div>
        {lastSaved && (
          <p className="text-xs text-gray-500 mt-1 text-right">
            Last saved: {lastSaved}
          </p>
        )}
      </div>
      {/* ---------------------------------- */}
      
      {/* The actual forms are now in a scrollable container */}

 <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-24">
  {section === "Profile" && ( <ProfileForm data={data.profile} onChange={(field, value) => setData({ ...data, profile: { ...data.profile, [field]: value } })} /> )}
  {section === "Projects" && ( <ProjectsForm projects={data.projects} onChange={(projects) => setData({ ...data, projects })} /> )}
</div>

    </div>
  );
};

export default FormContainer;