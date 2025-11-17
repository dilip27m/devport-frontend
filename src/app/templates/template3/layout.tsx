import React from "react";
import DeployedNavbar from "@/app/templates/template3/components/DeployedNavbar";

export default function Template1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white font-sans">
      <DeployedNavbar />
      <main className="flex-1 max-w-full mx-auto w-full">
        {children}
      </main>
    </div>
  );
}