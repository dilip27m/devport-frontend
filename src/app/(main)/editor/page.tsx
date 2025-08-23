"use client";

import React, { useState } from "react";
import Sidebar from "@/app/(main)/editor/components/Sidebar";
import FormContainer from "@/app/(main)/editor/components/FormContainer";
import LivePreview from "@/app/(main)/editor/components/LivePreview";
import BottomBar from "@/app/(main)/editor/components/Bottombar";

// ... (interface Project can stay here) ...

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("Profile");
  const [activeTemplate, setActiveTemplate] = useState("template1");

  const [data, setData] = useState({
    profile: { name: "Your Name", bio: "A short bio about yourself.", email: "your.email@example.com" },
    projects: [] as any[],
  });

  const handleDeploy = () => { /* ... */ };

  // --- FIX IS HERE ---
  // No more `h-screen`. `flex-1` tells it to grow and fill the available space.
  return (
    <div className="flex-1 flex relative">
      {/* The main editor content */}
      <div className="flex w-full">
        <div className="w-[15%] bg-gray-800 p-6 overflow-y-auto">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
        </div>
        <div className="w-[60%] p-6 overflow-y-auto">
          <LivePreview data={data} activeTemplate={activeTemplate} />
        </div>
        <div className="w-[25%] bg-white p-6 overflow-y-auto shadow-inner">
          <FormContainer section={activeSection} data={data} setData={setData} />
        </div>
      </div>

      {/* The BottomBar remains at the bottom of the viewport area */}
      <BottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={setActiveTemplate}
        onDeploy={handleDeploy}
      />
    </div>
  );
}