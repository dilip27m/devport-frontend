"use client";

import React, { useState } from "react";

// Local Imports for the Shell
import Navbar from "./components/Navbar";
import HomeView from "./HomeView"; 
import ProjectsView from "./projects/ProjectsView";

// A placeholder for other pages you might add
const ContactView = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold">Contact Me</h2>
    <p>This is a placeholder contact page.</p>
  </div>
);

// This component receives the entire data object from the editor
interface Template1ShellProps {
  data: {
    profile: { name: string; bio: string; email: string };
    projects: { title: string; description: string; link: string }[];
    // Add other data types here as you expand
  };
}

const Template1Shell: React.FC<Template1ShellProps> = ({ data }) => {
  // This state manages the "internal routing" of the template preview
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeView profile={data.profile} />;
      case "projects":
        return <ProjectsView projects={data.projects} />;
      case "contact":
        return <ContactView />;
      default:
        return <HomeView profile={data.profile} />;
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-gray-50 font-sans">
      <Navbar onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <footer className="bg-gray-900 text-white text-center py-4">
        © {new Date().getFullYear()} {data.profile.name || "Your Name"}
      </footer>
    </div>
  );
};

export default Template1Shell;