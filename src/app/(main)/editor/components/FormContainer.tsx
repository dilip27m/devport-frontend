"use client";

import React from "react";
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
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return {
          text: "Saving...",
          disabled: true,
          className:
            "bg-white text-gray-500 border border-gray-300 cursor-not-allowed",
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
          className: "",
        };
    }
  };

  const saveButton = getSaveButtonContent();

  // Defaults for safe merging
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

  // 🧩 Central registry for all forms
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
      {/* Header line */}
      <div className="border-b bg-gray-50" />

      {/* Dynamic form area */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
        {registry[section] ?? (
          <p className="text-gray-500 text-sm italic">
            Select a section to start editing...
          </p>
        )}
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 w-full bg-white border-t px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-md">
        <button
          onClick={onSave}
          disabled={saveButton.disabled}
          className={`font-bold py-2 px-6 rounded-3xl transition duration-300 ease-in-out
            ${
              saveStatus === "error"
                ? ""
                : "bg-white text-green-800 border border-green-500 hover:bg-green-600 hover:text-black hover:border-black"
            }
            ${saveButton.className}`}
        >
          {saveButton.text}
        </button>

        {lastSaved && (
          <p className="text-xs text-gray-500 text-right sm:text-left">
            Last saved: {lastSaved}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormContainer;
