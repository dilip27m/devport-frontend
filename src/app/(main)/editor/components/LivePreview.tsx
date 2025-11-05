"use client";

import React, { Suspense } from "react";

interface TemplateShellProps {
  data: any;
}

type LazyTemplateComponent = React.LazyExoticComponent<
  React.ComponentType<TemplateShellProps>
>;

const Template1: LazyTemplateComponent = React.lazy(
  () => import("@/app/templates/template1/Template1Shell")
);

const templateComponents: { [key: string]: LazyTemplateComponent } = {
  template1: Template1,
};

interface LivePreviewProps {
  data: any;
  activeTemplate: string;
}
// --- AFTER (Cleaner and Corrected) ---

const LivePreview: React.FC<LivePreviewProps> = ({ data, activeTemplate }) => {
  const ActiveTemplateComponent = templateComponents[activeTemplate];

  return (
    // 1. ADD `overflow-hidden` to clip the child template.
    // 2. REMOVE redundant styling. The parent `div` in `page.tsx` now handles
    //    the background, border radius, and shadow.
    // 3. SET `h-full` to ensure this container fills its parent correctly.
    <div className="h-full w-full overflow-hidden rounded-xl">
      <Suspense
        fallback={
          <div className="p-6 text-center text-gray-500">
            Loading Template...
          </div>
        }
      >
        {ActiveTemplateComponent ? (
          <>
            {/* The internal structure can be simplified. The parent handles scrolling. */}
            {/* We add extra padding at the bottom so the REAL bottom bar doesn't hide content */}
            <div className="h-full overflow-y-auto no-scrollbar ">
              <ActiveTemplateComponent data={data} />
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-red-500">
            <strong>Error:</strong> Template "{activeTemplate}" could not be
            found.
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default LivePreview;
