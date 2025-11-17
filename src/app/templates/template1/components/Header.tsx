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
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
  userName?: string;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "about", label: "Home" }, 
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blog" },
];

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, userName }) => {
  const current = (activeSection || "").toLowerCase();

  const getInitial = () => {
    if (!userName || !userName.trim()) return "A";
    return userName.trim().charAt(0).toUpperCase();
  };

  const NavLink: React.FC<{ id: SectionId; children: React.ReactNode }> = ({
    id,
    children,
  }) => {
    const isActive = current === id;
    return (
      <button
        onClick={() => onNavigate(id)}
        className={`px-4 py-2 font-semibold text-base transition-colors duration-200 ${
          isActive ? "text-green-400" : "text-gray-300 hover:text-white"
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
      className="flex items-center justify-between w-full"
      role="navigation"
      aria-label="Primary"
    >
      <button 
        onClick={() => onNavigate("about")}
        className="text-2xl font-bold text-white hover:text-green-400 transition-colors"
      >
        {`{${getInitial()}}`}
      </button>
      
      <div className="flex items-center gap-2">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.id} id={item.id}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Header;