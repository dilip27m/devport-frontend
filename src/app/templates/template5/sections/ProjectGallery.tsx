"use client";

import React from "react";
import BubbleCard from "../components/BubbleCard";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-white">Featured Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => {
            const githubLink = project.links.find(l => l.label === "GitHub")?.url;
            const otherLink = project.links.find(l => l.label === "Others")?.url;

            return (
              <BubbleCard key={i} delay={i * 0.1} className="group p-0 overflow-hidden min-h-[350px] sm:min-h-[400px] flex flex-col bg-zinc-900 border-zinc-800">
                <div className="relative h-40 sm:h-48 w-full bg-zinc-800 overflow-hidden border-b border-zinc-800">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-bold text-zinc-700">{project.title[0]}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-8 flex-grow flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 mb-4 sm:mb-6 flex-grow line-clamp-3 text-sm sm:text-base">
                    {project.description}
                  </p>

                  {(project.stack && project.stack.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {project.stack.slice(0, 3).map((tech, t) => (
                        <span key={t} className="text-xs font-medium bg-zinc-800 text-yellow-400/80 px-2 py-1 rounded-md border border-zinc-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {otherLink && (
                      <a href={otherLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-yellow-400 hover:text-white transition-colors">
                        View Live →
                      </a>
                    )}
                    {githubLink && (
                      <a href={githubLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </BubbleCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}