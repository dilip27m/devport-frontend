"use client";

import React from "react";
import BubbleCard from "../components/BubbleCard";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";

export default function EducationList({ education }: { education: Education[] }) {
  if (!education.length) return null;

  return (
    <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Education</h2>
            <div className="grid grid-cols-1 gap-6">
                {education.map((edu, i) => (
                    <BubbleCard key={i} delay={i * 0.1} className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 bg-zinc-900/50 border-zinc-800">
                        <div>
                            <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                            <p className="text-zinc-400">{edu.institution}</p>
                            {edu.grade && <p className="text-sm text-zinc-500 mt-1">Grade: {edu.grade}</p>}
                        </div>
                        <div className="text-yellow-400 font-bold font-mono whitespace-nowrap bg-yellow-400/10 px-4 py-2 rounded-full text-sm border border-yellow-400/20">
                            {edu.startYear} - {edu.endYear}
                        </div>
                    </BubbleCard>
                ))}
            </div>
        </div>
    </section>
  );
}