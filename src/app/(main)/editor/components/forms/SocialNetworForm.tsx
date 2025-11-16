"use client";

import React from "react";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";

export interface SocialNetworkFormProps {
  data: {
    email: string;
    github: string;
    linkedin: string;
  };
  onChange: (field: string, value: string) => void;
}

const SocialNetworkForm: React.FC<SocialNetworkFormProps> = ({ data, onChange }) => {

  // Build the final URL for opening
  const getGithubUrl = () => {
    if (!data.github) return "";
    if (data.github.startsWith("http")) return data.github;
    return `https://github.com/${data.github}`;
  };

  const getLinkedInUrl = () => {
    if (!data.linkedin) return "";
    return data.linkedin; 
  };

  return (
    <div className="space-y-6 text-sm text-gray-800">
      <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
        Social Networks
      </h2>

      {/* Email */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 font-medium">
          <Mail size={16} className="text-blue-500" />
          Email
        </label>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* GitHub */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 font-medium">
          <Github size={16} className="text-gray-800" />
          GitHub
        </label>

        <div className="relative">
          <input
            type="text"
            placeholder="yourusername"
            value={data.github}
            onChange={(e) => onChange("github", e.target.value)}
            className="w-full border rounded-md px-3 py-2 pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {data.github && (
            <a
              href={getGithubUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* LinkedIn */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 font-medium">
          <Linkedin size={16} className="text-blue-700" />
          LinkedIn
        </label>

        <div className="relative">
          <input
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={data.linkedin}
            onChange={(e) => onChange("linkedin", e.target.value)}
            className="w-full border rounded-md px-3 py-2 pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {data.linkedin && (
            <a
              href={getLinkedInUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialNetworkForm;
