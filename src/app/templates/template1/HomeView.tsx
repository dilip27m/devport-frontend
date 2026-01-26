"use client";
import React from "react";
import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";
import { Github, Linkedin, Mail, Zap } from "lucide-react";

type Props = {
  profile: AboutMeFormProps["data"];
  socials: SocialNetworkFormProps["data"];
};

const t = (v?: string) => (v ?? "").trim();

const normalizeEmail = (email?: string) => {
  const e = t(email);
  if (!e || !e.includes("@")) return "";
  return `mailto:${e}`;
};

const normalizeGithub = (github?: string) => {
  let g = t(github);
  if (!g) return "";
  g = g.replace(/^@/, "");
  if (/^https?:\/\//i.test(g)) return g;
  if (/^github\.com\//i.test(g)) return `https://${g}`;
  return `https://github.com/${g}`;
};

const normalizeLinkedIn = (linkedin?: string) => {
  let l = t(linkedin);
  if (!l) return "";
  if (/^https?:\/\//i.test(l)) return l;
  if (/^linkedin\.com\//i.test(l)) return `https://${l}`;
  const slug = l.startsWith("in/") ? l : `in/${l}`;
  return `https://www.linkedin.com/${slug}`;
};

const SocialLinkButton: React.FC<{ href: string, icon: React.ReactNode, label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#161b22] border border-gray-700 text-gray-200 hover:text-green-400 hover:border-green-400 transition-all duration-200"
    aria-label={`Go to ${label}`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const HomeView: React.FC<Props> = ({ profile, socials }) => {
  const { greeting, name, role, bio, aboutMe, photo } = profile || {};

  const emailHref = normalizeEmail(socials?.email);
  const githubHref = normalizeGithub(socials?.github);
  const linkedinHref = normalizeLinkedIn(socials?.linkedin);

  const nameDisplay = name?.trim() || "DEVport";
  const greetingDisplay = greeting?.trim() || "Hey there!, I'm-";
  const roleDisplay = role?.trim() || "Software Engineer. A self-taught developer with an interest in Computer Science.";
  const bioDisplay = bio?.trim() || "Currently specializing in Frontend (React / Next.js).  Full-stack Engineer at DocuAsk";

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Matches original portfolio exactly */}
      <section className="relative px-4 pt-20 pb-24">
        {/* Decorative dot pattern - top left */}
        <div className="absolute top-24 left-8 grid grid-cols-3 gap-2 opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center">

          <p className="text-base md:text-lg text-green-400 mb-3 font-medium">
            {greetingDisplay}
          </p>


          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            {nameDisplay}
          </h1>


          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            {roleDisplay}
          </p>


          {bioDisplay && (
            <div className="mb-8">
              <p className="text-sm md:text-base text-gray-400 text-center max-w-4xl mx-auto leading-relaxed break-words whitespace-pre-line">
                {bioDisplay}
              </p>
            </div>
          )}


          <div className="flex justify-center flex-wrap gap-3">
            {githubHref && <SocialLinkButton href={githubHref} icon={<Github size={16} />} label="Github" />}
            {linkedinHref && <SocialLinkButton href={linkedinHref} icon={<Linkedin size={16} />} label="LinkedIn" />}
            {emailHref && <SocialLinkButton href={emailHref} icon={<Mail size={16} />} label="Email" />}
          </div>
        </div>
      </section>


      <section className="relative max-w-7xl mx-auto px-4 pb-16 md:pb-32 pt-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">

          <div className="flex-1 max-w-3xl lg:pr-8 order-2 lg:order-1">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4 md:mb-6">
              <Zap size={20} className="text-green-400" />
              About Me
            </h2>

            <div className="text-gray-400 text-sm space-y-4 leading-relaxed">
              {aboutMe?.trim() ? (
                aboutMe.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-wrap break-words">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p>
                    Hey! I'm DEVport , I've been close to a computer since an early age, and been passionate about it ever since.
                  </p>
                  <p>
                    I really liked to build stuff using <span className="text-green-400">no-code tools</span> back in 2010, and from that, I explored how to code myself, fast-forward to today, I do programming in various languages and technologies, and had the privilege to worked in a <span className="text-green-400">Recruitment Company</span> and a <span className="text-green-400">SaaS Company</span> I'm interested in building something awesome with code and automate tasks with code, currently focused on <span className="text-green-400">Web & Mobile Development</span>, <span className="text-green-400">Open Source</span> and <span className="text-green-400">Competitive Programming</span>
                  </p>
                  <p>
                    When I'm not coding I play games with my friends, watch some show on Netflix, or if the weather's good, play basketball! 🏀
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Desktop Photo */}
          <div className="hidden lg:flex relative flex-shrink-0 items-start pt-8 order-2">

            <div className="absolute top-0 right-8 grid grid-cols-6 gap-5 opacity-30 z-0">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-600"></div>
              ))}
            </div>

            <div className="w-[280px] h-[280px] rounded-full overflow-hidden shadow-2xl relative z-10">
              {photo ? (
                <img
                  src={photo}
                  alt={name ? `${name}'s profile photo` : "Profile photo"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[#161b22]">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Photo - Shown at top on mobile */}
          <div className="lg:hidden mb-8 flex justify-center order-1">
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden shadow-2xl">
              {photo ? (
                <img
                  src={photo}
                  alt={name ? `${name}'s profile photo` : "Profile photo"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[#161b22]">
                  <svg className="w-20 h-20 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;