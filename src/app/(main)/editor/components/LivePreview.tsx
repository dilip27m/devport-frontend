"use client";

import React, { Suspense } from "react";

interface TemplateShellProps {
  data: any;
}

type LazyTemplateComponent = React.LazyExoticComponent<
  React.ComponentType<TemplateShellProps>
>;

/** — Register all templates here — */
const templateRegistry = {
  template1: React.lazy(
    () => import("@/app/templates/template1/Template1Shell")
  ),
  template2: React.lazy(
    // Note: Ensuring the path is capitalized correctly to avoid casing errors
    () => import("@/app/templates/template2/Template2shell")
  ),
  // --- THIS IS THE CHANGE ---
  template3: React.lazy(
    () => import("@/app/templates/template3/Template3Shell")
  ),
  // --------------------------
} satisfies Record<string, LazyTemplateComponent>;

type TemplateKey = keyof typeof templateRegistry;

interface LivePreviewProps {
  data: any;
  /** Must be a key of templateRegistry */
  activeTemplate: TemplateKey | string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ data, activeTemplate }) => {
  const ActiveTemplateComponent =
    templateRegistry[activeTemplate as TemplateKey];

  return (
    <div className="h-full w-full overflow-hidden rounded-xl">
      <Suspense
        fallback={
          <div className="p-6 text-center text-gray-500">Loading Template...</div>
        }
      >
        {ActiveTemplateComponent ? (
          <div className="h-full overflow-y-auto no-scrollbar">
            <ActiveTemplateComponent data={data} />
          </div>
        ) : (
          <div className="p-6 text-center text-red-500">
            <strong>Error:</strong> Template "{activeTemplate}" could not be found.
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default LivePreview;