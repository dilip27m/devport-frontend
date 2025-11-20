"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  aboutMe: any;
  socials: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ aboutMe, socials }) => {
  const {
    name = "Your Name",
    role = "Creative Developer",
    greeting = "Hello, I'm",
    photo,
    resume,
  } = aboutMe;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-6 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="max-w-4xl w-full text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide mb-6">
            {greeting}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight mb-6"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto"
        >
          {role}
        </motion.p>

        {/* Social Links & Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {socials?.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <Github size={20} />
            </a>
          )}
          {socials?.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <Linkedin size={20} />
            </a>
          )}
          {socials?.email && (
            <a
              href={`mailto:${socials.email}`}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <Mail size={20} />
            </a>
          )}
          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
          )}
        </motion.div>
        
        {/* Optional Photo Circle */}
        {photo && (
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-12 rounded-full overflow-hidden border-4 border-white shadow-2xl"
            >
                <img src={photo} alt={name} className="w-full h-full object-cover" />
            </motion.div>
        )}

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-slate-400"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;