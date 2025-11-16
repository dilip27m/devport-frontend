"use client";

import React, { useState } from "react";

// --- Views ---
import Navbar from "./components/Navbar";
import AboutMePage from "./components/AboutMePage";
import ProjectsView from "./projects/ProjectsView";
import BlogsView from "./BlogsView";

// Types
import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";
import type { Achievement } from "@/app/(main)/editor/components/forms/AchievementsForm";
import type { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";

interface Template1ShellProps {
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

const Template1Shell: React.FC<Template1ShellProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "projects":
        return <ProjectsView projects={data.projects.map(project => ({
          ...project,
          links: project.links.map(link => typeof link === 'string' ? link : link.url)
        }))} />;

      case "blogs":
        return <BlogsView blogs={data.blogs} />;

      // ⭐ FULL ONE-PAGE ABOUT SECTION HERE
      case "home":
      default:
        return (
          <AboutMePage
            aboutMe={data.aboutMe}
            education={data.education}
            skills={data.skills}
            experiences={data.experiences}
            achievements={data.achievements}
            socials={data.socials}
          />
        );
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-900 text-white font-sans overflow-hidden no-scrollbar">

      <div className="relative mx-auto w-full h-full max-w-full bg-neutral-900 shadow-2xl overflow-hidden flex flex-col no-scrollbar">

        {/* ⭐ Floating Navbar */}
        <div className="absolute top-6 w-full flex justify-center z-50 px-4">
          <Navbar onNavigate={setCurrentPage} />
        </div>

        {/* ⭐ Add padding so the navbar does not overlap */}
        <main className="flex-1 overflow-y-auto pt-28 pb-10 px-2 no-scrollbar">
          {renderCurrentPage()}
        </main>

      </div>
    </div>
  );
};

export default Template1Shell;
