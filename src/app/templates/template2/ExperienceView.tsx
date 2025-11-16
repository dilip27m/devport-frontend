"use client";

import React from 'react';
import type { Experience } from '@/app/(main)/editor/components/forms/ExperienceForm';
import { Briefcase } from 'lucide-react';
import { format } from 'date-fns';

const formatYearDuration = (start: string, end: string) => {
  if (!start) return null;
  try {
    const startYear = start.length === 4 ? start : format(new Date(start), 'yyyy');
    const endYear = end ? (end.length === 4 ? end : format(new Date(end), 'yyyy')) : 'Present';
    return `${startYear} - ${endYear}`;
  } catch {
    return start && end ? `${start} - ${end}` : "Invalid Dates";
  }
};

const ExperienceView: React.FC<{ experiences: Experience[] }> = ({ experiences }) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Work Experience</h2>
        <p className="text-gray-400 text-xs">My professional journey</p>
      </div>
      
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="group bg-[#0d1117] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center bg-[#161b22] border border-gray-800 rounded-lg group-hover:border-green-400 transition-colors">
                  <Briefcase className="text-green-400" size={18}/>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors truncate">
                      {exp.role}
                    </h3>
                    <p className="font-semibold text-gray-400 text-xs">{exp.company}</p>
                  </div>
                  <p className="text-xs text-gray-500 flex-shrink-0">
                    {formatYearDuration(exp.startDate, exp.endDate)}
                  </p>
                </div>
                
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceView;