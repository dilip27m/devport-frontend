"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";

const ProjectGrid = ({ projects }: { projects: any[] }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="scroll-mt-24">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Portfolio</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Featured Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
             const githubLink = project.links?.find((l: any) => l.label === "GitHub")?.url;
             const otherLinks = project.links?.filter((l: any) => l.label !== "GitHub");

             return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image or Placeholder */}
                  <div className="h-48 bg-slate-100 relative overflow-hidden border-b border-slate-100">
                     {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Folder size={48} />
                        </div>
                     )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-slate-900 line-clamp-1">{project.title}</h4>
                        <div className="flex gap-2">
                            {githubLink && (
                                <a href={githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                    <Github size={20} />
                                </a>
                            )}
                            {otherLinks && otherLinks.length > 0 && (
                                <a href={otherLinks[0].url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.stack?.slice(0, 4).map((tech: string, tIdx: number) => (
                            <span key={tIdx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded">
                                {tech}
                            </span>
                        ))}
                        {project.stack && project.stack.length > 4 && (
                             <span className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-semibold rounded">+{project.stack.length - 4}</span>
                        )}
                    </div>
                  </div>
                </motion.div>
             );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectGrid;