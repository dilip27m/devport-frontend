"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Database, Layout, Code2, Terminal, Grip, Sparkles } from "lucide-react";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";

// --- Helpers for content ---
const getSkillDescription = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes("react") || s.includes("vue") || s.includes("next")) return "A powerful modern UI library for building interactive interfaces.";
  if (s.includes("node") || s.includes("python") || s.includes("java")) return "Robust backend technology for scalable server-side logic.";
  if (s.includes("sql") || s.includes("mongo") || s.includes("redis")) return "High-performance database solution for data management.";
  if (s.includes("aws") || s.includes("docker") || s.includes("git")) return "Essential DevOps and deployment tool for modern CI/CD pipelines.";
  return "A key technology in my technical arsenal for building professional grade software.";
};

export default function SkillsPhysics({ skills }: { skills: SkillCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  // Stores the name of the skill that currently has its popup open
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Extract Categories
  const categories = useMemo(() => {
    const cats = skills.map(s => s.name);
    return ["All", ...cats];
  }, [skills]);

  // 2. Filter Skills based on selection
  const visibleSkills = useMemo(() => {
    if (selectedCategory === "All") {
      return skills.flatMap(cat => cat.skills.map(s => ({ name: s, category: cat.name })));
    }
    const cat = skills.find(c => c.name === selectedCategory);
    return cat ? cat.skills.map(s => ({ name: s, category: cat.name })) : [];
  }, [skills, selectedCategory]);

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-zinc-950 min-h-[800px]">
      <div className="max-w-6xl mx-auto text-center h-full flex flex-col">
        
        {/* Header */}
        <div className="mb-12 z-20 relative">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Technical Proficiency</h2>
           <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
           <p className="mt-4 text-zinc-500 text-sm font-mono tracking-wide">
             DRAG TO REVEAL // INTERACTIVE MODULE
           </p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                  setSelectedCategory(cat);
                  setActiveBubble(null); // Close popups on filter change
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
              ${selectedCategory === cat 
                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-amber-500/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* --- PHYSICS BUBBLES CLOUD --- */}
        {/* We use a ref constraint so dragging stays within this area */}
        <div ref={containerRef} className="relative flex-grow w-full flex flex-wrap justify-center content-center gap-8 py-10">
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill, i) => {
              const isActive = activeBubble === skill.name;
              
              return (
                <motion.div
                  key={`${skill.name}-${i}`}
                  layout
                  // 1. Dragging Logic
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.1}
                  dragMomentum={false} // Stops exactly where you release it
                  
                  // 2. Event Handlers
                  onDragStart={() => setActiveBubble(null)} // Close others when dragging starts
                  onDragEnd={() => setActiveBubble(skill.name)} // Open this one when dropped
                  onClick={() => setActiveBubble(isActive ? null : skill.name)} // Toggle on click too

                  // 3. Animation
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                      opacity: 1, 
                      scale: isActive ? 1.2 : 1,
                      zIndex: isActive ? 50 : 1 
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  
                  // Floating animation (only when NOT active/dragged)
                  whileInView={!isActive ? {
                      y: [0, -10, 0],
                      transition: { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }
                  } : {}}

                  whileHover={{ scale: 1.1, cursor: "grab", zIndex: 40 }}
                  whileTap={{ scale: 0.95, cursor: "grabbing" }}
                  
                  // Styling: The Bubble itself
                  className={`relative flex items-center justify-center w-max px-6 py-3 rounded-full font-bold select-none transition-colors duration-300
                    ${isActive 
                        ? "bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.6)] border-2 border-white" 
                        : "bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-amber-500/50 hover:text-white"
                    }
                  `}
                >
                    <div className="flex items-center gap-2 pointer-events-none">
                        {isActive && <Sparkles size={14} className="animate-pulse" />}
                        <span>{skill.name}</span>
                        {!isActive && <Grip size={12} className="opacity-30" />}
                    </div>

                    {/* --- THE FLOATING POPUP (Beside the bubble) --- */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                // Positioned to the right of the bubble
                                className="absolute left-full ml-6 top-1/2 -translate-y-1/2 w-72 p-6 rounded-xl 
                                           bg-zinc-950/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl text-left z-50 pointer-events-none"
                            >
                                {/* Connector Line */}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 w-6 h-[1px] bg-amber-500/50"></div>
                                <div className="absolute right-full top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full -ml-1"></div>

                                {/* Content */}
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                                        {skill.category}
                                    </span>
                                    <Cpu size={14} className="text-amber-500" />
                                </div>
                                
                                <h3 className="text-white font-bold text-xl mb-3 tracking-tight">{skill.name}</h3>
                                
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {getSkillDescription(skill.name)}
                                </p>
                                
                                <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center">
                                    <span className="text-[10px] text-zinc-600 font-mono">STATUS: ACTIVE</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}