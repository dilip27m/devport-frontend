"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const EducationList = ({ education }: { education: any[] }) => {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-24">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
             <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Academic</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Education</h3>

             <div className="space-y-6">
                {education.map((edu, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="sm:w-32 flex-shrink-0 flex flex-col items-start sm:items-center text-center gap-2">
                             <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-sm border border-indigo-100">
                                 <GraduationCap size={24} />
                             </div>
                             <span className="text-sm font-semibold text-slate-500">
                                {edu.startYear} - {edu.endYear || "Present"}
                             </span>
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-slate-900">{edu.institution}</h4>
                            <p className="text-indigo-700 font-medium mb-2">{edu.degree}</p>
                            {edu.grade && (
                                <p className="text-sm text-slate-600 bg-white inline-block px-3 py-1 rounded-full border border-slate-200">
                                    Grade: {edu.grade}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
             </div>
        </motion.div>
    </section>
  );
};

export default EducationList;