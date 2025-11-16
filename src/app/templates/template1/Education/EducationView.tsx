"use client";

import React from "react";
import { Education } from "@/app/(main)/editor/components/forms/EducationForm";

const formatDuration = (edu: Education) => {
  const { startMonth, startYear, endMonth, endYear } = edu;
  if (!startYear && !startMonth) return null;

  const start = [startMonth, startYear].filter(Boolean).join(" ");
  const end =
    endYear === "Present"
      ? "Present"
      : [endMonth, endYear].filter(Boolean).join(" ");

  return `${start} - ${end}`;
};

const EducationView: React.FC<{ education: Education[] }> = ({ education }) => {
  // ⭐ DEFAULT SAMPLE when empty
  if (!education || education.length === 0) {
    education = [
      {
        degree: "Bachelor of Technology (B.Tech) in Computer Science",
        institution: "Amrita Vishwa Vidyapeetham",
        startMonth: "July",
        startYear: "2023",
        endMonth: "",
        endYear: "Present",
        grade: "—",
      } as Education,
    ];
  }

  return (
    <section
      id="education-section"
      className="p-6 lg:p-12 max-w-4xl mx-auto animate-section"
    >
      <h2 className="text-3xl font-extrabold mb-10 text-center">Education</h2>

      <div className="relative pl-10">
        <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00b3ff55] to-[#9b5cff55] rounded-full"></div>

        <div className="space-y-10">
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative glass-bg p-6 rounded-xl neon-border hover:scale-[1.015] transition-all shadow-xl"
            >
              <div
                className="absolute -left-[33px] top-5 w-7 h-7 rounded-full
                bg-gradient-to-br from-[#00b3ff] to-[#9b5cff]
                shadow-[0_0_15px_rgba(0,180,255,0.5)] border border-white/10"
              ></div>

              <p className="text-sm text-slate-300 mb-1">
                {formatDuration(edu)}
              </p>

              <h3 className="text-2xl font-semibold text-white">
                {edu.degree}
              </h3>

              <p className="text-lg text-[#9b5cff] font-medium">
                {edu.institution}
              </p>

              {edu.grade && (
                <p className="text-slate-300 mt-3">Grade: {edu.grade}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationView;
