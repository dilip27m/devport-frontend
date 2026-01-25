"use client";

import React from "react";
import BubbleCard from "../components/BubbleCard";
import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";

export default function AboutSection({ aboutMe }: { aboutMe: AboutMeFormProps["data"] }) {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Card - Dark Gradient */}
        <BubbleCard className="h-full flex flex-col justify-center bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
           <h2 className="text-3xl font-bold mb-6 text-yellow-400">About Me</h2>
           
           <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
             {aboutMe.aboutMe || aboutMe.bio || "No description added yet."}
           </p>
        </BubbleCard>

        {/* Photo/Decorative Card */}
        <BubbleCard className="min-h-[300px] flex items-center justify-center bg-zinc-900 text-white overflow-hidden relative border-zinc-800">
            {aboutMe.photo ? (
                <>
                  <img 
                    src={aboutMe.photo} 
                    alt={aboutMe.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </>
            ) : (
                <>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="z-10 text-center px-6">
                        <p className="text-2xl font-light italic text-yellow-100">"Designing the future,<br/> one pixel at a time."</p>
                    </div>
                </>
            )}
        </BubbleCard>
      </div>
    </section>
  );
}