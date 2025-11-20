"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const AchievementCards = ({ achievements }: { achievements: any[] }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Honors</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Achievements</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Award size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{ach.title}</h4>
                        <span className="text-sm font-semibold text-slate-500 mb-2 block">{ach.year}</span>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {ach.description}
                        </p>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AchievementCards;