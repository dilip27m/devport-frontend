"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Cpu, Briefcase, Mail } from "lucide-react";

const navItems = [
  { name: "Home", icon: <Home size={18} />, id: "hero" },
  { name: "About", icon: <User size={18} />, id: "about" },
  { name: "Skills", icon: <Cpu size={18} />, id: "skills" },
  { name: "Work", icon: <Briefcase size={18} />, id: "projects" },
  { name: "Contact", icon: <Mail size={18} />, id: "contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("hero");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // 1. FIXED: Stays permanently on top.
    // 2. z-[100]: Ensures it's above everything.
    // 3. pointer-events-none: Lets you click things to the left/right of the island.
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        // 4. BG-OPACITY: Changed to /60 so the blur is visible.
        // 5. BACKDROP-BLUR: The 'glass' effect.
        className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full 
                   bg-zinc-950/60 backdrop-blur-md 
                   border border-amber-500/30 
                   shadow-[0_0_20px_rgba(245,158,11,0.15)]"
      >
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2
                ${isActive ? "text-black" : "text-zinc-400 hover:text-amber-400"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-amber-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                <span className="hidden md:inline">{item.name}</span>
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}