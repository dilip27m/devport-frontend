"use client";

import React from 'react';

// --- THIS IS THE FIX ---
// By adding the `type` keyword, we tell TypeScript exactly what we're importing.
// This resolves the "no exported member" error.
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';
// --------------------

interface SkillsViewProps {
  skills: SkillCategory[];
}

const SkillsView: React.FC<SkillsViewProps> = ({ skills }) => {

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <section id="skills" className="p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Skills</h2>
        <p className="text-gray-500">No skills have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section id="skills" className="p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Skills</h2>
      
      <div className="space-y-8">
        {(skills).map((category, index) => (
          <div key={index}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{category.name}</h3>
            <div className="flex flex-wrap gap-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm w-28 h-28 text-center transition-transform hover:scale-105">
                  <img
                    src={`https://skillicons.dev/icons?i=${skill}`}
                    alt={skill}
                    className="w-12 h-12"
                    // Add an error handler for icons that don't exist
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-700 capitalize">
                    {skill}
                  </p>
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