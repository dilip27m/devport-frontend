"use client";

import React from "react";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";
import { Briefcase, ExternalLink } from "lucide-react";

/** helper: format date as 'MMM yyyy' */
const formatDateMMMYYYY = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

/** helper: compute human-friendly duration between two dates */
const computeDurationFriendly = (
  start?: string,
  end?: string,
  isPresent?: boolean
) => {
  if (!start) return "";
  const s = new Date(start);
  const e = isPresent || !end ? new Date() : new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";

  let years = e.getFullYear() - s.getFullYear();
  let months = e.getMonth() - s.getMonth();
  let totalMonths = years * 12 + months;

  if (e.getDate() < s.getDate()) totalMonths -= 1;
  if (totalMonths < 0) totalMonths = 0;

  if (totalMonths < 1) return "<1 mo";
  if (totalMonths < 12) {
    return `${totalMonths} mo${totalMonths > 1 ? "s" : ""}`;
  }
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo${m > 1 ? "s" : ""}`;
};

const ExperienceView: React.FC<{ experiences: Experience[] }> = ({
  experiences,
}) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Work Experience</h2>
        <p className="text-gray-400 text-xs">My professional journey</p>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => {
          const startFriendly = formatDateMMMYYYY(exp.startDate) || "";
          const endFriendly = exp.isPresent
            ? "Present"
            : formatDateMMMYYYY(exp.endDate) || "";
          const durationFriendly = computeDurationFriendly(
            exp.startDate,
            exp.endDate,
            exp.isPresent
          );

          const bullets =
            exp.descriptionBullets?.filter(
              (b) => b && b.trim().length > 0
            ) ?? [];

          const stack = exp.stack ?? [];

          const validLinks =
            exp.links?.filter(
              (l) => l && l.url && l.url.trim().length > 0
            ) ?? [];

          return (
            <div
              key={index}
              className="group bg-[#0d1117] border border-gray-800 rounded-lg p-4 hover:border-green-500/60 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#161b22] border border-gray-800 rounded-lg group-hover:border-green-400 transition-colors">
                    <Briefcase className="text-green-400" size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Top row: role/company + dates */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors truncate">
                        {exp.role || "Role not specified"}
                      </h3>
                      {exp.company && (
                        <p className="font-semibold text-gray-400 text-xs">
                          {exp.company}
                        </p>
                      )}
                    </div>

                    {(startFriendly || endFriendly || durationFriendly) && (
                      <p className="text-[11px] text-gray-500 flex-shrink-0 text-right">
                        {startFriendly &&
                          `${startFriendly} ${
                            endFriendly ? "→ " + endFriendly : ""
                          }`}
                        {durationFriendly && (
                          <span className="ml-1">· {durationFriendly}</span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Tech stack badges */}
                  {stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {stack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] rounded-full bg-gray-900 border border-gray-700 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {stack.length > 4 && (
                        <span className="px-2 py-0.5 text-[11px] text-gray-500">
                          +{stack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bullet points */}
                  {bullets.length > 0 && (
                    <ul className="list-disc pl-4 space-y-1 text-gray-400 text-xs leading-relaxed">
                      {bullets.map((b, i) => (
                        <li key={i} className="break-words">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Links */}
                  {validLinks.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {validLinks.map((link, i) => {
                        let url = link.url.trim();
                        if (
                          !url.startsWith("http://") &&
                          !url.startsWith("https://")
                        ) {
                          url = `https://${url}`;
                        }

                        return (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-full bg-gray-900 border border-gray-700 text-gray-300 hover:text-green-400 hover:border-green-400 transition-colors"
                          >
                            <ExternalLink size={12} />
                            <span className="truncate max-w-[140px]">
                              {link.label || "View"}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceView;