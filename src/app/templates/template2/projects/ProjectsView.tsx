"use client";

import React, { JSX } from "react";
import type { ProjectStatus } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import { CheckCircle, Clock, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

const StatusBadge = ({ status }: { status: ProjectStatus | undefined }) => {
  if (!status) return null;

  const statusStyles: { [key: string]: { icon: JSX.Element; text: string; bg: string; textColor: string; } } = {
    'Completed': {
      icon: <CheckCircle size={14} />,
      text: 'Completed',
      bg: 'bg-green-500/10',
      textColor: 'text-green-400',
    },
    'In Progress': {
      icon: <Clock size={14} />,
      text: 'In Progress',
      bg: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
    },
    'Planned': {
      icon: <Clock size={14} />,
      text: 'Planned',
      bg: 'bg-blue-500/10',
      textColor: 'text-blue-400',
    },
    'Archived': {
      icon: <CheckCircle size={14} />,
      text: 'Archived',
      bg: 'bg-gray-500/10',
      textColor: 'text-gray-400',
    },
  };

  const currentStatus = statusStyles[status];
  if (!currentStatus) return null;

  return (
    <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.textColor}`}>
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </div>
  );
};

const ProjectsView: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-2">Projects</h2>
      
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
                <StatusBadge status={project.status} />
              </div>
              
              <p className="text-gray-400 text-sm flex-grow mb-4 break-words">
                {project.description}
              </p>
              
              <div className="mt-auto pt-4">
                 {(project.links || []).map((link, linkIndex) => (
                    <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 font-semibold text-sm hover:text-blue-300 transition">
                      {link.label || 'Source Code'} <LinkIcon size={14} className="ml-1.5"/>
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