"use client";
import React from "react";

type SectionId =
  | "about"
  | "projects"
  | "education"
  | "skills"
  | "experience"
  | "achievements"
  | "blogs"
  | "socials"
  | "contact";

interface HeaderProps {
  activeSection: string; // can be any string from your observer/router
  onNavigate: (sectionId: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "blogs", label: "Blogs" },
  { id: "socials", label: "Socials" }, // ✅ lowercase to match <section id="socials">
  { id: "contact", label: "Contact" },
];

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const current = (activeSection || "").toLowerCase();

  const NavLink: React.FC<{ id: SectionId; children: React.ReactNode }> = ({
    id,
    children,
  }) => {
    const isActive = current === id;
    return (
      <button
        onClick={() => onNavigate(id)}
        className={`px-4 py-2 font-semibold text-sm transition-colors duration-200 rounded-lg ${
          isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
        }`}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Go to ${children}`}
      >
        {children}
      </button>
    );
  };

  return (
    <nav
      className="inline-flex items-center p-2 bg-black/20 border border-gray-700 rounded-2xl space-x-1 flex-wrap justify-center"
      role="navigation"
      aria-label="Primary"
    >
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.id} id={item.id}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Header;