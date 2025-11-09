"use client";
import React from "react";
import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";

type Props = {
  profile: AboutMeFormProps["data"];
};

const isUrlLike = (s?: string) =>
  !!s && /^(https?:\/\/|data:application\/pdf;|\/|blob:)/i.test(s);

const HomeView: React.FC<Props> = ({ profile }) => {
  const {
    greeting,
    name,
    role,
    bio,
    aboutMe,
    photo,
    resume, // could be a filename or a URL depending on your upload flow
  } = profile || {};

  const headline =
    (greeting?.trim() || "") + (name?.trim() ? ` ${name.trim()}` : "");

  return (
    <section className="relative">
      <h2 className="text-4xl font-bold text-white mb-2">Digital Identity</h2>
      <div className="w-16 h-1 bg-cyan-400 rounded-full mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,240px] gap-6 items-start">
        {/* Left: Text */}
        <div className="space-y-4 text-lg text-gray-300">
          {/* Greeting + Name */}
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {headline || "Hey there! I'm Your Name"}
          </h1>

          {/* Role */}
          <p className="text-cyan-300">
            {role?.trim() || "Your role goes here (e.g., Full Stack Developer)"}
          </p>

          {/* Bio (short) */}
          <p className="whitespace-pre-wrap">
            {bio?.trim() || "Your short bio appears here."}
          </p>

          {/* About Me (long) */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">About Me</h3>
            <p className="whitespace-pre-wrap break-words">
              {aboutMe?.trim() ||
                "Your detailed about me section appears here. Tell your story, strengths, and what you’re looking for."}
            </p>
          </div>

          {/* Resume */}
          <div className="pt-2">
            {resume ? (
              isUrlLike(resume) ? (
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-400/30 transition"
                  aria-label="View Résumé"
                >
                  <span>View Résumé</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                  Uploaded: <span className="font-medium">{resume}</span>
                </span>
              )
            ) : (
              <span className="text-gray-400">
                Upload your résumé to show a button here.
              </span>
            )}
          </div>
        </div>

        {/* Right: Photo */}
        <div className="flex md:justify-end">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-white/5 backdrop-blur">
            {photo ? (
              <img
                src={photo}
                alt={name ? `${name}'s profile photo` : "Profile photo"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No photo
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeView;
