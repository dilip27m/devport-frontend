"use client";

import React from "react";

// Define the possible statuses for our save button
export type SaveStatus = "idle" | "saving" | "success" | "error";

interface BottomBarProps {
  activeTemplate: string;
  onTemplateChange: (template: string) => void;
  onSave: () => void; // A function to trigger the save
  saveStatus: SaveStatus; // The current status from the parent
}

const templates = ["template1", "template2", "template3"];

const BottomBar: React.FC<BottomBarProps> = ({
  activeTemplate,
  onTemplateChange,
  onSave,
  saveStatus,
}) => {
  // Helper function to determine button text and style
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return { text: "Saving...", disabled: true, className: "bg-yellow-500" };
      case "success":
        return { text: "Saved!", disabled: false, className: "bg-green-500 hover:bg-green-600" };
      case "error":
        return { text: "Save Failed", disabled: false, className: "bg-red-500 hover:bg-red-600" };
      default: // idle
        return { text: "Save", disabled: false, className: "bg-blue-500 hover:bg-blue-600" };
    }
  };

  const saveButton = getSaveButtonContent();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-6 z-10">
      {/* Template Switcher */}
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Templates:</span>
        {templates.map((template) => (
          <button
            key={template}
            onClick={() => onTemplateChange(template)}
            className={`px-4 py-2 rounded-md text-sm transition ${
              activeTemplate === template
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {template.charAt(0).toUpperCase() + template.slice(1)}
          </button>
        ))}
      </div>

      {/* Save and Deploy Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          disabled={saveButton.disabled}
          className={`font-bold py-2 px-6 rounded-lg transition text-white ${saveButton.className}`}
        >
          {saveButton.text}
        </button>
        <button
          // We will implement this later
          // onClick={onDeploy} 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Deploy
        </button>
      </div>
    </div>
  );
};

export default BottomBar;