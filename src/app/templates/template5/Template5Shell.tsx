"use client";

import React from "react";
import Navbar from "./components/Navbar"; // Import the new Navbar
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsPhysics from "./sections/SkillsPhysics";
import ProjectGallery from "./sections/ProjectGallery";
import ExperienceTimeline from "./sections/ExperienceTimeline";
import EducationList from "./sections/EducationalList";
import ContactFooter from "./sections/ContactFooter";

import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";
import type { Achievement } from "@/app/(main)/editor/components/forms/AchievementsForm";
import type { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";

interface Template5ShellProps {
  data: {
    aboutMe: AboutMeFormProps["data"];
    projects: Project[];
    education: Education[];
    skills: SkillCategory[];
    experiences: Experience[];
    achievements: Achievement[];
    blogs: Blog[];
    socials: SocialNetworkFormProps["data"];
  };
}

const Template5Shell: React.FC<Template5ShellProps> = ({ data }) => {
  const safeData = {
    aboutMe: data?.aboutMe || {},
    projects: data?.projects || [],
    education: data?.education || [],
    skills: data?.skills || [],
    experiences: data?.experiences || [],
    achievements: data?.achievements || [],
    blogs: data?.blogs || [],
    socials: data?.socials || {},
  };

  return (
    <div className="bg-zinc-950 min-h-screen font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden text-zinc-200">
      
      {/* 1. Add the Floating Navbar */}
      <Navbar />

      {/* 2. Wrap sections in IDs for scrolling */}
      
      <div id="hero">
        <HeroSection aboutMe={safeData.aboutMe} socials={safeData.socials} />
      </div>
      
      <div className="space-y-24">
        
        <div id="about">
          <AboutSection aboutMe={safeData.aboutMe} />
        </div>

        <div id="skills">
          <SkillsPhysics skills={safeData.skills} />
        </div>

        <div id="journey">
           <ExperienceTimeline experiences={safeData.experiences} />
        </div>

        <div id="projects">
          <ProjectGallery projects={safeData.projects} />
        </div>

        <div id="education">
          <EducationList education={safeData.education} />
        </div>

      </div>

      <div id="contact">
        <ContactFooter socials={safeData.socials} />
      </div>

    </div>
  );
};

export default Template5Shell;