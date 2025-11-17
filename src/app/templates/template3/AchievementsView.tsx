"use client";

import React from "react";
import { Achievement } from "@/app/(main)/editor/components/forms/AchievementsForm";

interface AchievementsViewProps {
  achievements: Achievement[];
}

const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
}) => {
  if (!achievements || achievements.length === 0) {
    achievements = [
      {
        year: "2024",
        title: "Completed 100+ LeetCode Challenges",
        description: "Improved problem-solving and DSA fundamentals.",
      },
      {
        year: "2023",
        title: "Hackathon Winner",
        description: "Won 1st place in a 24-hour hackathon event.",
      },
    ];
  }

  return (
    <section
      id="achievements-section"
      className="p-6 lg:p-12 max-w-5xl mx-auto animate-section"
    >
      <h2 className="text-3xl font-extrabold mb-10 text-center">
        Achievements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className="glass-bg neon-border p-6 rounded-xl shadow-xl hover:scale-[1.02] transition-all"
          >
            <div
              className="bg-gradient-to-br from-[#00b3ff] to-[#9b5cff]
              w-14 h-14 rounded-lg flex items-center justify-center
              text-white font-bold mb-4 shadow-[0_0_12px_rgba(0,180,255,0.4)]"
            >
              {ach.year}
            </div>

            <h3 className="text-xl font-semibold text-white">{ach.title}</h3>

            <p className="text-slate-300 mt-2 text-sm leading-relaxed">
              {ach.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsView;