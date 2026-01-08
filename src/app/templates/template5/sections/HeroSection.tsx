"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";

interface HeroProps {
  aboutMe: AboutMeFormProps["data"];
  socials: SocialNetworkFormProps["data"];
}

export default function HeroSection({ aboutMe, socials }: HeroProps) {
  const firstName = aboutMe.name ? aboutMe.name.split(" ")[0] : "there";

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-32">
      
      {/* Background Animated Blobs - Gold/Amber */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <h2 className="text-xl md:text-2xl font-medium text-amber-500 mb-6 font-mono tracking-widest uppercase">
          {aboutMe.greeting || "Hello, I'm"} {firstName}
        </h2>
        
        {/* Main Heading / Role */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-12">
          {aboutMe.role || "Creative Developer"}
        </h1>

        {/* REMOVED: The duplicate description paragraph was here. */}

        <div className="flex gap-4 justify-center">
            {socials.linkedin && (
                 <a href={socials.linkedin} target="_blank" rel="noreferrer">
                    <MagneticButton className="bg-amber-500 text-black font-bold hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                        LinkedIn
                    </MagneticButton>
                 </a>
            )}
            {socials.github && (
                 <a href={socials.github} target="_blank" rel="noreferrer">
                    <MagneticButton className="bg-transparent text-white hover:bg-zinc-900 border border-zinc-700">
                        GitHub
                    </MagneticButton>
                 </a>
            )}
        </div>
      </motion.div>
    </section>
  );
}