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

// <<< FIX: export PortfolioData so other files can `import { PortfolioData } from "../page"` >>>
export type PortfolioData = ReturnType<typeof getInitialData>;

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("About Me"); // Start with the new main form
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Initialize the main data state using the complete helper function
  const [data, setData] = useState(getInitialData());

  const { user, token } = useAuth();

  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!user || !token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Start with a clean base state pre-filled with the user's details
        let baseData = getInitialData();
        baseData.aboutMe.name = user.name;
        baseData.socials.email = user.email;

        // If data was fetched successfully from the backend...
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data.data) {
            // ...deep merge the saved data ON TOP of the defaults.
            setData({
              ...baseData,
              ...result.data.data,
              // Explicitly merge nested objects to avoid them being overwritten by empty ones
              aboutMe: { ...baseData.aboutMe, ...result.data.data.aboutMe },
              socials: { ...baseData.socials, ...result.data.data.socials },
            });
            setActiveTemplate(result.data.template || "template1");
            setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
            console.log("Portfolio data loaded successfully!");
            return;
          }
        }
        
        // If fetch fails or no portfolio is found (404), use the pre-filled default data.
        console.log("No existing portfolio found or fetch failed. Using default data.");
        setData(baseData);

      } catch (error) {
        // This catch block is crucial for the "not valid JSON" error.
        console.error("Critical error during data loading:", error);
        // If there's a JSON parse error, it likely means the backend sent HTML.
        // We log the raw response to see what it was.
        if (error instanceof SyntaxError) {
          try {
             // Re-fetch to get the response as text without trying to parse JSON
             const errorResponse = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, { headers: { Authorization: `Bearer ${token}` } });
             const errorText = await errorResponse.text();
             console.error("Backend sent non-JSON response:", errorText);
          } catch (e) {
             console.error("Could not read the error response from the backend.");
          }
        }
        setData(getInitialData()); // Fallback to a completely empty state
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
      if (result.success) {
        setSaveStatus("success");
        // NEW: Update the state after a successful save
        setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
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
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 flex items-start p-5 pb-0 gap-6 overflow-hidden">
        <div className="w-[12%] h-full border border-gray-600 bg-gray-100 p-2 rounded-3xl overflow-y-auto">
          {/* IMPORTANT: Your Sidebar component will need to be updated to show all the new sections */}
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        <div className="w-[60%] h-full border border-gray-600 rounded-3xl overflow-hidden">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        <div className="w-[28%] h-full border border-gray-600 bg-gray-100 shadow-inner flex flex-col rounded-3xl overflow-hidden">
          {/* IMPORTANT: Your FormContainer component will need cases for all the new forms */}
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
      />
    </div>
  );
}
