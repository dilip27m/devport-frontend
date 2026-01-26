"use client";

import { useState } from "react";
import ViewTemplateSidebar from "@/app/(main)/viewTemplate/ViewTemplateSidebar";
import TemplateLivePreview from "@/app/(main)/viewTemplate/TemplateLivePreview";

export type TemplateKey = "template1" | "template2" | "template3" | "template4" | "template5";

const TEMPLATES: { id: TemplateKey; name: string }[] = [
  { id: "template1", name: "Template 1" },
  { id: "template2", name: "Template 2" },
  { id: "template3", name: "Template 3" },
  { id: "template4", name: "Template 4" },
  { id: "template5", name: "Trendy" },
];

const ViewTemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateKey>("template1");

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-slate-50 overflow-hidden gap-2 md:gap-4 p-2 md:p-4">

      {/* Mobile Template Selector - Horizontal Scroll Tabs */}
      <div className="md:hidden flex-shrink-0 w-full">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 overflow-hidden">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {TEMPLATES.map((tpl) => {
              const isActive = tpl.id === selectedTemplate;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${isActive
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {tpl.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:block flex-shrink-0">
        <ViewTemplateSidebar
          selectedTemplate={selectedTemplate}
          onChangeTemplate={setSelectedTemplate}
        />
      </div>

      {/* Live Preview Area - Full width on mobile */}
      <div className="flex-1 overflow-hidden min-h-0">
        <TemplateLivePreview selectedTemplate={selectedTemplate} />
      </div>
    </div>
  );
};

export default ViewTemplatePage;