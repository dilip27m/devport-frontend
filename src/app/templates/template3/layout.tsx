import React from "react";
import DeployedNavbar from "./components/DeployedNavbar";

export default function Template1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // CHANGE: Set a deep gray/black background and white text
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white font-sans">
      <DeployedNavbar />
      {/* Retain flex-1 and center main content without the inner white box */}
      <main className="flex-1 max-w-full mx-auto w-full">
        {children}
      </main>
    </div>
  );
}