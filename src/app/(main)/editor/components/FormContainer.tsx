"use client";

import React, { useEffect, useState } from "react";
import ProfileForm from "./forms/ProfileForm";
import ProjectsForm from "./forms/ProjectsForm";
import EducationForm from "./forms/EducationForm";
import AchievementsForm from "./forms/AchievementsForm";
import BlogsForm from "./forms/BlogsForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import SocialNetworkForm from "./forms/SocialNetworForm";
import AboutMeForm from "./forms/AboutMe"; 
import { SaveStatus } from "./Bottombar";

interface FormContainerProps {
  section: string;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
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

  // 🔥 Updated Save Button Styling
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

  // Highlight animation for timestamp
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (saveStatus === "success" && lastSaved) {
      setHighlight(false);
      const startTimer = setTimeout(() => setHighlight(true), 10);
      const stopTimer = setTimeout(() => setHighlight(false), 1000);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
      };
    }
  }, [saveStatus, lastSaved ?? ""]);

  // Defaults for sections
  const socialDefault = {
    email: data?.profile?.email || "",
    github: "",
    linkedin: "",
    ...(data?.social || {}),
  };

  const aboutDefault = {
    greeting: data?.about?.greeting ?? "",
    name: data?.about?.name ?? data?.profile?.name ?? "",
    role: data?.about?.role ?? "",
    bio: data?.about?.bio ?? data?.profile?.bio ?? "",
    photo: data?.about?.photo ?? "",
    resume: data?.about?.resume ?? "",
    aboutMe: data?.about?.aboutMe ?? "",
  };

  const registry: Record<string, React.ReactNode> = {
    Profile: (
      <ProfileForm
        data={data.profile}
        onChange={(field, value) =>
          setData({
            ...data,
            profile: { ...data.profile, [field]: value },
          })
        }
      />
    ),

    Projects: (
      <ProjectsForm
        projects={data.projects || []}
        onChange={(projects) => setData({ ...data, projects })}
      />
    ),

    Education: (
      <EducationForm
        education={data.education || []}
        onChange={(education) => setData({ ...data, education })}
      />
    ),

    Achievements: (
      <AchievementsForm
        achievements={data.achievements || []}
        onChange={(achievements) => setData({ ...data, achievements })}
      />
    ),

    Blogs: (
      <BlogsForm
        blogs={data.blogs || []}
        onChange={(blogs) => setData({ ...data, blogs })}
      />
    ),

    Experience: (
      <ExperienceForm
        experiences={data.experiences || []}
        onChange={(experiences) => setData({ ...data, experiences })}
      />
    ),

    Skills: (
      <SkillsForm
        skills={data.skills || []}
        onChange={(skills) => setData({ ...data, skills })}
      />
    ),

    Social: (
      <SocialNetworkForm
        data={socialDefault}
        onChange={(field, value) =>
          setData({
            ...data,
            social: { ...socialDefault, [field]: value },
          })
        }
      />
    ),

    "About Me": (
      <AboutMeForm
        data={aboutDefault}
        onChange={(field, value) =>
          setData({
            ...data,
            about: { ...aboutDefault, [field]: value },
          })
        }
      />
    ),
  };

  return (
    <div className="flex flex-col h-full">
      {/* Divider */}
      <div className="border-b bg-gray-50" />

      {/* Form area */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
        {registry[section] ?? (
          <p className="text-gray-500 text-sm italic">
            Select a section to start editing...
          </p>
        )}
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 w-full bg-white border-t px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-md">

        {/* 🔥 Updated Save Button */}
        <button
          onClick={onSave}
          disabled={saveButton.disabled}
          className={`font-bold py-2 px-6 rounded-3xl transition duration-300 ease-in-out ${saveButton.className}`}
        >
          {saveButton.text}
        </button>

        {/* Timestamp animation */}
        {lastSaved && (
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
  );
};

export default FormContainer;