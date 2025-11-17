"use client";

import React, { useState, useCallback, useEffect } from "react";

import ProjectsForm from "@/app/(main)/editor/components/forms/ProjectsForm";
import EducationForm from "@/app/(main)/editor/components/forms/EducationForm";
import SkillsForm from "@/app/(main)/editor/components/forms/SkillsForm";
import ExperienceForm from "@/app/(main)/editor/components/forms/ExperienceForm";
import AchievementsForm from "@/app/(main)/editor/components/forms/AchievementsForm";
import BlogsForm from "@/app/(main)/editor/components/forms/BlogsForm";
import SocialNetworkForm from "@/app/(main)/editor/components/forms/SocialNetworForm";
import AboutMeForm from "@/app/(main)/editor/components/forms/AboutMe";

import { SaveStatus } from "@/app/(main)/editor/components/Bottombar";
import { PortfolioData } from "@/app/(main)/editor/page";

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

  // Timestamp animation on successful save
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

  // Save button UI
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

  // Wrapper update function
  const applyUpdate = (fn: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const updated = fn(prev);
      return JSON.parse(JSON.stringify(updated));
    });
    setUnsaved(true); // Trigger toggle to "Unsaved changes"
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

      {/* Divider */}
      <div className="border-b bg-gray-50" />

      {/* Form Area */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
        {registry[section] ?? (
          <p className="text-gray-500 text-sm italic">
            Select a section to start editing...
          </p>
        )}
      </div>

      {/* ⭐ Save Bar (Perfect Toggle Version) */}
      <div className="sticky bottom-0 w-full bg-white border-t px-6 py-4 
                        flex flex-col sm:flex-row sm:items-center sm:justify-between 
                        gap-2 shadow-md">

        {/* Save Button */}
        <button
          onClick={() => {
            onSave();
            setUnsaved(false); // Switch to "Last saved"
          }}
          disabled={saveButton.disabled}
          className={`font-bold py-2 px-6 rounded-3xl transition duration-300 ease-in-out ${saveButton.className}`}
        >
          {saveButton.text}
        </button>

        {/* TOGGLE: Unsaved OR Last Saved */}
        <div className="min-w-[150px] text-right">

          {/* UNSAVED MODE */}
          {unsaved && (
            <p className="text-xs text-red-500 font-semibold">
              ● Unsaved changes
            </p>
          )}

          {/* SAVED MODE */}
          {!unsaved && lastSaved && (
            <p
              className={`text-xs font-semibold transition-all duration-[1000ms] ease-in-out ${
                highlight ? "text-black scale-105" : "text-gray-600 scale-100"
              }`}
            >
               {lastSaved}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
