"use client";

import React from "react";
import type { TemplateKey } from "@/app/(main)/viewTemplate/page";

interface ViewTemplateSidebarProps {
  selectedTemplate: TemplateKey;
  onChangeTemplate: (tpl: TemplateKey) => void;
}

const TEMPLATES: { id: TemplateKey; name: string }[] = [
  {
    id: "template1",
    name: "Template 1",
  },
  {
    id: "template2",
    name: "Template 2",
  },
  {
    id: "template3",
    name: "Template 3",
  },
    {
    id: "template4",
    name: "Template 4",
  },
    {
    id: "template5",
    name: "Template 5 (Trendy)",
  }
];


const ViewTemplateSidebar: React.FC<ViewTemplateSidebarProps> = ({
  selectedTemplate,
  onChangeTemplate,
}) => {
  return (
    <aside className="w-64 bg-gray-100 border-2 border-gray-300 rounded-3xl flex flex-col p-4 overflow-hidden flex-shrink-0">
      <div className="px-2 mb-4">
        <h2 className="text-sm font-semibold text-slate-700">Templates</h2>
      </div>

      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {TEMPLATES.map((tpl) => {
          const isActive = tpl.id === selectedTemplate;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onChangeTemplate(tpl.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-gray-50"
              }`}
            >
              <span>{tpl.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default ViewTemplateSidebar;