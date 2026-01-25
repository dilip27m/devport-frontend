"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Layers } from "lucide-react";

export type SaveStatus = "idle" | "saving" | "success" | "error";

interface BottomBarProps {
  activeTemplate: string;
  onTemplateChange: (template: string) => void;
  onSave: () => void;
  saveStatus: SaveStatus;
  lastSaved: string | null;
  hasUnsavedChanges: boolean;
}

const templates = [
  "template1",
  "template2",
  "template3",
  "template4",
  "template5",
];

const BottomBar: React.FC<BottomBarProps> = ({
  activeTemplate,
  onTemplateChange,
  onSave,
  saveStatus,
  lastSaved,
  hasUnsavedChanges,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewClick = () => {
    const previewUrl = "/preview";
    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  // Save button styling based on status
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return {
          text: "Saving...",
          disabled: true,
          className: "bg-gray-400 text-white cursor-not-allowed",
        };
      case "success":
        return {
          text: "Saved ✓",
          disabled: false,
          className: "bg-green-600 text-white hover:bg-green-700",
        };
      case "error":
        return {
          text: "Save Failed",
          disabled: false,
          className: "bg-red-500 text-white hover:bg-red-600",
        };
      default:
        return {
          text: "Save",
          disabled: false,
          className: "bg-green-600 text-white hover:bg-green-700",
        };
    }
  };

  const saveBtn = getSaveButtonContent();
  const formattedTemplate = activeTemplate.charAt(0).toUpperCase() + activeTemplate.slice(1);

  return (
    <div className="px-6 py-3 border-t bg-white z-50">
      <div className="flex w-full items-center justify-between gap-4">

        {/* Template Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border border-gray-200 hover:bg-gray-200 transition-colors"
          >
            <Layers size={16} className="text-gray-600" />
            <span className="font-medium text-gray-800">{formattedTemplate}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="py-1 max-h-60 overflow-y-auto">
                {templates.map((template) => {
                  const isActive = activeTemplate === template;
                  const label = template.charAt(0).toUpperCase() + template.slice(1);
                  return (
                    <button
                      key={template}
                      onClick={() => {
                        onTemplateChange(template);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <span>{label}</span>
                      {isActive && <Check size={16} className="text-green-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Status + Actions */}
        <div className="flex items-center gap-4">
          {/* Unsaved or Last Saved indicator */}
          {hasUnsavedChanges ? (
            <span className="text-xs text-orange-500 font-medium hidden sm:block">
              ● Unsaved changes
            </span>
          ) : lastSaved && saveStatus === "idle" ? (
            <span className="text-xs text-gray-500 hidden sm:block">
              Last saved: {lastSaved}
            </span>
          ) : null}

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={saveBtn.disabled}
            className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${saveBtn.className} disabled:cursor-not-allowed`}
          >
            {saveBtn.text}
          </button>

          {/* View Button */}
          <button
            onClick={handleViewClick}
            className="px-5 py-2 bg-gray-900 text-white rounded-xl font-medium transition-all duration-300 hover:bg-gray-700"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;