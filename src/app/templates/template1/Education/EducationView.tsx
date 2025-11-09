"use client";

import React from 'react';
// Import the Education type definition from your form
import { Education } from '@/app/(main)/editor/components/forms/EducationForm';

// Helper function to format the start and end dates
const formatDuration = (edu: Education) => {
    const { startMonth, startYear, endMonth, endYear } = edu;
    if (!startYear && !startMonth) return null; // Don't render if no start date

    const start = [startMonth, startYear].filter(Boolean).join(' ');
    const end = endYear === 'Present' ? 'Present' : [endMonth, endYear].filter(Boolean).join(' ');

    return `${start} - ${end}`;
};

const EducationView: React.FC<{ education: Education[] }> = ({ education }) => {
  // If there's no education data, we can show a placeholder.
  if (!education || education.length === 0) {
    return (
      <section id="education" className="p-6 md:p-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Education</h2>
        <p className="text-gray-500">No education details have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section id="education" className="p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Education</h2>
      
      {/* A container for the timeline items */}
      <div className="border-l-2 border-blue-200 pl-8 space-y-10 relative">
        {(education).map((edu, index) => (
          <div key={index} className="relative">
            {/* The dot on the timeline for each entry */}
            <div className="absolute -left-[37px] top-1.5 w-5 h-5 bg-blue-500 rounded-full border-4 border-white"></div>
            
            <p className="text-sm font-semibold text-gray-500 mb-1">{formatDuration(edu)}</p>
            <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
            <p className="text-lg text-gray-700">{edu.institution}</p>
            {edu.grade && (
              <p className="text-md text-gray-600 mt-2">Grade: {edu.grade}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationView;