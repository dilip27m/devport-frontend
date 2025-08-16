"use client";

import React from "react";

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
}

const sections = [
  "Profile",
  "Skills",
  "Projects",
  "Certifications",
  "Blogs",
  "Activities",
];

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  return (
    <div className="text-white  flex flex-col space-y-6">
      <h2 className="text-xl font-bold mb-4">Sections</h2>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSelect(section)}
          className={`text-left px-3 py-2 rounded-lg transition ${
            active === section
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-700 text-gray-300"
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
