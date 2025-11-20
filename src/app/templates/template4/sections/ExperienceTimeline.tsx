"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const ExperienceTimeline = ({ experiences }: { experiences: any[] }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Career</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Work Experience</h3>

        <div className="relative border-l-2 border-indigo-100 ml-3 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-4 border-indigo-600 rounded-full"></div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h4 className="text-xl font-bold text-slate-800">{exp.role}</h4>
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {exp.startDate} — {exp.isPresent ? "Present" : exp.endDate}
                </span>
              </div>
              
              <div className="text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
                <Briefcase size={16} className="text-slate-400" />
                {exp.company}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">{exp.description}</p>

              {exp.descriptionBullets && exp.descriptionBullets.length > 0 && (
                 <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-4">
                    {exp.descriptionBullets.filter((b: string) => b.trim()).map((bullet: string, bIdx: number) => (
                        <li key={bIdx}>{bullet}</li>
                    ))}
                 </ul>
              )}

              {/* Tech Stack Tags */}
              {exp.stack && exp.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.stack.map((tech: string, tIdx: number) => (
                    <span key={tIdx} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceTimeline;