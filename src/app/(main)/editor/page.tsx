"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar from "@/app/(main)/editor/components/Bottombar";
import { useAuth } from "@/context/AuthContext";

import type { AboutMeFormProps } from "@/app/(main)/editor/components/forms/AboutMe";
import type { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";
import type { Education } from "@/app/(main)/editor/components/forms/EducationForm";
import type { SkillCategory } from "@/app/(main)/editor/components/forms/SkillsForm";
import type { Experience } from "@/app/(main)/editor/components/forms/ExperienceForm";
import type { Achievement } from "@/app/(main)/editor/components/forms/AchievementsForm";
import type { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getInitialData = () => ({
  aboutMe: { greeting: "", name: "", role: "", bio: "", photo: "", resume: "", aboutMe: "" } as AboutMeFormProps['data'],
  projects: [] as Project[],
  education: [] as Education[],
  skills: [] as SkillCategory[],
  experiences: [] as Experience[],
  achievements: [] as Achievement[],
  blogs: [] as Blog[],
  socials: { email: '', github: '', linkedin: '' } as SocialNetworkFormProps['data'],
});

export type PortfolioData = ReturnType<typeof getInitialData>;
export type SaveStatus = "idle" | "saving" | "success" | "error";

// Resize constraints
const MIN_FORM_WIDTH = 300;
const MAX_FORM_WIDTH = 800;
const DEFAULT_FORM_WIDTH = 400;

export default function EditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const portfolioIdFromUrl = searchParams.get("portfolioId");

  const [portfolioId, setPortfolioId] = useState<string | null>(portfolioIdFromUrl);
  const [portfolioTitle, setPortfolioTitle] = useState("My Portfolio");
  const [activeSection, setActiveSection] = useState("About Me");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [data, setData] = useState(getInitialData());
  const { user, token } = useAuth();

  // Resizable form width state
  const [formWidth, setFormWidth] = useState(DEFAULT_FORM_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle resize logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      // Calculate width from the right edge of the container
      const newWidth = containerRect.right - e.clientX;

      // Apply constraints
      const clampedWidth = Math.min(MAX_FORM_WIDTH, Math.max(MIN_FORM_WIDTH, newWidth));
      setFormWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      // Prevent text selection while resizing
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!user || !token) return;

      let baseData = getInitialData();
      baseData.aboutMe.name = user.name;
      baseData.socials.email = user.email;

      // If no portfolioId, we're creating a new portfolio
      if (!portfolioIdFromUrl) {
        setData(baseData);
        setPortfolioId(null);
        setPortfolioTitle("My Portfolio");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${portfolioIdFromUrl}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData({
              ...baseData,
              ...(result.data.data || {}),
              aboutMe: { ...baseData.aboutMe, ...(result.data.data?.aboutMe || {}) },
              socials: { ...baseData.socials, ...(result.data.data?.socials || {}) },
            });
            setActiveTemplate(result.data.template || "template1");
            setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
            setPortfolioId(result.data._id);
            setPortfolioTitle(result.data.title || "My Portfolio");
            return;
          }
        }
        // If portfolio not found, reset to base data
        setData(baseData);
      } catch (error) {
        console.error("Critical error during data loading:", error);
        setData(getInitialData());
      }
    };

    loadPortfolioData();
  }, [user, token, portfolioIdFromUrl]);

  const handleSave = async () => {
    if (!user || !token) {
      alert("You must be logged in to save.");
      return;
    }
    setSaveStatus("saving");
    try {
      const isUpdate = !!portfolioId;
      const url = isUpdate
        ? `${API_BASE_URL}/portfolio/${portfolioId}`
        : `${API_BASE_URL}/portfolio`;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: data,
          template: activeTemplate,
          title: portfolioTitle,
        }),
      });

      if (!response.ok) throw new Error("Failed to save data.");

      const result = await response.json();
      if (result.success && result.data) {
        setSaveStatus("success");
        setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
        setHasUnsavedChanges(false);

        // If this was a new portfolio, update the URL and state with the new ID
        if (!isUpdate && result.data._id) {
          setPortfolioId(result.data._id);
          router.replace(`/editor?portfolioId=${result.data._id}`);
        }
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveStatus("error");
    } finally {
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white overflow-hidden">

      {/* Main Content Area */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col md:flex-row p-2 md:p-4 overflow-hidden w-full max-w-full gap-2 md:gap-0"
      >

        {/* Mobile: Horizontal Section Selector at Top */}
        <div className="md:hidden flex-shrink-0 w-full">
          <Sidebar active={activeSection} onSelect={setActiveSection} isMobile={true} />
        </div>

        {/* Desktop: Sidebar (Collapsed - Icons Only) */}
        <div className="hidden md:block w-16 flex-shrink-0 h-full border border-gray-300 bg-gray-50 rounded-2xl overflow-visible mr-4">
          <Sidebar active={activeSection} onSelect={setActiveSection} isMobile={false} />
        </div>

        {/* Live Preview (Flexible Width) - Hidden on Mobile */}
        <div className="hidden md:block flex-1 min-w-0 h-full border border-gray-300 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>

        {/* Resize Handle - Hidden on Mobile */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:flex w-4 flex-shrink-0 cursor-col-resize items-center justify-center group"
          title="Drag to resize"
        >
          <div
            className={`
              w-1 h-12 rounded-full transition-all duration-200
              ${isResizing
                ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                : "bg-gray-200 group-hover:bg-gray-400 group-hover:h-20"
              }
            `}
          />
        </div>

        {/* Form Container - Full width on mobile, resizable on desktop */}
        <div
          style={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : formWidth }}
          className="w-full md:w-auto flex-shrink-0 h-full border border-gray-300 bg-white shadow-lg flex flex-col rounded-2xl overflow-hidden"
        >
          <FormContainer
            section={activeSection}
            data={data}
            setData={(updater) => {
              setData(updater);
              setHasUnsavedChanges(true);
            }}
            portfolioTitle={portfolioTitle}
            onTitleChange={(title) => {
              setPortfolioTitle(title);
              setHasUnsavedChanges(true);
            }}
          />
        </div>

      </div>

      {/* Bottom Bar - Save + View + Templates */}
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={(template) => {
          setActiveTemplate(template);
          setHasUnsavedChanges(true);
        }}
        onSave={handleSave}
        saveStatus={saveStatus}
        lastSaved={lastSaved}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
}