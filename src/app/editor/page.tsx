"use client";

import React, { useState } from "react";
import Sidebar from "@/components/editor/Sidebar";
import FormContainer from "@/components/editor/FormContainer";
import LivePreview from "@/components/editor/LivePreview";

export default function EditorPage() {
  const [activeSection, setActiveSection] = useState("Profile");

  const [data, setData] = useState({
    profile: { name: "", bio: "", email: "" },
    skills: [] as string[],
    projects: [] as any[],
    certifications: [] as any[],
    blogs: [] as any[],
    activities: [] as any[],
  });

  return (
    <div className="flex h-screen">
      <div className="w-[10%] bg-gray-900  p-6 overflow-y-auto">
        <Sidebar active={activeSection} onSelect={setActiveSection} />
      </div>

      <div className="w-[65%] p-6 border-l bg-white overflow-y-auto">
        <LivePreview data={data} />
      </div>
      <div className="w-[25%] p-6 bg-gray-50 overflow-y-auto">
        <FormContainer section={activeSection} data={data} setData={setData} />
      </div>

    </div>
  );
}
