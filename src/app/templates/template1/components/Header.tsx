"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const current = (activeSection || "").toLowerCase();

  const getInitial = () => {
    if (!userName || !userName.trim()) return "A";
    return userName.trim().charAt(0).toUpperCase();
  };

  const handleNavigate = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const NavLink: React.FC<{ id: SectionId; children: React.ReactNode; mobile?: boolean }> = ({
    id,
    children,
    mobile = false,
  }) => {
    const isActive = current === id;
    return (
      <button
        onClick={() => handleNavigate(id)}
        className={`${mobile ? 'w-full text-left px-4 py-3' : 'px-4 py-2'} font-semibold text-base transition-colors duration-200 ${isActive ? "text-green-400" : "text-gray-300 hover:text-white"
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
      className="flex items-center justify-between w-full relative"
      role="navigation"
      aria-label="Primary"
    >
      <button
        onClick={() => handleNavigate("about")}
        className="text-xl sm:text-2xl font-bold text-white hover:text-green-400 transition-colors"
      >
        {`{${getInitial()}}`}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-1 md:gap-2">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.id} id={item.id}>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="sm:hidden p-2 text-gray-300 hover:text-white transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#161b22] border border-gray-700 rounded-lg shadow-xl z-50 py-2 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} id={item.id} mobile>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;