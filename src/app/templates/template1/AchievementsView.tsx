// src/app/templates/template1/AchievementsView.tsx

"use client";

import React from 'react';
// Correctly importing the Achievement type definition
import type { Achievement } from '@/app/(main)/editor/components/forms/AchievementsForm';
import { Award } from 'lucide-react'; // Using an icon for visual flair

const AchievementsView: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {

  // Handle the case where no achievements have been added
  if (!achievements || achievements.length === 0) {
    return (
      <section id="achievements" className="p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Achievements</h2>
        <p className="text-gray-500">No achievements have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section id="achievements" className="p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Achievements</h2>
      
      <div className="border-l-2 border-blue-200 pl-8 space-y-10 relative">
        {(achievements).map((ach, index) => (
          <div key={index} className="relative">
            {/* The icon on the timeline */}
            <div className="absolute -left-[38px] top-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
              <Award size={14} className="text-white" />
            </div>
            
            <p className="text-sm font-semibold text-gray-500 mb-1">{ach.year}</p>
            <h3 className="text-2xl font-bold text-gray-900">{ach.title}</h3>
            <p className="text-md text-gray-600 mt-2 whitespace-pre-wrap">
              {ach.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsView;