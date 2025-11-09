"use client";

import React from 'react';
// Correctly import the Experience type definition
import type { Experience } from '@/app/(main)/editor/components/forms/ExperienceForm';
import { Building2 } from 'lucide-react';
import { format } from 'date-fns';

// Simplified helper to format just the years for the clean dark theme
const formatYearDuration = (start: string, end: string) => {
    if (!start) return null;
    try {
        const startYear = format(new Date(start), 'yyyy');
        const endYear = end ? format(new Date(end), 'yyyy') : 'Present';
        return `${startYear} - ${endYear}`;
    } catch {
        return "Invalid Dates";
    }
};

const ExperienceView: React.FC<{ experiences: Experience[] }> = ({ experiences }) => {

  if (!experiences || experiences.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-bold text-white mb-8">Work Experience</h2>
        <p className="text-gray-400">No work experience has been added yet.</p>
      </section>
    );
  }
  
  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-8">Work Experience</h2>
      
      {/* Container for the list of experience cards */}
      <div className="space-y-6">
        {(experiences).map((exp, index) => {
          return (
            <div key={index} className="flex items-start gap-4 p-6 bg-black/20 border border-gray-800 rounded-lg">
              
              {/* Icon */}
              <div className="p-3 bg-gray-800 rounded-lg">
                <Building2 className="text-cyan-400" size={24}/>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="font-semibold text-gray-300">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-400 flex-shrink-0 ml-4">
                    {formatYearDuration(exp.startDate, exp.endDate)}
                  </p>
                </div>
                
                <p className="text-gray-400 mt-3 whitespace-pre-wrap">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceView;