"use client";

import { useState } from "react";
import ViewTemplateSidebar from "@/app/(main)/viewTemplate/ViewTemplateSidebar";
import TemplateLivePreview from "@/app/(main)/viewTemplate/TemplateLivePreview";

export type TemplateKey = "template1" | "template2" | "template3" | "template4";

const ViewTemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateKey>("template1");

  return (
    <div className="h-[calc(100vh-64px)] flex bg-slate-50 overflow-hidden gap-4 p-4">
      {/* Sidebar */}
      <ViewTemplateSidebar
        selectedTemplate={selectedTemplate}
        onChangeTemplate={setSelectedTemplate}
      />

      {/* Live preview area - fixed, no scroll */}
      <div className="flex-1 overflow-hidden">
        <TemplateLivePreview selectedTemplate={selectedTemplate} />
      </div>
    </div>
  );
};

export default ViewTemplatePage;