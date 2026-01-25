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
    () => import("@/app/templates/template2/Template2Shell")
  ),
  template3: React.lazy(
    () => import("@/app/templates/template3/Template3Shell")
  ),
  template4: React.lazy(
    () => import("@/app/templates/template4/Template4Shell")
  ),
  template5: React.lazy(
    () => import("@/app/templates/template5/Template5Shell")
  ),
} satisfies Record<string, LazyTemplateComponent>;

type TemplateKey = keyof typeof templateRegistry;

interface LivePreviewProps {
  data: any;
  /** Must be a key of templateRegistry */
  activeTemplate: TemplateKey | string; // allow string, but we guard at runtime
}

const LivePreview: React.FC<LivePreviewProps> = ({ data, activeTemplate }) => {
  const ActiveTemplateComponent =
    templateRegistry[activeTemplate as TemplateKey];

  return (
    <div className="h-full w-full overflow-hidden rounded-xl bg-slate-50">
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center text-gray-400">
             <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading Template...</span>
             </div>
          </div>
        }
      >
        {ActiveTemplateComponent ? (
          // FIX: Added 'relative' and 'transform' style.
          // 'transform: translate3d(0,0,0)' creates a new stacking context.
          // This forces 'fixed' children (like the Navbar) to stick to THIS div, not the browser window.
          <div 
            className="h-full overflow-y-auto no-scrollbar bg-white relative"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <ActiveTemplateComponent data={data} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-red-500 p-6 text-center">
            <strong>Error:</strong> Template "{activeTemplate}" could not be found.
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default LivePreview;