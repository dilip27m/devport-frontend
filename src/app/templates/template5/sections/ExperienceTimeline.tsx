"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) return null;

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">Journey</h2>
      
      <div className="space-y-8">
        {experiences.map((exp, i) => {
            const start = exp.startDate ? new Date(exp.startDate).getFullYear() : "";
            const end = exp.isPresent ? "Present" : (exp.endDate ? new Date(exp.endDate).getFullYear() : "");
            const dateString = start ? `${start} - ${end}` : "";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start group"
              >
                <div className="flex flex-col items-center">
                   {/* THEME CHANGE: Yellow dot */}
                   <div className="w-4 h-4 rounded-full bg-yellow-400 mt-2 shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                   {i !== experiences.length - 1 && (
                     <div className="w-0.5 h-full bg-zinc-800 my-2 min-h-[50px] group-hover:bg-yellow-400/30 transition-colors" />
                   )}
                </div>
                
                <div className="pb-8 flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{exp.role}</h3>
                  <p className="text-yellow-500/80 font-medium mb-2">{exp.company} • {dateString}</p>
                  
                  <ul className="list-disc list-inside text-zinc-400 leading-relaxed space-y-1">
                    {exp.descriptionBullets && exp.descriptionBullets.map((bullet, b) => (
                        bullet ? <li key={b}>{bullet}</li> : null
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
        })}
      </div>
    </section>
  );
}