"use client";

import React from "react";
import {
  User,
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
  { label: "About Me",   icon: <IdCard size={16} /> },
  { label: "Education",  icon: <BookOpen size={16} /> },
  { label: "Experience", icon: <Briefcase size={16} /> },
  { label: "Projects",   icon: <FolderKanban size={16} /> },
  { label: "Skills",     icon: <Wrench size={16} /> },
  { label: "Achievements", icon: <Trophy size={16} /> },
  { label: "Blogs",      icon: <NotebookPen size={16} /> },
  { label: "Social",     icon: <Share2 size={16} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  return (
    <nav className="h-full w-full">
      <ul className="flex flex-col gap-2">
        {sections.map(({ label, icon }) => {
          const isActive = active === label;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(label)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition
                  ${isActive
                    ? "bg-green-600 text-white shadow"
                    : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="shrink-0">{icon}</span>
                <span className="truncate">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
