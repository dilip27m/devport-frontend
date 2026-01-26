// src/app/templates/template5/sections/ContactFooter.tsx
"use client";

import React from "react";
import MagneticButton from "../components/MagneticButton";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";

export default function ContactFooter({ socials }: { socials: SocialNetworkFormProps["data"] }) {
  return (
    <footer className="py-16 sm:py-24 px-4 sm:px-6 text-center bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-slate-900 tracking-tight">Let's work together.</h2>
        <p className="text-lg sm:text-xl text-slate-500 mb-8 sm:mb-12">
          Interested in building something awesome? I'm just a message away.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          {socials.email && (
            <a href={`mailto:${socials.email}`}>
              <MagneticButton className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-slate-200 w-full sm:w-auto">
                Email Me
              </MagneticButton>
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noreferrer">
              <MagneticButton className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-blue-200 w-full sm:w-auto">
                LinkedIn
              </MagneticButton>
            </a>
          )}
        </div>

        <div className="mt-12 sm:mt-20 text-slate-400 text-sm">
          © {new Date().getFullYear()} • Built with DevPort
        </div>
      </div>
    </footer>
  );
}