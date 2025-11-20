"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar, { SaveStatus } from "@/app/(main)/editor/components/Bottombar";
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

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("About Me");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "loading">("idle");

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
          if (result.success && result.data) {
            setData({
              ...baseData,
              ...(result.data.data || {}),
              aboutMe: { ...baseData.aboutMe, ...(result.data.data?.aboutMe || {}) },
              socials: { ...baseData.socials, ...(result.data.data?.socials || {}) },
            });
            setActiveTemplate(result.data.template || "template1");
            setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
            setIsPublished(result.data.isPublished ?? false);
            return;
          }
        }
        setData(baseData);
      } catch (error) {
        console.error("Critical error during data loading:", error);
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

      if (!response.ok) throw new Error("Failed to save data.");
      
      const result = await response.json();
      if (result.success && result.data) {
        setSaveStatus("success");
        setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
        setIsPublished(result.data.isPublished);
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

  const handlePublishToggle = async () => {
    if (!user || !token) return;
    setPublishStatus("loading");
    
    const endpoint = isPublished ? "unpublish" : "publish";
    
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/${endpoint}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Failed to ${endpoint}`);
      
      if (result.success && result.data) {
        setIsPublished(result.data.isPublished);
      }
    } catch (error) {
      console.error("Publish toggle error:", error);
      alert(`Error: Could not ${endpoint} portfolio.`);
    } finally {
      setPublishStatus("idle");
    }
  };

  return (
    // H-full ensures it takes the remaining height (100vh - navbar height)
    // overflow-hidden prevents the main page scrollbar from appearing
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden w-full max-w-full">
        
        {/* Sidebar (Fixed Width) */}
        <div className="w-64 flex-shrink-0 h-full border border-gray-300 bg-gray-50 p-2 rounded-2xl overflow-y-auto no-scrollbar">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>

        {/* Live Preview (Flexible Width) */}
        <div className="flex-1 min-w-0 h-full border border-gray-300 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
           {/* The key fix: 'min-w-0' allows flex items to shrink below content size */}
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>

        {/* Form Container (Fixed Width) */}
        <div className="w-[400px] flex-shrink-0 h-full border border-gray-300 bg-white shadow-lg flex flex-col rounded-2xl overflow-hidden">
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

      {/* Bottom Bar */}
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