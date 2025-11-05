"use client";

import React from "react";

interface HomeViewProps {
  profile: {
    name: string;
    bio: string;
    email: string;
  };
}

// --- AFTER ---

const HomeView: React.FC<HomeViewProps> = ({ profile }) => {
  return (
    <section id="about" className="p-6">
      <h1 className="text-5xl font-bold">{profile.name || "Your Name"}</h1>
      {/* Add the `break-words` class here */}
      <p className="text-xl text-gray-700 mt-4 break-words">
        {profile.bio || "A short and engaging bio about you will appear here."}
      </p>
      <p className="text-md text-blue-600 mt-2">{profile.email || "your.email@example.com"}</p>
    </section>
  );
};


export default HomeView;