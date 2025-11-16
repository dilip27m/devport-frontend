"use client";
import React from "react";
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';

interface HomeViewProps {
  aboutMe: AboutMeFormProps["data"];
};

const HomeView: React.FC<HomeViewProps> = ({ aboutMe }) => {
  const { greeting, name, role, bio, photo, resume, aboutMe: detailedAbout } = aboutMe || {};
  const isUrlLike = (s?: string) => !!s && /^(https?:\/\/|data:)/i.test(s);

  return (
    <section>
      <h2 className="text-4xl font-bold text-white mb-2">Digital Identity</h2>
      <div className="w-16 h-1 bg-cyan-400 rounded-full mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,240px] gap-10 items-start">
        <div className="space-y-6 text-gray-300">
          <h1 className="text-3xl font-semibold text-white break-words">
            {greeting || "Hey there!"} I'm <span className="font-bold">{name || "Your Name"}</span>
          </h1>
          <p className="text-xl text-cyan-300">
            {role || "Your Role"}
          </p>
          {/* --- FIX: Added break-words --- */}
          <p className="whitespace-pre-wrap leading-relaxed break-words">
            {bio || "Your short bio appears here."}
          </p>
          <div>
            <h3 className="text-2xl font-semibold text-white mt-8 mb-3">About Me</h3>
            {/* --- FIX: Added break-words --- */}
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {detailedAbout || "Your detailed about me section appears here."}
            </p>
          </div>
          <div className="pt-4">
            {resume && isUrlLike(resume) ? (
              <a href={resume} target="_blank" rel="noopener noreferrer"
                 className="inline-block bg-cyan-500/10 text-cyan-300 font-semibold py-2 px-6 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition">
                View Résumé
              </a>
            ) : null }
          </div>
        </div>

        <div className="flex md:justify-end">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/20 backdrop-blur-sm">
            {photo && isUrlLike(photo) ? (
              <img src={photo} alt={name ? `${name}'s photo` : "Profile"} className="w-full h-full object-cover"/>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">No Photo</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeView;