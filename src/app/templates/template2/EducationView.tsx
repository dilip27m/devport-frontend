"use client";

import React from 'react';
// Import the Education type definition from your form
import type { Education } from '@/app/(main)/editor/components/forms/EducationForm';
import { GraduationCap } from 'lucide-react'; // Import a relevant icon

// Helper function to format the start and end years
const formatYearDuration = (startYear?: string, endYear?: string) => {
    if (!startYear) return null;
    return `${startYear} - ${endYear || 'Present'}`;
};

const EducationView: React.FC<{ education: Education[] }> = ({ education }) => {
  // If there's no education data, render a placeholder message
  if (!education || education.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-bold text-white mb-8">Education</h2>
        <p className="text-gray-400">No education details have been added yet.</p>
      </section>
    );
  }
  
  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-8">Education</h2>
      
      {/* Container for the list of education cards */}
      <div className="space-y-6">
        {(education).map((edu, index) => (
          <div key={index} className="flex items-start gap-4 p-6 bg-black/20 border border-gray-800 rounded-lg">
            
            {/* Icon */}
            <div className="p-3 bg-gray-800 rounded-lg">
              <GraduationCap className="text-cyan-400" size={24}/>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                    <p className="text-gray-300">{edu.degree}</p>
                  </div>
                  <p className="text-sm text-gray-400 flex-shrink-0 ml-4">
                    {formatYearDuration(edu.startYear, edu.endYear)}
                  </p>
              </div>

              {/* Grade (only if it exists) */}
              {edu.grade && (
                  <p className="text-gray-500 mt-2 text-sm">Grade: {edu.grade}</p>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationView;