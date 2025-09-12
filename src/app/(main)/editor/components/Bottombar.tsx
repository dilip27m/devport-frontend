"use client";

import React from "react";


export type SaveStatus = "idle" | "saving" | "success" | "error";


interface BottomBarProps {
  activeTemplate: string;
  onTemplateChange: (template: string) => void;
}


const templates = [
  "template1",
  "template2",
  "template3",
  "template4",
  "template5",
  "template6",
];


const BottomBar: React.FC<BottomBarProps> = ({
  activeTemplate,
  onTemplateChange,
}) => {
  return (

    <div className=" bg-gray-900 px-6 py-3 overflow-x-auto shadow-md z-50">

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
