"use client";

import React from "react";
import Project from "../components/Projectcomp";

// Add 'image' to the interface
interface ProjectType {
  title: string;
  description: string;
  link?: string;
  image?: string;
}

interface ProjectsViewProps {
  projects: ProjectType[];
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image} // Pass the image prop down
            />
          ))
        ) : (
          <p className="text-gray-500">Your projects will be displayed here.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsView;