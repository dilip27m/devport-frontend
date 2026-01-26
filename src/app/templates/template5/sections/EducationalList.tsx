"use client";

import React from "react";
import BubbleCard from "../components/BubbleCard";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";

export default function EducationList({ education }: { education: Education[] }) {
    if (!education.length) return null;

    return (
        <section className="py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center text-white">Education</h2>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {education.map((edu, i) => (
                        <BubbleCard key={i} delay={i * 0.1} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 bg-zinc-900/50 border-zinc-800">
                            <div className="min-w-0">
                                <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
                                <p className="text-zinc-400 text-sm sm:text-base">{edu.institution}</p>
                                {edu.grade && <p className="text-xs sm:text-sm text-zinc-500 mt-1">Grade: {edu.grade}</p>}
                            </div>
                            <div className="text-yellow-400 font-bold font-mono whitespace-nowrap bg-yellow-400/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-yellow-400/20">
                                {edu.startYear} - {edu.endYear}
                            </div>
                        </BubbleCard>
                    ))}
                </div>
            </div>
        </section>
    );
}