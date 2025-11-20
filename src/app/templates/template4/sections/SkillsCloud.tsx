"use client";

import React from "react";
import { motion } from "framer-motion";

const SkillsCloud = ({ skills }: { skills: any[] }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Expertise</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Skills & Tools</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill: string, sIdx: number) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsCloud;