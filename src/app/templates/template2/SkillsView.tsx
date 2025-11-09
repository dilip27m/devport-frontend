"use client";

import React from 'react';
// Correctly import the SkillCategory type definition
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';
import { Star } from 'lucide-react'; // Import an icon for the section title

const SkillsView: React.FC<{ skills: SkillCategory[] }> = ({ skills }) => {

  // Handle the case where no skills have been added
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-bold text-white mb-8">Technical Skills</h2>
        <p className="text-gray-400">No skills have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <Star size={32} className="text-cyan-400" />
        <h2 className="text-4xl font-bold text-white">Technical Skills</h2>
      </div>
      
      <div className="space-y-8">
        {(skills).map((category, index) => (
          <div key={index}>
            {/* Category Name */}
            <h3 className="text-2xl font-semibold text-white mb-4">{category.name}</h3>
            
            {/* Grid of skill "chips" */}
            <div className="flex flex-wrap gap-4">
              {(category.skills || []).map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <img
                    src={`https://skillicons.dev/icons?i=${skill}`}
                    alt={`${skill} icon`}
                    className="w-8 h-8"
                    // Gracefully hide the image if the icon isn't found
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).onerror = null; 
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span className="font-semibold capitalize text-gray-300">
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