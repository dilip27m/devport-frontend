"use client";

import React from "react";
import { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  limit?: number;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, limit }) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  const isLatestSection = !!limit;
  
  if (!displayProjects || displayProjects.length === 0) {
    if (isLatestSection) return null;
    return (
      <section className="py-12 px-4">
        <h2 className="text-5xl font-bold text-white mb-8">Projects</h2>
        <p className="text-gray-400">No projects have been added yet.</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      {isLatestSection && (
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              All Creative Works.
            </h2>
            <p className="text-gray-400 text-xs">Here's some of my projects that I have worked on.</p>
          </div>
          <button 
            onClick={() => {
              const event = new CustomEvent('navigate-to-projects');
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors text-xs font-medium cursor-pointer"
          >
            Explore more <ExternalLink size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayProjects.map((project, index) => (
          <div 
            key={index} 
            className="group bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative h-32 w-full bg-[#0a0e14] overflow-hidden">
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
            
            {/* Project Content */}
            <div className="p-3">
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-green-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              
              <p className="text-gray-500 text-xs leading-relaxed mb-2 line-clamp-2">
                {project.description}
              </p>
              
              {/* Project Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, linkIndex) => (
                    <a 
                      key={linkIndex} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors text-xs font-medium"
                    >
                      {link.label?.toLowerCase().includes('github') ? (
                        <Github size={12} />
                      ) : (
                        <ExternalLink size={12} />
                      )}
                      <span>{link.label || 'View'}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsView;