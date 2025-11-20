"use client";

import React from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceTimeline from "./sections/ExperienceTimeline";
import ProjectGrid from "./sections/ProjectGrid";
import SkillsCloud from "./sections/SkillsCloud";
import EducationList from "./sections/EducationList";
import AchievementCards from "./sections/AchievementCards";
import BlogList from "./sections/BlogList";
import ContactFooter from "./components/ContactFooter";

import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";
import type { Achievement } from "@/app/(main)/editor/components/forms/AchievementsForm";
import type { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";

interface Template4ShellProps {
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

const Template4Shell: React.FC<Template4ShellProps> = ({ data }) => {
  // Ensuring data exists to prevent crashes if fields are empty
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
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Ensure HeroSection is receiving both props as defined in its interface */}
        <HeroSection aboutMe={safeData.aboutMe} socials={safeData.socials} />
        
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">
          <AboutSection aboutMe={safeData.aboutMe} />
          <SkillsCloud skills={safeData.skills} />
          <ExperienceTimeline experiences={safeData.experiences} />
          <ProjectGrid projects={safeData.projects} />
          <AchievementCards achievements={safeData.achievements} />
          <EducationList education={safeData.education} />
          <BlogList blogs={safeData.blogs} />
        </div>
      </main>

      <ContactFooter socials={safeData.socials} />
    </div>
  );
};

export default Template4Shell;