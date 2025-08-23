"use client";

import React, { Suspense } from "react";

// --- START OF FIX ---

// 1. Define an interface for the props that ALL template shells will receive.
//    This tells TypeScript what to expect.
interface TemplateShellProps {
  data: any; // You can make this more specific later if you want
}

// 2. We use this interface to create a more specific type for our lazy-loaded components.
type LazyTemplateComponent = React.LazyExoticComponent<React.ComponentType<TemplateShellProps>>;

// --- END OF FIX ---


// Now, we use our new, more specific type for our components and map.
const Template1: LazyTemplateComponent = React.lazy(() => import("@/app/templates/template1/Template1Shell"));
// const Template2: LazyTemplateComponent = React.lazy(() => import("@/app/templates/template2/Template2Shell"));


const templateComponents: { [key: string]: LazyTemplateComponent } = {
  template1: Template1,
  // template2: Template2,
};

interface LivePreviewProps {
  data: any;
  activeTemplate: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ data, activeTemplate }) => {
  const ActiveTemplateComponent = templateComponents[activeTemplate];

  return (
    <div className="h-full w-full bg-white rounded-lg shadow-lg overflow-auto">
      <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading Template...</div>}>
        {ActiveTemplateComponent ? (
          // Now, TypeScript knows that ActiveTemplateComponent accepts a 'data' prop. The error is gone.
          <ActiveTemplateComponent data={data} />
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