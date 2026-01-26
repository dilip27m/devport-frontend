"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export type SectionId = "portfolio" | "projects" | "skills" | "blogs";

export const HEADER_HEIGHT_PX = 96;

const NAV_ITEMS = [
  { id: "portfolio", label: "Portfolio" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blogs" },
] as const;

type Props = {
  activePage: SectionId;
  onNavigate: (id: SectionId) => void;
};

const Header: React.FC<Props> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const NavLink = ({ id, label }: { id: SectionId; label: string }) => {
    const active = activePage === id;
    return (
      <button
        onClick={() => handleNavigate(id)}
        aria-current={active ? "page" : undefined}
        className={`
          relative px-3 sm:px-5 py-2 text-sm sm:text-base font-medium transition-all duration-200 rounded-lg
          ${active
            ? "text-white opacity-100 translate-y-[-1px]"
            : "text-gray-300 opacity-70 hover:opacity-100 hover:text-white/90"
          }
        `}
      >
        <span className="relative z-10">{label}</span>

        {active && (
          <span
            className="absolute left-0 right-0 bottom-[2px] mx-auto h-[2px] w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #ffffff30, #ffffff90, #ffffff30)",
              boxShadow: "0 0 8px rgba(255,255,255,0.28)",
            }}
          />
        )}
      </button>
    );
  };

  const MobileNavLink = ({ id, label }: { id: SectionId; label: string }) => {
    const active = activePage === id;
    return (
      <button
        onClick={() => handleNavigate(id)}
        className={`w-full text-left px-4 py-3 text-base font-medium transition-colors ${active ? "text-blue-400 bg-white/5" : "text-gray-300 hover:text-white hover:bg-white/5"
          }`}
      >
        {label}
      </button>
    );
  };

  return (
    <header
      style={{ height: `${HEADER_HEIGHT_PX}px` }}
      className="absolute top-3 left-0 right-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div className="relative w-[95%] sm:w-[92%] max-w-6xl">

        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          style={{
            boxShadow:
              "0 6px 45px rgba(0,0,0,0.85), 0 0 22px rgba(80,120,255,0.05)",
            filter: "blur(4px)",
          }}
        />

        <nav
          aria-label="Primary"
          className="
            relative rounded-2xl sm:rounded-3xl
            backdrop-blur-xl
            bg-gradient-to-b from-white/10 to-white/5
            border border-white/10
            px-4 sm:px-8 py-3 sm:py-4
            flex items-center justify-between
          "
        >
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.04), inset 0 -1px 1px rgba(0,0,0,0.45)",
            }}
          />

          {/* Logo/Portfolio Button */}
          <button
            onClick={() => handleNavigate("portfolio")}
            aria-current={activePage === "portfolio" ? "page" : undefined}
            className={`
              relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-base sm:text-lg transition-all duration-200
              ${activePage === "portfolio"
                ? "text-blue-400"
                : "text-blue-300 hover:text-blue-400"
              }
            `}
          >
            <span className="relative z-20">Portfolio</span>

            {activePage === "portfolio" && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 18px rgba(50,120,255,0.30), 0 0 8px rgba(50,120,255,0.25)",
                  filter: "blur(6px)",
                }}
              />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 pr-4">
            {NAV_ITEMS.filter((n) => n.id !== "portfolio").map((item) => (
              <NavLink key={item.id} id={item.id} label={item.label} />
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors relative z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl z-50 py-2 md:hidden overflow-hidden">
            {NAV_ITEMS.map((item) => (
              <MobileNavLink key={item.id} id={item.id} label={item.label} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;