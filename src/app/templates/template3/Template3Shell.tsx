"use client";

import React, { useState } from "react";
import Header, { SectionId } from './components/Header';
import PortfolioView from "./sections/PortfolioView";
import ProjectsView from "./sections/ProjectsView";
import SkillsView from "./sections/SkillsView";
import BlogsView from "./sections/BlogsView";
import type { PortfolioData } from '@/app/(main)/editor/page';
import { motion, AnimatePresence } from "framer-motion";

// Example/placeholder data for preview
const getExampleData = (): PortfolioData => ({
  aboutMe: {
    greeting: "Hi, I'm",
    name: "Alex Johnson",
    role: "Full Stack Developer",
    bio: "I'm a passionate developer who loves building elegant solutions to complex problems. With expertise in modern web technologies, I create seamless user experiences.",
    aboutMe: "I specialize in React, Node.js, and cloud technologies. When I'm not coding, you'll find me contributing to open-source projects.",
    photo: "",
  },
  projects: [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with real-time inventory management and secure payment processing.",
      links: [{ label: "Live Demo", url: "#" }, { label: "GitHub", url: "#" }],
      image: "",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      stack: ["React", "Node.js", "MongoDB", "AWS"],
      type: "Web"
    },
    {
      title: "AI Task Manager",
      description: "An intelligent task management app using machine learning to prioritize tasks and predict completion times.",
      links: [{ label: "Live Site", url: "#" }],
      image: "",
      startDate: "2023-08-01",
      endDate: "2023-12-01",
      stack: ["Python", "TensorFlow", "React"],
      type: "AI"
    }
  ],
  experiences: [
    {
      role: "Senior Software Engineer",
      company: "Tech Innovations Inc",
      startDate: "2022-07-01",
      endDate: "",
      isPresent: true,
      descriptionBullets: [
        "Led development of microservices architecture serving 100K+ daily users",
        "Reduced API response time by 40% through optimization strategies",
        "Mentored 5 junior developers and conducted code review sessions"
      ],
      stack: ["React", "Node.js", "AWS", "Docker"],
      links: []
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "Tech University",
      startMonth: "Aug",
      startYear: "2018",
      endMonth: "May",
      endYear: "2022",
      grade: "3.8 GPA"
    }
  ],
  skills: [
    {
      name: "Frontend",
      skills: ["react", "vue", "typescript", "tailwind", "nextjs"]
    },
    {
      name: "Backend",
      skills: ["nodejs", "python", "express", "mongodb", "postgresql"]
    }
  ],
  achievements: [
    {
      title: "Winner - National Hackathon 2023",
      description: "Led a team to build an AI-powered solution that won first place among 200+ teams.",
      year: "2023",
      image: ""
    },
    {
      title: "Open Source Contributor",
      description: "Active contributor to React and Node.js ecosystems with 500+ stars.",
      year: "2022",
      image: ""
    }
  ],
  blogs: [
    {
      name: "Building Scalable React Applications",
      category: "Web Development",
      image: "",
      description: "A comprehensive guide to architecting large-scale React applications with best practices.",
      link: "#"
    },
    {
      name: "Getting Started with Docker",
      category: "DevOps",
      image: "",
      description: "A beginner-friendly tutorial on containerization with Docker.",
      link: "#"
    }
  ],
  socials: {
    email: "alex.johnson@email.com",
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson"
  }
});

const Template3Shell: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const [activePage, setActivePage] = useState<SectionId>("portfolio");

  // Get example data
  const exampleData = getExampleData();

  // Helper function to check if user has entered data
  const hasUserData = (userData: any, exampleValue: any): boolean => {
    if (Array.isArray(userData)) {
      return userData.length > 0;
    }
    if (typeof userData === 'object' && userData !== null) {
      return Object.keys(userData).some(key => {
        const value = userData[key];
        return value !== "" && value !== undefined && value !== null;
      });
    }
    return userData !== "" && userData !== undefined && userData !== null;
  };

  // Merge user data with example data - user data takes priority
  const safeData: PortfolioData = {
    aboutMe: hasUserData(data?.aboutMe, exampleData.aboutMe) 
      ? (data?.aboutMe || {}) 
      : exampleData.aboutMe,
    
    projects: (data?.projects && data.projects.length > 0) 
      ? data.projects 
      : exampleData.projects,
    
    skills: (data?.skills && data.skills.length > 0) 
      ? data.skills 
      : exampleData.skills,
    
    blogs: (data?.blogs && data.blogs.length > 0) 
      ? data.blogs 
      : exampleData.blogs,
    
    experiences: (data?.experiences && data.experiences.length > 0) 
      ? data.experiences 
      : exampleData.experiences,
    
    education: (data?.education && data.education.length > 0) 
      ? data.education 
      : exampleData.education,
    
    achievements: (data?.achievements && data.achievements.length > 0) 
      ? data.achievements 
      : exampleData.achievements,
    
    socials: hasUserData(data?.socials, exampleData.socials) 
      ? (data?.socials || {}) 
      : exampleData.socials,
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

      <main className="flex-1 overflow-y-auto pt-[96px] no-scrollbar">
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