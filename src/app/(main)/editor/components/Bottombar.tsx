"use client";

import React from "react";

// The only props it needs now are for template switching
export type SaveStatus = "idle" | "saving" | "success" | "error"; // Keep type for other components
interface BottomBarProps {
  activeTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = ["template1", "template2", "template3", "template4", "template5", "template6"]; // Add more to test scrolling

const BottomBar: React.FC<BottomBarProps> = ({
  activeTemplate,
  onTemplateChange,
}) => {
  return (
    // This container handles the horizontal scrolling
    <div className="w-full bg-gray-900 px-6 py-3 overflow-x-auto">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <span className="font-semibold text-white mr-2">Templates:</span>
        {templates.map((template) => (
          <button
            key={template}
            onClick={() => onTemplateChange(template)}
            className={`px-4 py-2 rounded-md text-sm transition ${
              activeTemplate === template
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {template.charAt(0).toUpperCase() + template.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;