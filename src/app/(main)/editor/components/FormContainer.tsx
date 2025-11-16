"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

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

const DRAFT_KEY = "portfolio_draft_v1";
const DEBOUNCE_MS = 400;

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
  // ----------------------------------------------
  // 🔥 Unsaved tracking (debounced)
  // ----------------------------------------------
  const [unsaved, setUnsaved] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);

  // Reference snapshot for comparison
  const prevDataRef = useRef<PortfolioData>(data);

  // ----------------------------------------------
  // 🔥 Local Draft Backup (debounced)
  // ----------------------------------------------
  const localSaveTimerRef = useRef<number | null>(null);

  const scheduleLocalSave = useCallback((payload: PortfolioData) => {
    if (localSaveTimerRef.current) {
      window.clearTimeout(localSaveTimerRef.current);
    }
    localSaveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
      } catch {}
      localSaveTimerRef.current = null;
    }, 800);
  }, []);

  // ----------------------------------------------
  // 🔥 Apply form updates (core wrapper)
  // ----------------------------------------------
  const applyUpdate = useCallback(
    (next: PortfolioData | ((prev: PortfolioData) => PortfolioData)) => {
      const newState =
        typeof next === "function" ? (next as any)(prevDataRef.current) : next;

      setData(() => JSON.parse(JSON.stringify(newState)));

      prevDataRef.current = JSON.parse(JSON.stringify(newState));

      scheduleLocalSave(newState);

      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        setUnsaved(true);
        debounceTimerRef.current = null;
      }, DEBOUNCE_MS);
    },
    [scheduleLocalSave, setData]
  );

  // ----------------------------------------------
  // 🔥 AutoSave every 5 seconds
  // ----------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (unsaved && saveStatus !== "saving") {
        onSave();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [unsaved, saveStatus, onSave]);

  // ----------------------------------------------
  // 🔥 After save: sync & clear draft
  // ----------------------------------------------
  useEffect(() => {
    if (saveStatus === "success") {
      prevDataRef.current = JSON.parse(JSON.stringify(data));
      setUnsaved(false);

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
    }
  }, [saveStatus, data]);

  // ----------------------------------------------
  // 🔥 Restore draft on mount
  // ----------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);

      if (JSON.stringify(draft) !== JSON.stringify(data)) {
        setData(JSON.parse(JSON.stringify(draft)));
        prevDataRef.current = JSON.parse(JSON.stringify(draft));
        setUnsaved(false);
      }
    } catch {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------
  // 🔥 Page leave warning
  // ----------------------------------------------
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (unsaved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [unsaved]);

  // ----------------------------------------------
  // 🔥 Last Saved Animation (UNCHANGED)
  // ----------------------------------------------
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

  // ----------------------------------------------
  // 🔥 Save Button (UNCHANGED)
  // ----------------------------------------------
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return {
          text: "Saving...",
          disabled: true,
          className:
            "bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed",
        };

      case "success":
        return {
          text: "Saved!",
          disabled: true,
          className:
            "bg-green-600 text-white border border-green-700 shadow-md",
        };

      case "error":
        return {
          text: "Save Failed",
          disabled: false,
          className:
            "bg-red-500 text-white border border-red-600 hover:bg-red-600",
        };

      default:
        return {
          text: "Save",
          disabled: false,
          className:
            "bg-white text-green-800 border border-green-500 hover:bg-green-600 hover:text-white",
        };
    }
  };

  const saveButton = getSaveButtonContent();

  // ----------------------------------------------
  // 🔥 Forms Registry
  // ----------------------------------------------
  const formRegistry: Record<string, React.ReactNode> = {
    Profile: (
      <AboutMeForm
        data={data.aboutMe}
        onChange={(field: string, value: any) =>
          applyUpdate(prev => ({
            ...prev,
            aboutMe: { ...prev.aboutMe, [field]: value },
          }))
        }
      />
    ),

    "About Me": (
      <AboutMeForm
        data={data.aboutMe}
        onChange={(field: string, value: any) =>
          applyUpdate(prev => ({
            ...prev,
            aboutMe: { ...prev.aboutMe, [field]: value },
          }))
        }
      />
    ),

    Projects: (
      <ProjectsForm
        projects={data.projects || []}
        onChange={projects =>
          applyUpdate(prev => ({ ...prev, projects }))
        }
      />
    ),

    Education: (
      <EducationForm
        education={data.education || []}
        onChange={education =>
          applyUpdate(prev => ({ ...prev, education }))
        }
      />
    ),

    Skills: (
      <SkillsForm
        skills={data.skills || []}
        onChange={skills =>
          applyUpdate(prev => ({ ...prev, skills }))
        }
      />
    ),

    Experience: (
      <ExperienceForm
        experiences={data.experiences || []}
        onChange={experiences =>
          applyUpdate(prev => ({ ...prev, experiences }))
        }
      />
    ),

    Achievements: (
      <AchievementsForm
        achievements={data.achievements || []}
        onChange={achievements =>
          applyUpdate(prev => ({ ...prev, achievements }))
        }
      />
    ),

    Blogs: (
      <BlogsForm
        blogs={data.blogs || []}
        onChange={blogs =>
          applyUpdate(prev => ({ ...prev, blogs }))
        }
      />
    ),

    Social: (
      <SocialNetworkForm
        data={data.socials}
        onChange={(field: string, value: any) =>
          applyUpdate(prev => ({
            ...prev,
            socials: { ...prev.socials, [field]: value },
          }))
        }
      />
    ),
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="border-b bg-gray-50 p-4">
        <h2 className="text-lg font-bold text-gray-800">{section}</h2>
      </div>

      {/* Main section */}
      <div className="flex-1 p-6 overflow-y-auto pb-32">
        {formRegistry[section] ?? (
          <p className="text-center text-gray-500 mt-10">
            Select a section to start editing...
          </p>
        )}
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 w-full bg-white border-t px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-inner">

        {/* Save button */}
        <button
          onClick={() => {
            onSave();
            setUnsaved(false);
          }}
          disabled={saveButton.disabled || !unsaved}
          className={`font-bold py-2 px-6 rounded-3xl transition duration-300 ease-in-out ${saveButton.className} ${
            !unsaved ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {saveButton.text}
        </button>

        {/* Toggle: Unsaved / Saving / Last Saved */}
        <div>
          {unsaved ? (
            <p className="text-xs text-red-500 font-semibold">● Unsaved changes</p>
          ) : saveStatus === "saving" ? (
            <p className="text-xs text-gray-600 font-semibold">Saving...</p>
          ) : lastSaved ? (
            <p
              className={`text-xs font-semibold transition-all duration-[1000ms] ease-in-out ${
                highlight ? "text-black scale-105" : "text-gray-600 scale-100"
              }`}
            >
              Last saved: {lastSaved}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
