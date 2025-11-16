"use client";

import React, { useState } from "react";
import Header, { SectionId } from './components/Header';
import PortfolioView from "./sections/PortfolioView";
import ProjectsView from "./sections/ProjectsView";
import SkillsView from "./sections/SkillsView";
import BlogsView from "./sections/BlogsView";
import type { PortfolioData } from '@/app/(main)/editor/page';
import { motion, AnimatePresence } from "framer-motion";

const Template3Shell: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const [activePage, setActivePage] = useState<SectionId>("portfolio");

  // Ensure data has safe defaults
  const safeData: PortfolioData = {
    aboutMe: data?.aboutMe || {},
    projects: data?.projects || [],
    skills: data?.skills || [],
    blogs: data?.blogs || [],
    experiences: data?.experiences || [],
    education: data?.education || [],
    achievements: data?.achievements || [],
    socials: data?.socials || {},
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case "projects":
        return <ProjectsView projects={safeData.projects || []} />;
      case "skills":
        return <SkillsView skills={safeData.skills || []} />;
      case "blogs":
        return <BlogsView blogs={safeData.blogs || []} />;
      case "portfolio":
      default:
        return <PortfolioView data={safeData} />;
    }
  };

  return (
    <div className="h-full w-full bg-black text-gray-300 font-sans flex flex-col relative">
      <Header activePage={activePage} onNavigate={setActivePage} />

      <main className="flex-1 overflow-y-auto pt-[80px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Template3Shell;