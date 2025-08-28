"use client";

import React from "react";

// Add 'image' to the interface
interface ProjectProps {
  title: string;
  description: string;
  link?: string;
  image?: string; 
}

const Project: React.FC<ProjectProps> = ({ title, description, link, image }) => {
  return (
    <div className="bg-white shadow-md rounded-xl hover:shadow-lg transition overflow-hidden">
      
      {/* Conditionally render the image at the top of the card if it exists */}
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
      )}
      
      <div className="p-4">
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
    </div>
  );
};

export default Project;