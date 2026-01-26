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
  LucideIcon,
} from "lucide-react";

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
  isMobile?: boolean;
}

const sections: { label: string; Icon: LucideIcon }[] = [
  { label: "About Me", Icon: IdCard },
  { label: "Education", Icon: BookOpen },
  { label: "Experience", Icon: Briefcase },
  { label: "Projects", Icon: FolderKanban },
  { label: "Skills", Icon: Wrench },
  { label: "Achievements", Icon: Trophy },
  { label: "Blogs", Icon: NotebookPen },
  { label: "Social", Icon: Share2 },
];

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect, isMobile = false }) => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  // Mobile: Horizontal scrollable layout
  if (isMobile) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 overflow-hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {sections.map(({ label, Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelect(label)}
                className={`
                  flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium 
                  transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop: Vertical icon-only layout
  return (
    <nav className="h-full w-full flex flex-col items-center py-2">
      <ul className="flex flex-col gap-2">
        {sections.map(({ label, Icon }) => {
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
                <Icon size={20} />
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
