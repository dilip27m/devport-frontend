import React from "react";
import DeployedNavbar from "./components/DeployedNavbar";

export default function Template1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <DeployedNavbar />
      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}