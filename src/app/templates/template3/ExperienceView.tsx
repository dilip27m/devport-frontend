"use client";

import React from "react";
import { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";
import { format, differenceInMonths } from "date-fns";

const formatExperienceDuration = (start: string, end: string) => {
  if (!start) return null;
  try {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    const totalMonths = differenceInMonths(endDate, startDate);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let duration = "";
    if (years) duration += `${years} yr${years !== 1 ? "s" : ""} `;
    if (months) duration += `${months} mo${months !== 1 ? "s" : ""}`;

    return {
      range: `${format(startDate, "MMM yyyy")} - ${
        end ? format(endDate, "MMM yyyy") : "Present"
      }`,
      duration: duration.trim(),
    };
  } catch {
    return { range: "Invalid Dates", duration: "" };
  }
};

const ExperienceView: React.FC<{
  experiences: (Experience & { description?: string })[];
}> = ({ experiences }) => {
  if (!experiences || experiences.length === 0) {
    experiences = [
      {
        role: "Frontend Developer",
        company: "TechCorp Solutions",
        startDate: "2023-01-01",
        endDate: "",
        description:
          "Worked on UI components, dashboards, and responsive interfaces using React and Tailwind.",
        descriptionBullets: ["Built dashboard UI", "Optimized React rendering"],
        stack: ["React", "Tailwind", "JavaScript"],
        links: [],
      },
    ] as any;
  }

  return (
    <section
      id="experience-section"
      className="p-6 lg:p-12 max-w-5xl mx-auto animate-section"
    >
      <h2 className="text-3xl font-extrabold mb-10 text-center">
        Work Experience
      </h2>

      <div className="relative pl-10">
        <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00b3ff55] to-[#9b5cff55] rounded-full"></div>

        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const dur = formatExperienceDuration(exp.startDate, exp.endDate);

            return (
              <div
                key={index}
                className="relative glass-bg p-6 rounded-xl neon-border shadow-xl hover:scale-[1.015] transition-all"
              >
                <div
                  className="absolute -left-[33px] top-6 w-8 h-8 rounded-full 
                  bg-gradient-to-br from-[#00b3ff] to-[#9b5cff]
                  shadow-[0_0_15px_rgba(0,180,255,0.6)]
                  flex items-center justify-center text-white"
                >
                  {exp.company?.[0]}
                </div>

                <p className="text-sm text-slate-300 mb-1">
                  {dur?.range}
                  {dur?.duration && (
                    <span className="text-[#00b3ff] ml-2">
                      • {dur.duration}
                    </span>
                  )}
                </p>

                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>

                <p className="text-[#9b5cff] font-medium text-lg">
                  {exp.company}
                </p>

                {exp.description && (
                  <p className="text-slate-300 mt-4 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}

{exp.stack && (
  <div className="flex flex-wrap gap-2 mt-4">
    {(Array.isArray(exp.stack)
      ? exp.stack
      : String(exp.stack)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
    ).map((tech, i) => (
      <span
        key={i}
        className="px-3 py-1 text-xs rounded-full bg-[#00b3ff11] text-[#00b3ff] border border-[#00b3ff33]"
      >
        {tech}
      </span>
    ))}
  </div>
)}


                {exp.descriptionBullets &&
                  exp.descriptionBullets.filter((b) => b.trim() !== "")
                    .length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {exp.descriptionBullets
                        .filter((b) => b.trim() !== "")
                        .map((b, i) => (
                          <li
                            key={i}
                            className="text-slate-300 flex items-start gap-2"
                          >
                            <span className="text-[#00b3ff] mt-[3px]">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceView;