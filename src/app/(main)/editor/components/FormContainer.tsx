"use client";

import React, { useState, useCallback, useEffect } from "react";

import ProjectsForm from "./forms/ProjectsForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ExperienceForm from "./forms/ExperienceForm";
import AchievementsForm from "./forms/AchievementsForm";
import BlogsForm from "./forms/BlogsForm";
import SocialNetworkForm from "./forms/SocialNetworForm";
import AboutMeForm from "./forms/AboutMe";

import { SaveStatus } from "./Bottombar";
import { PortfolioData } from "../page";

interface FormContainerProps {
  section: string;
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  onSave: () => void;
  saveStatus: SaveStatus;
  lastSaved: string | null;
}

const FormContainer: React.FC<FormContainerProps> = ({
  section,
  data,
  setData,
  onSave,
  saveStatus,
  lastSaved,
}) => {

  const [unsaved, setUnsaved] = useState(false);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (saveStatus === "success" && lastSaved) {
      setHighlight(false);
      const t1 = setTimeout(() => setHighlight(true), 10);
      const t2 = setTimeout(() => setHighlight(false), 1000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [saveStatus, lastSaved ?? ""]);

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return {
          text: "Saving...",
          disabled: true,
          className:
            "bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed",
        };
      case "error":
        return {
          text: "Save Failed",
          disabled: false,
          className:
            "bg-red-500 text-white border border-red-600 hover:bg-red-600 hover:border-black",
        };
      default:
        return {
          text: "Save",
          disabled: false,
          className:
            "bg-white text-black border border-black hover:bg-gray-100 active:scale-[0.98]",
        };
    }
  };

  const saveButton = getSaveButtonContent();

  const applyUpdate = (fn: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const updated = fn(prev);
      return JSON.parse(JSON.stringify(updated));
    });
    setUnsaved(true); 
  };

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

      <div className="border-b bg-gray-50" />

      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
        {registry[section] ?? (
          <p className="text-gray-500 text-sm italic">
            Select a section to start editing...
          </p>
        )}
      </div>

      <div className="sticky bottom-0 w-full bg-white border-t px-6 py-4 
                        flex flex-col sm:flex-row sm:items-center sm:justify-between 
                        gap-2 shadow-md">

        <button
          onClick={() => {
            onSave();
            setUnsaved(false); 
          }}
          disabled={saveButton.disabled}
          className={`font-bold py-2 px-6 rounded-3xl transition duration-300 ease-in-out ${saveButton.className}`}
        >
          {saveButton.text}
        </button>

        <div className="min-w-[150px] text-right">

          {unsaved && (
            <p className="text-xs text-red-500 font-semibold">
              ● Unsaved changes
            </p>
          )}

          {!unsaved && lastSaved && (
            <p
              className={`text-xs font-semibold transition-all duration-[1000ms] ease-in-out ${
                highlight ? "text-black scale-105" : "text-gray-600 scale-100"
              }`}
            >
              Last saved: {lastSaved}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
