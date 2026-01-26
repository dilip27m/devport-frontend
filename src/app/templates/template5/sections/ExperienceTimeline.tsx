"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) return null;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">Journey</h2>

      <div className="space-y-6 sm:space-y-8">
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
              className="flex gap-3 sm:gap-6 items-start group"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                {/* THEME CHANGE: Yellow dot */}
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-400 mt-2 shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                {i !== experiences.length - 1 && (
                  <div className="w-0.5 h-full bg-zinc-800 my-2 min-h-[50px] group-hover:bg-yellow-400/30 transition-colors" />
                )}
              </div>

              <div className="pb-6 sm:pb-8 flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{exp.role}</h3>
                <p className="text-yellow-500/80 font-medium mb-2 text-sm sm:text-base">{exp.company} • {dateString}</p>

                <ul className="list-disc list-inside text-zinc-400 leading-relaxed space-y-1 text-sm sm:text-base">
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