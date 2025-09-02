"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar, { SaveStatus } from "@/app/(main)/editor/components/Bottombar";
import { useAuth } from "@/context/AuthContext";
import { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";

const API_BASE_URL = "http://localhost:5000/api";

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("Profile");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null); // NEW: State for the timestamp

  const [data, setData] = useState({
    profile: { name: "", bio: "", email: "" },
    projects: [] as Project[],
  });

  const { user, token } = useAuth();


  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!user || !token) return;
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (response.status === 404) {
          console.log("No existing portfolio found.");
          setData(prevData => ({
            ...prevData,
            profile: { ...prevData.profile, name: user.name, email: user.email },
          }));
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load portfolio data.");
        }
        
        const result = await response.json();
        if (result.success) {
          setData({
            profile: { name: "", bio: "", email: "" },
            projects: [],
            ...result.data.data,
          });
          setActiveTemplate(result.data.template);
          // NEW: Update the state with the loaded timestamp
          setLastSaved(new Date(result.data.lastUpdatedAt).toLocaleString());
          console.log("Portfolio data loaded successfully!");
        }
      } catch (error) {
        console.error("Error loading data:", error);
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
    // The main container for the entire page, relative for the bottom bar
    <div className="relative flex-1 flex flex-col">
      {/* This container holds the three main panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[15%] bg-gray-800 p-6 overflow-y-auto">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        
        {/* Middle Panel for Live Preview */}
        {/* This now has a hard boundary and will scroll internally */}
        <div className="w-[60%] p-6 bg-gray-100 overflow-y-auto">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        
        {/* Right Panel for Forms */}
        {/* This now has a hard boundary and its child will scroll */}
        <div className="w-[25%] bg-white shadow-inner flex flex-col">
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
      
      {/* The BottomBar for templates */}
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
      />
    </div>
  );
}
