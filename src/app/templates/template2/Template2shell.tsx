"use client";

import React, { useState, useEffect } from 'react';
import HomeView from "./HomeView";
import ProjectsView from "./projects/ProjectsView";
import EducationView from "./EducationView";
import SkillsView from "./SkillsView";
import ExperienceView from "./ExperienceView";
import AchievementsView from "./AchievementsView";
import BlogsView from "./BlogsView";
import ContactView from './ContactView';
import Header from './components/header';

import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';
import type { Experience } from '@/app/(main)/editor/components/forms/ExperienceForm';
import type { Achievement } from '@/app/(main)/editor/components/forms/AchievementsForm';
import type { Blog } from '@/app/(main)/editor/components/forms/BlogsForm';
import type { SocialNetworkFormProps } from '@/app/(main)/editor/components/forms/SocialNetworForm';

import { motion, AnimatePresence } from 'framer-motion';

type SectionId =
  | "about"
  | "projects"
  | "education"
  | "skills"
  | "experience"
  | "achievements"
  | "blogs"
  | "socials"
  | "contact";

interface Template2ShellProps {
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

const Template2Shell: React.FC<Template2ShellProps> = ({ data }) => {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  // Listen for navigation events from child components
  useEffect(() => {
    const handleNavigateToBlogs = () => setActiveSection('blogs');
    const handleNavigateToProjects = () => setActiveSection('projects');

    window.addEventListener('navigate-to-blogs', handleNavigateToBlogs);
    window.addEventListener('navigate-to-projects', handleNavigateToProjects);

    return () => {
      window.removeEventListener('navigate-to-blogs', handleNavigateToBlogs);
      window.removeEventListener('navigate-to-projects', handleNavigateToProjects);
    };
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'projects':
        return (
          <div className="max-w-7xl mx-auto px-4">
            <ProjectsView projects={data.projects} />
          </div>
        );
        
      case 'blogs':
        return <BlogsView blogs={data.blogs} />;
        
      case 'about':
      default:
        return (
          <>
            {/* Hero and About Me */}
            <HomeView profile={data.aboutMe} socials={data.socials} />
            
            {/* Main Content Sections */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-0">
                {/* Latest Articles */}
              {data.blogs && data.blogs.length > 0 && (
                <BlogsView limit={4} blogs={data.blogs} />
              )}

              {/* Projects Preview */}
              {data.projects && data.projects.length > 0 && (
                <ProjectsView limit={4} projects={data.projects} />
              )}
              
              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <SkillsView skills={data.skills} />
              )}
              
              {/* Experience */}
              {data.experiences && data.experiences.length > 0 && (
                <ExperienceView experiences={data.experiences} />
              )}
              
              {/* Education */}
              {data.education && data.education.length > 0 && (
                <EducationView education={data.education} />
              )}
              
              {/* Achievements */}
              {data.achievements && data.achievements.length > 0 && (
                <AchievementsView achievements={data.achievements} />
              )}
            </div>
            
            {/* Contact/Footer */}
            <div className="max-w-7xl mx-auto px-4">
              <ContactView 
                userEmail={data.socials.email} 
                socials={data.socials}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] font-sans text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <Header 
            activeSection={activeSection} 
            onNavigate={setActiveSection}
            userName={data.aboutMe.name}
          />
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Template2Shell;