"use client";
import React from "react";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { ExternalLink } from 'lucide-react';

const ProjectsView = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(projects || []).map((project, index) => (
          <div 
            key={index} 
            className="group bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-950 to-black">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
            </div>

            {/* Project Content */}
            <div className="p-6 flex flex-col">
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                {project.description}
              </p>

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800/50">
                  {project.links.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 hover:text-blue-300 transition-all group/link"
                    >
                      {link.label || 'View Project'}
                      <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {(!projects || projects.length === 0) && (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-6">
            <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No projects to display yet.</p>
        </div>
      )}
    </section>
  );
};

export default ProjectsView;