"use client";

import React, { useState, useEffect } from "react";

// --- THIS IS THE FIX ---
// Add (main) to all the import paths that point to the editor folder.
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar, { SaveStatus } from "@/app/(main)/editor/components/Bottombar";
// -----------------------


// Replace with a real user ID once you have authentication.
const TEMP_USER_ID = "testUser123";
const API_BASE_URL = "http://localhost:5000/api"; // Your backend URL

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("Profile");
  const [activeTemplate, setActiveTemplate] = useState("template1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const [data, setData] = useState({
    profile: { name: "", bio: "", email: "" },
    projects: [] as any[],
  });

  // --- LOAD DATA on component mount ---
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${TEMP_USER_ID}`);
        
        if (response.status === 404) {
          console.log("No existing portfolio found. Starting with a blank slate.");
          return;
        }
        
        if (!response.ok) {
          throw new Error("Failed to load portfolio data.");
        }
        
        const result = await response.json();
        if (result.success && result.data.data) {
          setData(result.data.data);
          console.log("Portfolio data loaded successfully!");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadPortfolioData();
  }, []);

  // --- SAVE DATA function ---
  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: TEMP_USER_ID,
          data: data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data.");
      }

      const result = await response.json();
      if (result.success) {
        setSaveStatus("success");
        console.log("Data saved successfully!");
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setSaveStatus("error");
    } finally {
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }
  };

  // The rest of the return statement is correct...
  return (
    <div className="flex-1 flex relative">
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-[15%] bg-gray-800 p-6 overflow-y-auto">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        {/* Live Preview */}
        <div className="w-[60%] p-6 overflow-y-auto bg-gray-100">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        {/* Form Container */}
        <div className="w-[25%] bg-white p-6 overflow-y-auto shadow-inner">
          <FormContainer section={activeSection} data={data} setData={setData} />
        </div>
      </div>
      {/* Bottom Bar */}
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        onSave={handleSave}
        saveStatus={saveStatus}
      />
    </div>
  );
}