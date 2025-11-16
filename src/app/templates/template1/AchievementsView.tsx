"use client";

import React from 'react';
import type { Achievement } from '@/app/(main)/editor/components/forms/AchievementsForm';
import { Trophy } from 'lucide-react';

const AchievementsView: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Achievements</h2>
        <p className="text-gray-400 text-xs">Notable accomplishments and recognitions</p>
      </div>
      
      <div className="space-y-4">
        {achievements.map((ach, index) => (
          <div 
            key={index} 
            className="group bg-[#0d1117] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-9 h-9 flex items-center justify-center bg-[#161b22] border border-gray-800 rounded-full group-hover:border-yellow-400 transition-colors">
                  <Trophy className="text-yellow-400" size={16}/>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                  <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 flex-shrink-0">
                    {ach.year}
                  </p>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {ach.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsView;