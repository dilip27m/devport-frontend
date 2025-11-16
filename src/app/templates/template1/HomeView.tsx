"use client";

import React from 'react';
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';

interface HomeViewProps {
  aboutMe: AboutMeFormProps['data'];
}

const HomeView: React.FC<HomeViewProps> = ({ aboutMe }) => {
  if (!aboutMe) {
    return <section className="p-8 md:p-12 text-center text-gray-500">Loading...</section>;
  }

  return (
    <section className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-shrink-0">
          <img src={aboutMe?.photo || 'https://i.ibb.co/3kC2C2S/placeholder.png'} alt={aboutMe?.name || 'Profile'}
            className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-lg" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-xl text-gray-600">{aboutMe?.greeting || "Hey there! I'm"}</p>
          <h1 className="text-6xl font-bold text-gray-900 my-2 break-words">{aboutMe?.name || "Your Name"}</h1>
          <h2 className="text-2xl font-medium text-blue-600">{aboutMe?.role || "Your Role"}</h2>
          {/* --- FIX: Added break-words --- */}
          <p className="text-gray-700 mt-4 max-w-xl break-words">{aboutMe?.bio || "A short and engaging bio will appear here."}</p>
        </div>
      </div>
      <hr className="my-12" />
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">About Me</h3>
        {/* --- FIX: Added break-words --- */}
        <p className="text-lg text-gray-600 whitespace-pre-wrap break-words">
          {aboutMe?.aboutMe || "The detailed 'About Me' section will be displayed here."}
        </p>
      </div>
      {aboutMe?.resume && aboutMe.resume !== 'uploading...' && (
        <div className="mt-12 text-center">
          <a href={aboutMe.resume} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition">
            View My Résumé
          </a>
        </div>
      )}
    </section>
  );
};
export default HomeView;