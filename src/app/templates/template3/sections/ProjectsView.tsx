"use client";

import React from "react";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { Calendar, Github as GithubIcon } from "lucide-react";

const ProjectsView = ({ projects }: { projects?: Project[] }) => {
  const safeProjects = projects || [];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const computeDuration = (start?: string, end?: string) => {
    if (!start) return "";
    const s = new Date(start);
    const e = end ? new Date(end) : new Date();
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

  const getStackArray = (project: Project) => {
    if (project.stack && project.stack.length > 0) return project.stack;
    if (project.techStack && project.techStack.trim() !== "") {
      return project.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  // infer label: GitHub stays, empty/view => Others, otherwise keep user label
  const inferLabel = (label: string | undefined, url: string) => {
    const u = url.toLowerCase();
    if (u.includes("github.com")) return "GitHub";
    if (!label || label.trim() === "" || label.trim().toLowerCase() === "view") return "Others";
    return label.trim();
  };

  // sanitize, dedupe by normalized URL, order GitHub first, and return final labels
  const sanitizeAndOrderLinks = (links?: { label?: string; url?: string }[]) => {
    const valid = (links || []).filter((l) => l && typeof l.url === "string" && l.url.trim() !== "");

    const normalizeUrl = (raw: string) => {
      const r = raw.trim();
      if (r.startsWith("http://") || r.startsWith("https://")) return r;
      return `https://${r}`;
    };

    const seen = new Set<string>();
    const deduped: { label: string; url: string }[] = [];

    for (const l of valid) {
      const url = normalizeUrl(l!.url!);
      const key = url.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push({
          label: inferLabel(l!.label, url),
          url,
        });
      }
    }

    // GitHub first (stable relative order otherwise)
    deduped.sort((a, b) => {
      const aGh = a.url.toLowerCase().includes("github.com") ? 0 : 1;
      const bGh = b.url.toLowerCase().includes("github.com") ? 0 : 1;
      return aGh - bGh;
    });

    return deduped;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {safeProjects.map((project, index) => {
          const stackArr = getStackArray(project);
          const linksOrdered = sanitizeAndOrderLinks(project.links);

          return (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col min-w-0"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-950 to-black flex-none">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {project.type && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                      {project.type}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 min-h-0 min-w-0">
                <h3 className="font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 break-words break-all">
                  {project.title}
                </h3>

                <p
                  className="text-gray-400 text-sm leading-relaxed mb-4 break-words break-all whitespace-normal overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {project.description}
                </p>

                {(project.startDate || project.endDate) && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Calendar size={14} />
                    <span>
                      {formatDate(project.startDate)} - {formatDate(project.endDate) || "Present"}
                      {project.startDate ? ` · ${computeDuration(project.startDate, project.endDate)}` : ""}
                    </span>
                  </div>
                )}

                {stackArr && stackArr.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stackArr.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-800/50 border border-gray-700 rounded-md text-gray-300">
                        {tech}
                      </span>
                    ))}
                    {stackArr.length > 4 && <span className="px-2 py-1 text-xs text-gray-500">+{stackArr.length - 4} more</span>}
                  </div>
                )}

                {/* Links */}
                {linksOrdered.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800/50 mt-auto">
                    {linksOrdered.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 hover:text-blue-300 transition-all"
                      >
                        {/* Show GitHub icon only for GitHub label */}
                        {link.label === "GitHub" && <GithubIcon size={14} />}
                        {/* Others (or any other explicit label) has NO icon */}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(!safeProjects || safeProjects.length === 0) && (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-6">
            <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No projects to display yet.</p>
        </div>
      )}
    </section>
  );
};

export default ProjectsView;
