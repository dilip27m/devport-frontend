"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar, { SaveStatus } from "@/app/(main)/editor/components/Bottombar";
import { useAuth } from "@/context/AuthContext";

// --- START: Import all type definitions from every form ---
import type { AboutMeFormProps } from "./components/forms/AboutMe";
import type { Project } from "./components/forms/ProjectsForm";
import type { Education } from "./components/forms/EducationForm";
import type { SkillCategory } from "./components/forms/SkillsForm";
import type { Experience } from "./components/forms/ExperienceForm";
import type { Achievement } from "./components/forms/AchievementsForm";
import type { Blog } from "./components/forms/BlogsForm";
import type { SocialNetworkFormProps } from "./components/forms/SocialNetworForm";
// --- END: Import all type definitions ---

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function to define the complete, default state for the portfolio
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

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("About Me");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // --- NEW STATES FOR PUBLISHING ---
  const [isPublished, setIsPublished] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "loading">("idle");
  // ---------------------------------

  const [data, setData] = useState(getInitialData());

  const { user, token } = useAuth();

  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!user || !token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let baseData = getInitialData();
        baseData.aboutMe.name = user.name;
        baseData.socials.email = user.email;

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) { // Check for the top-level data object
            setData({
              ...baseData,
              ...(result.data.data || {}),
              aboutMe: { ...baseData.aboutMe, ...(result.data.data?.aboutMe || {}) },
              socials: { ...baseData.socials, ...(result.data.data?.socials || {}) },
            });
            setActiveTemplate(result.data.template || "template1");
            setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
            // Set the publish status from the loaded data
            setIsPublished(result.data.isPublished ?? false); // Use `?? false` as a safety net
            console.log("Portfolio data loaded successfully!");
            return;
          }
        }
        
        console.log("No existing portfolio found or fetch failed. Using default data.");
        setData(baseData);

      } catch (error) {
        // Your excellent, robust error handling is preserved here
        console.error("Critical error during data loading:", error);
        if (error instanceof SyntaxError) {
          try {
             const errorResponse = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, { headers: { Authorization: `Bearer ${token}` } });
             const errorText = await errorResponse.text();
             console.error("Backend sent non-JSON response:", errorText);
          } catch (e) {
             console.error("Could not read the error response from the backend.");
          }
        }
        setData(getInitialData());
      }
    };

    loadPortfolioData();
  }, [user, token]);

 const handleSave = async () => {
    if (!user || !token) {
      alert("You must be logged in to save.");
      return;
    }
    setSaveStatus("saving");
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: data,
          template: activeTemplate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }
      const result = await response.json();
      if (result.success && result.data) {
        setSaveStatus("success");
        setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
        setIsPublished(result.data.isPublished); // Also update publish status on save
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

  // --- NEW FUNCTION TO HANDLE THE PUBLISH/UNPUBLISH TOGGLE ---
  const handlePublishToggle = async () => {
    if (!user || !token) return;
    setPublishStatus("loading");
    
    const endpoint = isPublished ? "unpublish" : "publish";
    
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/${endpoint}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || `Failed to ${endpoint}`);
      }
      if (result.success && result.data) {
        setIsPublished(result.data.isPublished); // Update state from the definitive backend response
      }
    } catch (error) {
      console.error("Publish toggle error:", error);
      alert(`Error: Could not ${endpoint} portfolio.`);
    } finally {
      setPublishStatus("idle");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex items-start p-5 pb-0 gap-4 overflow-hidden">
        <div className="w-[12%] h-full border border-gray-600 bg-gray-100 p-2 rounded-3xl overflow-y-auto">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        <div className="w-[59%] h-full border border-gray-600 rounded-3xl overflow-hidden">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        <div className="w-[30%] h-full border border-gray-600 bg-gray-100 shadow-inner flex flex-col rounded-3xl overflow-hidden">
          <FormContainer
            section={activeSection}
            data={data}
            setData={setData}
            onSave={handleSave}
            saveStatus={saveStatus}
            lastSaved={lastSaved}
          />
        </div>
      </div>
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        isPublished={isPublished}
        onPublishToggle={handlePublishToggle}
        publishStatus={publishStatus}
      />
    </div>
  );
}