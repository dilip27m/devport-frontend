"use client";

import React, { useState } from "react";
import {
  IdCard,
  BookOpen,
  Briefcase,
  FolderKanban,
  Wrench,
  Trophy,
  NotebookPen,
  Share2,
} from "lucide-react";

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
}

const sections: { label: string; icon: React.ReactNode }[] = [
  { label: "About Me", icon: <IdCard size={20} /> },
  { label: "Education", icon: <BookOpen size={20} /> },
  { label: "Experience", icon: <Briefcase size={20} /> },
  { label: "Projects", icon: <FolderKanban size={20} /> },
  { label: "Skills", icon: <Wrench size={20} /> },
  { label: "Achievements", icon: <Trophy size={20} /> },
  { label: "Blogs", icon: <NotebookPen size={20} /> },
  { label: "Social", icon: <Share2 size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  return (
    <nav className="h-full w-full flex flex-col items-center py-2">
      <ul className="flex flex-col gap-2">
        {sections.map(({ label, icon }) => {
          const isActive = active === label;
          const isHovered = hoveredLabel === label;

          return (
            <li key={label} className="relative">
              <button
                type="button"
                onClick={() => onSelect(label)}
                onMouseEnter={() => setHoveredLabel(label)}
                onMouseLeave={() => setHoveredLabel(null)}
                className={`
                  w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
                aria-label={label}
              >
                {icon}
              </button>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50">
                  <div className="bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                    {label}
                    {/* Arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900" />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
