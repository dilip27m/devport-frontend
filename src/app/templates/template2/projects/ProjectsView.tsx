"use client";

import React from "react";
// --- The `ProjectStatus` import is now removed ---
import { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// FaGithub can be removed if not used for links
import { FaGithub } from 'react-icons/fa';

// --- The StatusBadge component has been completely removed. ---

const ProjectsView: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-2">Featured Projects</h2>
      <p className="text-gray-400 mb-8">A glimpse into my professional journey.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(projects || []).map((project, index) => (
          
          <div key={index} className="bg-black/20 border border-gray-800 rounded-2xl flex flex-col hover:border-gray-700 transition-colors duration-300">
            
            <div className="h-48 w-full border-b border-gray-800 rounded-t-2xl overflow-hidden bg-black flex items-center justify-center">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
              ) : (
                <ImageIcon size={48} className="text-gray-700" />
              )}
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {/* The StatusBadge that was here is now gone. */}
              </div>
              
              <p className="text-gray-400 text-sm flex-grow mb-4 break-words">
                {project.description}
              </p>
              
              <div className="mt-auto pt-4">
                 {(project.links || []).map((link, linkIndex) => (
                    <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 font-semibold text-sm hover:text-blue-300 transition">
                      {/* You can add icon logic back here if desired */}
                      {link.label.toLowerCase().includes('github') && <FaGithub className="mr-2" />}
                      {link.label || 'View Link'} <LinkIcon size={14} className="ml-1.5"/>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsView;