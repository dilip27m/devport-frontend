"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";

import ProjectsForm from "@/app/(main)/editor/components/forms/ProjectsForm";
import EducationForm from "@/app/(main)/editor/components/forms/EducationForm";
import SkillsForm from "@/app/(main)/editor/components/forms/SkillsForm";
import ExperienceForm from "@/app/(main)/editor/components/forms/ExperienceForm";
import AchievementsForm from "@/app/(main)/editor/components/forms/AchievementsForm";
import BlogsForm from "@/app/(main)/editor/components/forms/BlogsForm";
import SocialNetworkForm from "@/app/(main)/editor/components/forms/SocialNetworForm";
import AboutMeForm from "@/app/(main)/editor/components/forms/AboutMe";

import { PortfolioData } from "@/app/(main)/editor/page";

interface FormContainerProps {
  section: string;
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  portfolioTitle: string;
  onTitleChange: (title: string) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  section,
  data,
  setData,
  portfolioTitle,
  onTitleChange,
}) => {

  // Wrapper update function
  const applyUpdate = (fn: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const updated = fn(prev);
      return JSON.parse(JSON.stringify(updated));
    });
  };

  // Form registry
  const registry: Record<string, React.ReactNode> = {
    "About Me": (
      <AboutMeForm
        data={data.aboutMe}
        onChange={(field, value) =>
          applyUpdate(prev => ({
            ...prev,
            aboutMe: { ...prev.aboutMe, [field]: value },
          }))
        }
      />
    ),

    Projects: (
      <ProjectsForm
        projects={data.projects}
        onChange={(projects) =>
          applyUpdate(prev => ({ ...prev, projects }))
        }
      />
    ),

    Education: (
      <EducationForm
        education={data.education}
        onChange={(education) =>
          applyUpdate(prev => ({ ...prev, education }))
        }
      />
    ),

    Achievements: (
      <AchievementsForm
        achievements={data.achievements}
        onChange={(achievements) =>
          applyUpdate(prev => ({ ...prev, achievements }))
        }
      />
    ),

    Blogs: (
      <BlogsForm
        blogs={data.blogs}
        onChange={(blogs) =>
          applyUpdate(prev => ({ ...prev, blogs }))
        }
      />
    ),

    Experience: (
      <ExperienceForm
        experiences={data.experiences}
        onChange={(experiences) =>
          applyUpdate(prev => ({ ...prev, experiences }))
        }
      />
    ),

    Skills: (
      <SkillsForm
        skills={data.skills}
        onChange={(skills) =>
          applyUpdate(prev => ({ ...prev, skills }))
        }
      />
    ),

    Social: (
      <SocialNetworkForm
        data={data.socials}
        onChange={(field, value) =>
          applyUpdate(prev => ({
            ...prev,
            socials: { ...prev.socials, [field]: value },
          }))
        }
      />
    ),
  };

  return (
    <div className="flex flex-col h-full">

      {/* Portfolio Title Header */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-gray-200">
            <FileText size={18} className="text-gray-600" />
          </div>
          <input
            type="text"
            value={portfolioTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Portfolio Name (e.g., Frontend Resume)"
            className="flex-1 text-lg font-semibold bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
        {registry[section] ?? (
          <p className="text-gray-500 text-sm italic">
            Select a section to start editing...
          </p>
        )}
      </div>
    </div>
  );
};

export default FormContainer;
