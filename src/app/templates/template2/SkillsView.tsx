"use client";
import React from 'react';
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';
import { Code2 } from 'lucide-react';

const SkillsView: React.FC<{ skills: SkillCategory[] }> = ({ skills }) => {
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Technical Skills</h2>
        <p className="text-gray-400 text-xs">Technologies and tools I work with</p>
      </div>

      <div className="space-y-8">
        {skills.map((category, index) => (
          <div key={index}>
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Code2 size={16} className="text-green-400" />
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {(category.skills || []).map((skill, skillIndex) => (
                <div 
                  key={skillIndex} 
                  className="group flex items-center gap-2 bg-[#161b22] px-3 py-1.5 rounded-md border border-gray-800 hover:border-green-400 transition-all duration-200 cursor-default"
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${skill.toLowerCase()}`}
                    alt={`${skill} icon`}
                    className="w-5 h-5"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="font-semibold capitalize text-gray-300 text-xs group-hover:text-green-400 transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsView;