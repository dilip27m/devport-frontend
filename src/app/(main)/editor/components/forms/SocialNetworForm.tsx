"use client";

import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

export interface SocialNetworkFormProps {
  data: {
    email: string;
    github: string;
    linkedin: string;
  };
  onChange: (field: string, value: string) => void;
}

const SocialNetworkForm: React.FC<SocialNetworkFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6 text-sm text-gray-800">
      <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
        Social Networks
      </h2>

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

      <div className="space-y-1">
        <label className="flex items-center gap-2 font-medium">
          <Github size={16} className="text-gray-800" />
          GitHub
        </label>
        <input
          type="url"
          placeholder="https://github.com/yourusername"
          value={data.github}
          onChange={(e) => onChange("github", e.target.value)}
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 font-medium">
          <Linkedin size={16} className="text-blue-700" />
          LinkedIn
        </label>
        <input
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={data.linkedin}
          onChange={(e) => onChange("linkedin", e.target.value)}
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SocialNetworkForm;
