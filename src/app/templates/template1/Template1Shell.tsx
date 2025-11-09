"use client";

import React, { useState } from "react";

// --- Import all View Components for this template ---
import Navbar from "./components/Navbar";
import HomeView from "./HomeView"; 
import ProjectsView from "./projects/ProjectsView"; 
import EducationView from "./Education/EducationView";
import SkillsView from "./SkillsView";
import ExperienceView from "./ExperienceView";
import AchievementsView from "./AchievementsView";
import BlogsView from "./BlogsView";
import SocialsView from "./SocialsView";

// --- Import all necessary Data Type definitions from your forms ---
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';
import type { Project } from '@/app/(main)/editor/components/forms/ProjectsForm';
import type { Education } from '@/app/(main)/editor/components/forms/EducationForm';
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';
import type { Experience } from '@/app/(main)/editor/components/forms/ExperienceForm';
import type { Achievement } from '@/app/(main)/editor/components/forms/AchievementsForm';
import type { Blog } from '@/app/(main)/editor/components/forms/BlogsForm';
import type { SocialNetworkFormProps } from '@/app/(main)/editor/components/forms/SocialNetworForm';

// --- This is the complete data structure this template now expects ---
interface Template1ShellProps {
  data: {
    aboutMe: AboutMeFormProps['data'];
    projects: Project[];
    education: Education[];
    skills: SkillCategory[];
    experiences: Experience[];
    achievements: Achievement[];
    blogs: Blog[];
    socials: SocialNetworkFormProps['data'];
  };
}

const Template1Shell: React.FC<Template1ShellProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState("home");

  // This function renders the correct component based on the user's selection
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "projects":    return <ProjectsView projects={data.projects} />;
      case "education":   return <EducationView education={data.education} />;
      case "skills":      return <SkillsView skills={data.skills} />;
      case "experience":  return <ExperienceView experiences={data.experiences} />;
      case "achievements":return <AchievementsView achievements={data.achievements} />;
      case "blogs":       return <BlogsView blogs={data.blogs} />;
      case "socials":     return <SocialsView data={data.socials} />;
      case "home":
      default:
        // The HomeView now receives the `aboutMe` object
        return <HomeView aboutMe={data.aboutMe} />; 
    }
  };

  return (
    <div className="h-full flex flex-col bg-white font-sans">
      <Navbar onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Template1Shell;