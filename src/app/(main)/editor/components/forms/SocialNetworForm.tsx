"use client";

import React, { useState } from "react";
import { Mail, Github, Linkedin, Plus, ExternalLink } from "lucide-react";

export interface SocialNetworkFormProps {
  data: {
    email: string;
    github: string;
    linkedin: string;
  };
  onChange: (field: string, value: string) => void;
}

const SocialNetworkForm: React.FC<SocialNetworkFormProps> = ({
  data,
  onChange,
}) => {
  const [visibleFields, setVisibleFields] = useState({
    email: !!data.email,
    github: !!data.github,
    linkedin: !!data.linkedin,
  });

  const showField = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof typeof visibleFields, value: string) => {
    onChange(field, value);
    if (value.trim() !== "") {
      setVisibleFields((p) => ({ ...p, [field]: true }));
    }
  };

  return (
    <div className="space-y-6 text-sm text-gray-800">

      <h2 className="text-lg font-bold text-gray-900">Social Networks</h2>

      {/* EMAIL */}
      {visibleFields.email && (
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <Mail size={16} className="text-blue-500" />
            Email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="your.email@example.com"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-10 py-2 
                        placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                title="Send Email"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* GITHUB */}
      {visibleFields.github && (
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <Github size={16} className="text-gray-800" />
            GitHub
          </label>
          <div className="relative">
            <Github
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="url"
              placeholder="https://github.com/username"
              value={data.github}
              onChange={(e) => handleChange("github", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-10 py-2
                        placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* LINKEDIN */}
      {visibleFields.linkedin && (
        <div className="space-y-1">
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <Linkedin size={16} className="text-blue-700" />
            LinkedIn
          </label>
          <div className="relative">
            <Linkedin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="url"
              placeholder="https://linkedin.com/in/profile"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-10 py-2 
                        placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* ADD BUTTONS (SHOWN ONLY IF FIELD IS HIDDEN) */}
      <div className="flex flex-wrap gap-2 pt-2">
        {!visibleFields.email && (
          <button
            onClick={() => showField("email")}
            className="flex items-center gap-1 px-3 py-1 border border-gray-400 rounded-full text-sm hover:bg-gray-100"
          >
            <Plus size={14} /> Email
          </button>
        )}

        {!visibleFields.github && (
          <button
            onClick={() => showField("github")}
            className="flex items-center gap-1 px-3 py-1 border border-gray-400 rounded-full text-sm hover:bg-gray-100"
          >
            <Plus size={14} /> GitHub
          </button>
        )}

        {!visibleFields.linkedin && (
          <button
            onClick={() => showField("linkedin")}
            className="flex items-center gap-1 px-3 py-1 border border-gray-400 rounded-full text-sm hover:bg-gray-100"
          >
            <Plus size={14} /> LinkedIn
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialNetworkForm;
