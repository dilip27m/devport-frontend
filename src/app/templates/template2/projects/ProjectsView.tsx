"use client";
import React from "react";
import { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";

interface ProjectsViewProps {
  projects: Project[];
  limit?: number;
}

/** helper: format date as 'MMM yyyy' */
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

/** helper: compute duration between two dates; returns things like '3 months' / '1 yr 2 mos' */
const computeDuration = (start?: string, end?: string) => {
  if (!start) return "";
  const s = new Date(start);
  const e = end ? new Date(end) : new Date(); // if no end, use now
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";

  const years = e.getFullYear() - s.getFullYear();
  const months = e.getMonth() - s.getMonth();
  let totalMonths = years * 12 + months;

  const dayDiff = e.getDate() - s.getDate();
  if (dayDiff < 0) totalMonths -= 1;

  if (totalMonths < 0) totalMonths = 0;

  if (totalMonths < 1) return "<1 month";
  if (totalMonths < 12) return `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo${m > 1 ? "s" : ""}`;
};

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, limit }) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  const isLatestSection = !!limit;

  if (!displayProjects || displayProjects.length === 0) {
    if (isLatestSection) return null;
    return (
      <section className="py-12 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
        <p className="text-gray-400 text-sm">
          No projects have been added yet.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12">
      {isLatestSection && (
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-xs">
              A quick look at things I&apos;ve been building recently.
            </p>
          </div>
          <button
            onClick={() => {
              const event = new CustomEvent("navigate-to-projects");
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors text-xs font-medium cursor-pointer"
          >
            View all
            <ExternalLink size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project, index) => {
          const validLinks =
            project.links?.filter(
              (l) => l && l.url && l.url.trim().length > 0
            ) ?? [];

          // --- date + duration for card ---
          const hasDates = project.startDate || project.endDate;
          const friendlyDates = hasDates
            ? `${formatDate(project.startDate) || "—"} → ${
                formatDate(project.endDate) || "Present"
              }`
            : "";
          const duration = project.startDate
            ? computeDuration(project.startDate, project.endDate)
            : "";

          return (
            <article
              key={index}
              className="group bg-[#0b0f16] border border-gray-800/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-green-500/60 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-40 w-full bg-[#05070c] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-700" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title + type */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                    {project.title || "Untitled Project"}
                  </h3>
                  {project.type && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] rounded-full bg-gray-800 border border-gray-700 text-gray-300 whitespace-nowrap">
                      {project.type}
                    </span>
                  )}
                </div>

                {/* Dates + duration */}
                {friendlyDates && (
                  <p className="text-[11px] text-gray-500 mb-2">
                    {friendlyDates} {duration ? `· ${duration}` : ""}
                  </p>
                )}

                {/* Description */}
                {project.description && (
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.slice(0, 3).map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-2 py-0.5 text-[11px] rounded-full bg-gray-900 border border-gray-700 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-2 py-0.5 text-[11px] text-gray-500">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                {validLinks.length > 0 && (
                  <div className="mt-auto pt-3 border-t border-gray-800 flex flex-wrap gap-2">
                    {validLinks.map((link, linkIndex) => {
                      const isGithub = link.label?.toLowerCase().includes("github");

                      // AUTO FIX URL
                      let url = link.url.trim();
                      if (!url.startsWith("http://") && !url.startsWith("https://")) {
                        url = `https://${url}`;
                      }

                      return (
                        <a
                          key={linkIndex}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-full bg-gray-900 border border-gray-700 text-gray-300 hover:text-green-400 hover:border-green-400 transition-colors"
                        >
                          {isGithub && <Github size={12} />}
                          <span className="truncate max-w-[120px]">
                            {link.label || "View"}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsView;