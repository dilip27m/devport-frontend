"use client";

import React from 'react';
import type { Education } from '@/app/(main)/editor/components/forms/EducationForm';
import { GraduationCap } from 'lucide-react';

const formatYearDuration = (startYear?: string, endYear?: string) => {
  if (!startYear) return null;
  return `${startYear} - ${endYear || 'Present'}`;
};

const EducationView: React.FC<{ education: Education[] }> = ({ education }) => {
  if (!education || education.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Education</h2>
        <p className="text-gray-400 text-xs">My academic background</p>
      </div>
      
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className="group bg-[#0d1117] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center bg-[#161b22] border border-gray-800 rounded-lg group-hover:border-green-400 transition-colors">
                  <GraduationCap className="text-green-400" size={18}/>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white group-hover:text-green-400 transition-colors truncate">
                      {edu.institution}
                    </h3>
                    <p className="text-gray-400 text-xs">{edu.degree}</p>
                  </div>
                  <p className="text-xs text-gray-500 flex-shrink-0">
                    {formatYearDuration(edu.startYear, edu.endYear)}
                  </p>
                </div>

                {edu.grade && (
                  <p className="text-gray-500 text-xs mt-1">
                    Grade: <span className="text-gray-400 font-medium">{edu.grade}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationView;