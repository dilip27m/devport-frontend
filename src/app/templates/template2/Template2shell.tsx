"use client";

import React, { JSX, useState } from 'react';
// Import all the necessary components for this template
import HomeView from "./HomeView";
import ProjectsView from "./projects/ProjectsView";
import EducationView from "./EducationView";
import SkillsView from "./SkillsView";
import ExperienceView from "./ExperienceView";
import AchievementsView from "./AchievementsView";
import BlogsView from "./BlogsView";
import ContactView from './ContactView';
import Header from './components/header';

// Import all necessary data type definitions from your forms
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";
import type { SkillCategory } from '@/app/(main)/editor/components/forms/SkillsForm';
import type { Experience } from '@/app/(main)/editor/components/forms/ExperienceForm';
import type { Achievement } from '@/app/(main)/editor/components/forms/AchievementsForm';
import type { Blog } from '@/app/(main)/editor/components/forms/BlogsForm';
import type { SocialNetworkFormProps } from '@/app/(main)/editor/components/forms/SocialNetworForm';

// Import animation and icon libraries
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MapPin } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

// --- START: Local Sidebar Component ---
// This is a self-contained component for the fixed left-hand sidebar.
const SidebarView = ({ profile, socials }: { profile: AboutMeFormProps['data'], socials: SocialNetworkFormProps['data'] }) => {
    
    // Helper to generate an avatar with initials if no photo is provided
    const InitialsAvatar = ({ name }: { name: string }) => {
        const initial = name ? name[0].toUpperCase() : '?';
        return (
            <div className="w-full pt-[100%] relative rounded-2xl bg-gray-700 flex items-center justify-center">
                <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-white">{initial}</span>
            </div>
        );
    };

    // Maps the social media keys to their respective icons
    const iconMap: { [key: string]: JSX.Element } = {
        github: <FaGithub />,
        linkedin: <FaLinkedin />,
        twitter: <FaTwitter />,
        instagram: <FaInstagram />,
        facebook: <FaFacebook />,
    };

    // Filter out any social links that the user has not filled in
    const validSocials = Object.entries(socials || {})
        .filter(([key, value]) => key !== 'email' && value && iconMap[key]);

    return (
        <div className="bg-[#282828] text-white p-6 rounded-3xl h-full flex flex-col">
            <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                    {profile?.photo ? <img src={profile.photo} alt={profile.name} className="w-full h-full rounded-2xl object-cover" /> : <InitialsAvatar name={profile?.name || ''}/>}
                </div>
                <h1 className="text-xl md:text-2xl font-bold">{profile?.name || "Your Name"}</h1>
                <p className="bg-[#383838] inline-block px-3 py-1 mt-2 rounded-md text-xs md:text-sm">{profile?.role || 'Your Role'}</p>
            </div>
            <hr className="my-6 border-gray-600"/>
            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-[#383838] p-3 rounded-xl"><Mail size={18}/></div>
                    <div>
                        <p className="text-xs text-gray-400">EMAIL</p>
                        <a href={`mailto:${socials?.email}`} className="break-all">{socials?.email || "your.email@example.com"}</a>
                    </div>
                </div>
       
            </div>
            <div className="mt-auto pt-6 flex justify-center space-x-4">
                {validSocials.map(([key, value]) => (
                    <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl" aria-label={`Link to ${key}`}>
                        {iconMap[key]}
                    </a>
                ))}
            </div>
        </div>
    );
};
// --- END: Local Sidebar Component ---


// --- Main Template Shell ---
interface Template2ShellProps {
  data: {
    aboutMe: AboutMeFormProps['data']; projects: Project[]; education: Education[]; skills: SkillCategory[];
    experiences: Experience[]; achievements: Achievement[]; blogs: Blog[]; socials: SocialNetworkFormProps['data'];
  };
}

const Template2Shell: React.FC<Template2ShellProps> = ({ data }) => {
  const [activeSection, setActiveSection] = useState("about");

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'projects':    return <ProjectsView projects={data.projects} />;
      case 'education':   return <EducationView education={data.education} />;
      case 'skills':      return <SkillsView skills={data.skills} />;
      case 'experience':  return <ExperienceView experiences={data.experiences} />;
      case 'achievements':return <AchievementsView achievements={data.achievements} />;
      case 'blogs':       return <BlogsView blogs={data.blogs} />;
      case 'contact':     return <ContactView userEmail={data.socials.email} />;
      case 'about':
      default:
        // --- THIS IS THE FIX ---
        // This now correctly passes `data.aboutMe` to the `HomeView`.
        return <HomeView profile={data.aboutMe} />;
    }
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex p-4 md:p-8 gap-8 font-sans">
      <aside className="w-1/3 max-w-[350px] flex-shrink-0">
          <div className="sticky top-8">
             <SidebarView profile={data.aboutMe} socials={data.socials} />
          </div>
      </aside>
      <main className="flex-1 w-0 bg-[#282828] text-white rounded-3xl p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-end">
          <Header activeSection={activeSection} onNavigate={setActiveSection} />
        </div>
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 overflow-y-auto pr-2"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Template2Shell;