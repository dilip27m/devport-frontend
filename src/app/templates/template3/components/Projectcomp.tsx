"use client";

import React from "react";
import { Github } from "lucide-react";

interface LinkItem {
  label?: string;
  url?: string;
}

interface ProjectCardProps {
  title?: string;
  description?: string;
  link?: string;
  image?: string;

  type?: string;
  startDate?: string;
  endDate?: string;
  techStack?: string;

  links?: LinkItem[];
}

const fallbackImage =
  "https://via.placeholder.com/400x250.png?text=Project+Preview";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  link,
  image,
  type,
  startDate,
  endDate,
  techStack,
  links = [],
}) => {
  // Normalize links for GitHub + Others
  const normalizedLinks = links
    .map((l) => {
      if (!l?.url) return null;

      const url = l.url.trim();
      const isGithub = url.includes("github.com");

      return {
        label: isGithub ? "GitHub" : "Others",
        url,
      };
    })
    .filter(Boolean) as LinkItem[];

  const githubLink = normalizedLinks.find((l) => l.label === "GitHub");
  const otherLinks = normalizedLinks.filter((l) => l.label === "Others");

  const userTyped =
    (title && title.trim() !== "") ||
    (description && description.trim() !== "") ||
    (image && image.trim() !== "");

  const finalImage = userTyped ? image || "" : image || fallbackImage;

  const techBadges =
    typeof techStack === "string"
      ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  return (
    <div
      className="
        glass-bg rounded-xl overflow-hidden 
        hover:scale-[1.03] transition-all 
        shadow-xl neon-border
      "
    >
      {finalImage && (
        <img
          src={finalImage}
          alt={title || "Project preview"}
          className="w-full h-40 object-cover rounded-t-xl"
        />
      )}

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-white">
          {title || "Untitled Project"}
        </h3>

        {type && <p className="text-sm text-[#9b5cff] font-medium">{type}</p>}

        {(startDate || endDate) && (
          <p className="text-xs text-slate-400">
            {startDate ? new Date(startDate).toLocaleDateString() : "—"} —{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "Present"}
          </p>
        )}

        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
          {description || "No description added yet."}
        </p>

        {techBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {techBadges.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-[#00b3ff11] text-[#00b3ff] border border-[#00b3ff33]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* LINK BUTTONS */}
        <div className="flex flex-col gap-2 mt-4">

          {/* GitHub */}
          {githubLink?.url && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0b2030] text-white border border-[#3c5cff55] hover:bg-[#0b203099] transition text-sm"
              style={{ lineHeight: "1.2" }}
            >
              <Github size={14} />
              GitHub
            </a>
          )}

          {/* Others (NO ICON) */}
          {otherLinks.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-lg bg-[#1a1a1f] text-[#00b3ff] border border-[#00b3ff55] hover:bg-[#1a1a1faa] transition text-sm"
              style={{ lineHeight: "1.2" }}
            >
              Others
            </a>
          ))}
        </div>

        {/* Fallback for old structure */}
        {!githubLink && !otherLinks.length && link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00b3ff] neon-hover font-medium"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;