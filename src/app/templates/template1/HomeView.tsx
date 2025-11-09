"use client";

import React from 'react';
// Import the type for the props this component will receive
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';

// The props interface is now updated to expect `aboutMe` data
interface HomeViewProps {
  aboutMe: AboutMeFormProps['data'];
}

const HomeView: React.FC<HomeViewProps> = ({ aboutMe }) => {
  return (
    <section className="p-8 md:p-12">
      {/* --- Main Intro Section --- */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <img
            src={aboutMe.photo || 'https://via.placeholder.com/150'} // Fallback placeholder
            alt={aboutMe.name || 'Profile Photo'}
            className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-lg"
          />
        </div>

        {/* Greeting, Name, Role, and Bio */}
        <div className="text-center md:text-left">
          <p className="text-xl text-gray-600">{aboutMe.greeting || "Hey there! I'm"}</p>
          <h1 className="text-6xl font-bold text-gray-900 my-2">{aboutMe.name || "Your Name"}</h1>
          <h2 className="text-2xl font-medium text-blue-600">{aboutMe.role || "Your Role"}</h2>
          <p className="text-gray-700 mt-4 max-w-xl">{aboutMe.bio || "A short and engaging bio will appear here."}</p>
        </div>

      </div>

      <hr className="my-12" />

      {/* --- Detailed About Me Section --- */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">About Me</h3>
        <p className="text-lg text-gray-600 whitespace-pre-wrap">
          {aboutMe.aboutMe || "The detailed 'About Me' section will be displayed here."}
        </p>
      </div>

      {/* --- Resume Download Button --- */}
      {aboutMe.resume && (
        <div className="mt-12 text-center">
          <a
            href={aboutMe.resume} // This assumes the resume is a URL. You'll need to handle file serving.
            download
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
          >
            Download My Résumé
          </a>
        </div>
      )}
    </section>
  );
};

export default HomeView;