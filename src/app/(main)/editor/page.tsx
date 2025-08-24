"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar, { SaveStatus } from "@/app/(main)/editor/components/Bottombar"; // Corrected import name
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = "http://localhost:5000/api";

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("Profile");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [data, setData] = useState({
    profile: { name: "", bio: "", email: "" },
    projects: [] as any[],
  });

  const { user, token } = useAuth();

  // --- UPDATED LOAD FUNCTION ---
  useEffect(() => {
    const loadPortfolioData = async () => {
      if (!user || !token) return;
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (response.status === 404) {
          console.log("No existing portfolio found.");
          setData(prevData => ({ ...prevData, profile: { ...prevData.profile, name: user.name, email: user.email } }));
          return;
        }

        if (!response.ok) { throw new Error("Failed to load portfolio data."); }
        
        const result = await response.json();
        if (result.success) {
          // Set both the data and the active template from the response
          setData(result.data.data);
          setActiveTemplate(result.data.template); 
          console.log("Portfolio data loaded successfully!");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadPortfolioData();
  }, [user, token]);

  // --- UPDATED SAVE FUNCTION ---
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
          template: activeTemplate, // Send the active template name
        }),
      });

      if (!response.ok) { throw new Error("Failed to save data."); }
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
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  return (
    <div className="flex-1 flex relative">
      <div className="flex w-full">
        <div className="w-[15%] bg-gray-800 p-6 overflow-y-auto">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        <div className="w-[60%] p-6 overflow-y-auto bg-gray-100">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        <div className="w-[25%] bg-white p-6 overflow-y-auto shadow-inner">
          <FormContainer section={activeSection} data={data} setData={setData} />
        </div>
      </div>
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        onSave={handleSave}
        saveStatus={saveStatus}
      />
    </div>
  );
}