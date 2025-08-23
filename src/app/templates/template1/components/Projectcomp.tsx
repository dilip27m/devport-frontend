"use client";

import React from "react";

interface ProjectProps {
  title: string;
  description: string;
  link?: string;
}

const Project: React.FC<ProjectProps> = ({ title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-3 inline-block"
        >
          View Project
        </a>
      )}
    </div>
  );
};

export default Project;