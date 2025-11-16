"use client";
import React, { useState } from "react";
import { User, Briefcase, PenSquare } from "lucide-react";

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activePage, setActivePage] = useState("home");

  const navItems = [
    { id: "home", label: "About Me", icon: <User size={16} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={16} /> },
    { id: "blogs", label: "Blogs", icon: <PenSquare size={16} /> },
  ];

  const handleNavigate = (page: string) => {
    setActivePage(page);
    onNavigate(page);
  };

  return (
    <nav className="w-full bg-white/5 glass-bg rounded-xl shadow-xl my-4 mx-auto max-w-4xl px-6 py-3">
      <div className="flex justify-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all
              ${activePage === item.id
                ? "bg-gradient-to-r from-[#00b3ff] to-[#9b5cff] text-white shadow-lg"
                : "text-slate-300 hover:text-white"}
            `}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;