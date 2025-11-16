"use client";

import React from "react";
import ProjectCard from "../components/Projectcomp";

interface ProjectType {
  title: string;
  description: string;
  link?: string;
  image?: string;

  type?: string;
  startDate?: string;
  endDate?: string;
  techStack?: string;

  links?: any[];
}

interface ProjectsViewProps {
  projects: ProjectType[];
}

// ⭐ Restored 3 default template projects
const DEFAULT_PROJECTS: ProjectType[] = [
  {
    title: "Personal Portfolio Website",
    description: "A modern portfolio built with Next.js and TailwindCSS.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&q=80",
    type: "Web",
    techStack: "Next.js, TailwindCSS",
  },
  {
    title: "E-Commerce Store",
    description:
      "A scalable online shop built with React, Node.js, and Stripe payments.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    type: "Web App",
    techStack: "React, Node.js, Stripe",
  },
  {
    title: "Weather Forecast App",
    description:
      "A real-time weather tracking app built using OpenWeatherMap API.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=800&q=80",
    type: "Mobile",
    techStack: "Flutter, REST API",
  },
];

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  const hasUserProjects =
    projects &&
    projects.length > 0 &&
    projects.some(
      (p) =>
        p.title?.trim() !== "" ||
        p.description?.trim() !== "" ||
        p.image?.trim() !== ""
    );

  const finalProjects = hasUserProjects ? projects : DEFAULT_PROJECTS;

  const formattedProjects = finalProjects.map((p) => ({
    ...p,
    links: (p.links || []).map((l: any) =>
      typeof l === "string" ? { label: l, url: l } : l
    ),
  }));

  return (
    <section id="projects-section" className="p-6 lg:p-12 animate-section">
      <h2 className="text-3xl font-extrabold mb-10 text-center">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {formattedProjects.map((p, index) => (
          <ProjectCard key={index} {...p} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsView;