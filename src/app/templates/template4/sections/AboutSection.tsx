"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutSection = ({ aboutMe }: { aboutMe: any }) => {
  if (!aboutMe?.aboutMe && !aboutMe?.bio) return null;

  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">About Me</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">My Story</h3>
        
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
            {aboutMe.aboutMe ? (
                aboutMe.aboutMe.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                ))
            ) : (
                <p>{aboutMe.bio}</p>
            )}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;