"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar, { SaveStatus } from "@/app/(main)/editor/components/Bottombar";
import { useAuth } from "@/context/AuthContext";

// Import the specific 'Project' type definition from your form component.
// This is the "contract" that ensures the data structure is consistent.
import { Project } from "@/app/(main)/editor/components/forms/ProjectsForm";

const API_BASE_URL = "http://localhost:5000/api";

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("Profile");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // The main state for all portfolio data.
  // We explicitly use the 'Project[]' type for the projects array.
  const [data, setData] = useState({
    profile: { name: "", bio: "", email: "" },
    projects: [] as Project[],
    // We can add other sections here as we build them
    // skills: [] as { id: string, name: string }[],
  });

  const { user, token } = useAuth();

  // This effect runs once when the page loads to fetch the user's saved data.
  useEffect(() => {
    const loadPortfolioData = async () => {
      // Don't run if the user isn't logged in yet.
      if (!user || !token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        // If a 404 is returned, it means it's a new user with no saved portfolio.
        if (response.status === 404) {
          console.log("No existing portfolio found. Pre-filling with user info.");
          // Pre-fill the profile with the user's name and email.
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
          // Update the state with the data and template choice from the database.
          // Spreading a default structure first prevents errors if the DB data is missing a field.
          setData({
            profile: { name: "", bio: "", email: "" },
            projects: [],
            ...result.data.data,
          });
          setActiveTemplate(result.data.template);
          console.log("Portfolio data loaded successfully!");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadPortfolioData();
  }, [user, token]); // This effect re-runs if the user logs in or out.

  // This function is called when the user clicks the "Save" button.
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
          data: data, // The entire portfolio data object
          template: activeTemplate, // The user's chosen template
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }
      const result = await response.json();
      if (result.success) {
        setSaveStatus("success");
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveStatus("error");
    } finally {
      // Reset the button's state after 2 seconds.
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex-1 flex relative">
      <div className="flex w-full">
        {/* Left Sidebar for navigation */}
        <div className="w-[15%] bg-gray-800 p-6 overflow-y-auto">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        
        {/* Middle panel for the live template preview */}
        <div className="w-[60%] p-6 overflow-y-auto bg-gray-100">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        
        {/* Right panel for the editor forms */}
        <div className="w-[25%] bg-white p-6 overflow-y-auto shadow-inner">
          <FormContainer section={activeSection} data={data} setData={setData} />
        </div>
      </div>
      
      {/* Bottom bar for templates, saving, and deploying */}
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        onSave={handleSave}
        saveStatus={saveStatus}
      />
    </div>
  );
}