"use client";

import React from "react";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";

interface SkillsViewProps {
  skills: SkillCategory[];
}

const SkillsView: React.FC<SkillsViewProps> = ({ skills }) => {
  // ⭐ DEFAULT SAMPLE SKILLS
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
      className="p-6 lg:p-12 max-w-6xl mx-auto animate-section"
    >
      <h2 className="text-3xl font-extrabold mb-10 text-center">Skills</h2>

      <div className="space-y-10">
        {skills.map((category, index) => (
          <div
            key={index}
            className="glass-bg p-6 rounded-xl neon-border shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-5 pl-1 text-white">
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-6">
              {category.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="w-32 h-32 rounded-xl flex flex-col items-center justify-center glass-bg neon-border hover:scale-[1.06] transition-all"
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${skill}`}
                    className="w-14 h-14"
                    onError={(e) =>
                      (e.currentTarget.style.display = "none")
                    }
                  />

                  <p className="mt-3 text-sm capitalize text-slate-200">
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