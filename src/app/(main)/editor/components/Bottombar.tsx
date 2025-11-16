"use client";

import React from "react";
// We no longer need useRouter or useAuth, simplifying this component.

export type SaveStatus = "idle" | "saving" | "success" | "error";

interface BottomBarProps {
  activeTemplate: string;
  onTemplateChange: (template: string) => void;
  isPublished: boolean;
  onPublishToggle: () => void;
  publishStatus: "idle" | "loading";
}

const templates = [
  "template1",
  "template2",
  "template3",
];

const BottomBar: React.FC<BottomBarProps> = ({
  activeTemplate,
  onTemplateChange,
  isPublished,
  onPublishToggle,
  publishStatus,
}) => {

  // --- UPDATED LOGIC for the "View" button ---
  const handleViewClick = () => {
    // This now simply opens our new, protected /preview page in a new tab.
    // That page will handle its own authentication and data fetching.
    const previewUrl = "/preview";
    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  // The logic for the publish button text and style is still correct.
  const publishButtonText = isPublished ? "Unpublish" : "Publish";
  const publishButtonClass = isPublished
    ? "bg-yellow-500 text-white border-transparent hover:bg-yellow-600"
    : "bg-green-600 text-white border-transparent hover:bg-green-700";

  return (
   <div className=" px-6  shadow-md z-50">
      <div className="flex w-full gap-4">
        {/* Template switcher section */}
        <div className="flex-1 overflow-x-auto bg-white bg-gray-100 rounded-3xl no-scrollbar ">
          <div className="flex items-center space-x-2 whitespace-nowrap p-3">
            {templates.map((template, index) => (
              <button
                key={`${template}-${index}`}
                onClick={() => onTemplateChange(template)}
                className={`px-4 py-2 rounded-2xl text-sm transition ${
                  activeTemplate === template
                    ? "bg-gray-800 text-white font-bold"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {template.charAt(0).toUpperCase() + template.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons section */}
        <div className="flex-none">
          <div className="flex items-center space-x-3  p-3">
            <button
              onClick={handleViewClick} // The logic inside this function has changed.
              className="px-4 py-2 bg-black text-white rounded-3xl border border-black transition-all duration-300 hover:bg-white hover:text-black"
            >
              View
            </button>

            <button
              onClick={onPublishToggle}
              disabled={publishStatus === "loading"}
              className={`px-4 py-2 rounded-3xl border transition-all duration-300 ${publishButtonClass} disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {publishStatus === "loading" ? "Updating..." : publishButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;