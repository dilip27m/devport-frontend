"use client";

import React from "react";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";

interface SkillsViewProps {
  skills: SkillCategory[];
}

const SkillsView: React.FC<SkillsViewProps> = ({ skills }) => {
  if (!skills || skills.length === 0) {
    skills = [
      {
        name: "Frontend",
        skills: ["html", "css", "javascript", "react"],
      },
      {
        name: "Backend",
        skills: ["nodejs", "express"],
      },
    ];
  }

  return (
    <section
      id="skills-section"
      className="p-4 sm:p-6 lg:p-12 max-w-6xl mx-auto animate-section"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-10 text-center">Skills</h2>

      <div className="space-y-6 sm:space-y-10">
        {skills.map((category, index) => (
          <div
            key={index}
            className="glass-bg p-4 sm:p-6 rounded-xl neon-border shadow-xl"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5 pl-1 text-white">
              {category.name}
            </h3>

            <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-3 sm:gap-6">
              {category.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 rounded-xl flex flex-col items-center justify-center glass-bg neon-border hover:scale-[1.06] transition-all"
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${skill}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                    onError={(e) =>
                      (e.currentTarget.style.display = "none")
                    }
                  />

                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm capitalize text-slate-200">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsView;