"use client";
import React from 'react';
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';

const SkillsView: React.FC<{ skills: SkillCategory[] }> = ({ skills }) => (
  <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Skills</h2>
    
    <div className="space-y-16">
      {(skills || []).map((category, i) => (
        <div key={i} className="group">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 inline-block relative">
              {category.name}
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(category.skills || []).map((skill, si) => (
              <div 
                key={si} 
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group/skill"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <img 
                    src={`https://skillicons.dev/icons?i=${skill}`} 
                    alt={skill} 
                    className="w-full h-full object-contain group-hover/skill:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-500/0 group-hover/skill:bg-blue-500/10 rounded-lg blur-xl transition-all duration-300" />
                </div>
                <span className="font-semibold capitalize text-sm text-gray-400 group-hover/skill:text-white transition-colors text-center">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {(!skills || skills.length === 0) && (
      <div className="text-center py-20">
        <div className="inline-block p-6 rounded-full bg-gray-900/50 mb-6">
          <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No skills to display yet.</p>
      </div>
    )}
  </section>
);

export default SkillsView;