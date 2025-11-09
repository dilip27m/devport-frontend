"use client";

import React from 'react';
// Correctly importing the Achievement type definition
import type { Achievement } from '@/app/(main)/editor/components/forms/AchievementsForm';
import { Trophy } from 'lucide-react'; // Using the Trophy icon as it's more fitting for achievements

const AchievementsView: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {

  // Handle the case where no achievements have been added
  if (!achievements || achievements.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-bold text-white mb-8">Achievements</h2>
        <p className="text-gray-400">No achievements have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-8">Achievements</h2>
      
      {/* Container for the list of achievement cards */}
      <div className="space-y-6">
        {(achievements).map((ach, index) => (
          <div key={index} className="flex items-start gap-4 p-6 bg-black/20 border border-gray-800 rounded-lg">
            
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              <Trophy className="text-yellow-400" size={24}/>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">{ach.title}</h3>
                <p className="text-sm font-semibold text-gray-400 flex-shrink-0 ml-4">
                  {ach.year}
                </p>
              </div>

              <p className="text-gray-400 mt-2 whitespace-pre-wrap">
                {ach.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsView;