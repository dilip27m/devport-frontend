"use client";

import React from "react";

// The component receives the profile data as a prop
interface HomePageUIProps {
  profile: {
    name: string;
    bio: string;
    email: string;
  };
}

const HomePageUI: React.FC<HomePageUIProps> = ({ profile }) => {
  return (
    <section id="about" className="p-6">
      <h1 className="text-5xl font-bold">{profile.name || "Your Name"}</h1>
      <p className="text-xl text-gray-700 mt-4">{profile.bio || "A short and engaging bio about you will appear here."}</p>
      <p className="text-md text-blue-600 mt-2">{profile.email || "your.email@example.com"}</p>
    </section>
  );
};

export default HomePageUI;