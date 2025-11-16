"use client";

import React from "react";
import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";

interface HomeViewProps {
  aboutMe: AboutMeFormProps["data"];
}

const HomeView: React.FC<HomeViewProps> = ({ aboutMe }) => {
  const {
    name = "Your Name",
    role = "Your Role",
    bio = "A short introduction about yourself will appear here.",
    photo,
    greeting = "Hey there! I'm",
  } = aboutMe || {};

  // ⭐ FIX: Decide final photo URL
  const fallbackPhoto = "/avatar.png";
  const photoURL =
    typeof photo === "string" && photo.length > 0
      ? photo
      : fallbackPhoto;

  // ⭐ Smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[88vh] w-full flex flex-col lg:flex-row overflow-hidden rounded-3xl">
      {/* Background Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[380px] h-[380px] bg-[#00b3ff35] blur-[90px] animate-pulseSlow"></div>
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#9b5cff33] blur-[110px] animate-pulseSlow2"></div>
      </div>

      {/* Left Avatar Panel */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#0b1525] to-[#0d0f18] flex items-center justify-center relative p-10">
        <div className="relative">
          {/* Glow ring */}
          <div
            className="
            absolute inset-0 rounded-full
            bg-gradient-to-r from-[#00b3ff] to-[#9b5cff]
            blur-xl opacity-40 animate-pulseSlow
          "
          ></div>

          {/* Avatar Image */}
          <div
            className="
              w-56 h-56 md:w-72 md:h-72 rounded-full bg-cover bg-center
              border-4 border-white/10 shadow-[0_0_40px_rgba(0,180,255,0.45)]
              backdrop-blur-sm relative z-10 animate-floaty
            "
            style={{
              backgroundImage: `url(${photoURL})`,
            }}
          ></div>

          {/* Shine Layer */}
          <div
            className="
            absolute inset-0 rounded-full 
            bg-white/5 blur-[12px] opacity-20
          "
          ></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent rounded-3xl pointer-events-none"></div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 px-10 lg:px-16 py-16 bg-gradient-to-br from-[#0c0f1a] via-[#0e1220] to-[#0e1628]">
        <p className="text-slate-300 text-lg tracking-wide">{greeting}</p>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mt-1">
          My <br /> Portfolio
        </h1>

        <div className="w-32 h-[4px] rounded-full bg-gradient-to-r from-[#00b3ff] to-[#9b5cff] mt-4 mb-6 animate-slideRight"></div>

        <h2 className="text-3xl font-semibold text-white">{name}</h2>
        <h3 className="text-xl text-[#9b5cff] mt-1 mb-4">{role}</h3>

        {/* ⭐ FIXED BIO — now long text will wrap correctly */}
        <p
          className="
            text-slate-300 
            max-w-md 
            leading-relaxed 
            whitespace-pre-wrap 
            break-words
          "
        >
          {bio}
        </p>

        {/* Buttons */}
        <div className="flex gap-5 mt-10">
          <button
            onClick={() => scrollToSection("education-section")}
            className="
              px-6 py-3 rounded-lg text-white font-semibold
              bg-gradient-to-r from-[#00b3ff] to-[#9b5cff]
              shadow-[0_0_15px_rgba(0,180,255,0.4)]
              hover:scale-[1.04] transition-all
            "
          >
            Explore More
          </button>

          <button
            onClick={() => scrollToSection("contact-section")}
            className="
              px-6 py-3 rounded-lg text-white font-medium
              border border-white/20 bg-white/5 backdrop-blur-md
              hover:border-[#00b3ff] hover:scale-[1.04]
              transition-all
            "
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeView;