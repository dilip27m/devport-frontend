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
      <footer className="bg-gray-900 text-white text-center py-4">
        © {new Date().getFullYear()} My Portfolio
      </footer>
    </div>
  );
}