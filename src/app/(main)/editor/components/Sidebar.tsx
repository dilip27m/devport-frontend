"use client";

import React from "react";

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
}

const sections = [
  "Profile",
  "Projects",
  "Skills",
  "Experience",
  "Education",
  "Contact",
];

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  return (
    <div className="flex flex-col space-y-3 text-base text-gray-800">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSelect(section)}
          className={`text-left px-4 py-2 rounded-2xl transition-colors duration-200 font-medium ${
            active === section
              ? "bg-gray-200 text-gray-900"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;