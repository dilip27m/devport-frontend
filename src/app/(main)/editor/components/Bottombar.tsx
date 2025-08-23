"use client";

import React from "react";

interface BottomBarProps {
  activeTemplate: string;
  onTemplateChange: (template: string) => void;
  onDeploy: () => void;
}

const templates = ["template1", "template2", "template3"];

const BottomBar: React.FC<BottomBarProps> = ({
  activeTemplate,
  onTemplateChange,
  onDeploy,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-6 z-10">
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
      <button
        onClick={onDeploy}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
      >
        Deploy
      </button>
    </div>
  );
};

export default BottomBar;