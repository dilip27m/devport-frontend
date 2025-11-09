// src/app/templates/template1/ExperienceView.tsx

"use client";

import React from 'react';
// Import the Experience type definition from your form
import { Experience } from '@/app/(main)/editor/components/forms/ExperienceForm';
import { format, differenceInMonths, differenceInYears } from 'date-fns';

// Helper function to format the dates and calculate duration
const formatExperienceDuration = (start: string, end: string) => {
    if (!start) return null;
    try {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date(); // If no end date, assume "Present"
        
        const startFormatted = format(startDate, 'MMM yyyy');
        const endFormatted = end ? format(endDate, 'MMM yyyy') : 'Present';
        
        let duration = '';
        const totalMonths = differenceInMonths(endDate, startDate);
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        if (years > 0) duration += `${years} yr${years > 1 ? 's' : ''} `;
        if (months > 0) duration += `${months} mo${months > 1 ? 's' : ''}`;
        
        return {
            range: `${startFormatted} - ${endFormatted}`,
            duration: duration.trim(),
        };
    } catch {
        return { range: 'Invalid Dates', duration: '' };
    }
};

const ExperienceView: React.FC<{ experiences: Experience[] }> = ({ experiences }) => {

  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Work Experience</h2>
        <p className="text-gray-500">No work experience has been added yet.</p>
      </section>
    );
  }
  
  return (
    <section id="experience" className="p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Work Experience</h2>
      
      <div className="border-l-2 border-blue-200 pl-8 space-y-12 relative">
        {(experiences).map((exp, index) => {
          const duration = formatExperienceDuration(exp.startDate, exp.endDate);
          return (
            <div key={index} className="relative">
              <div className="absolute -left-[38px] top-1.5 w-6 h-6 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xs">
                {/* Placeholder for a company logo initial or icon */}
                {exp.company ? exp.company[0] : ''}
              </div>
              
              <p className="text-sm font-semibold text-gray-500 mb-1">
                {duration?.range}
                {duration?.duration && ` · ${duration.duration}`}
              </p>
              <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
              <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
              <p className="text-md text-gray-600 mt-2 whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceView;