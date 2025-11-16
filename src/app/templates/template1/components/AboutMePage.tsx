"use client";

import React from "react";
import HomeView from "../HomeView";
import EducationView from "../Education/EducationView";
import SkillsView from "../SkillsView";
import ExperienceView from "../ExperienceView";
import AchievementsView from "../AchievementsView";
import SocialsView from "../SocialsView";

interface AboutMePageProps {
  aboutMe: any;
  education: any;
  skills: any;
  experiences: any;
  achievements: any;
  socials: any;
}

const AboutMePage = ({
  aboutMe,
  education,
  skills,
  experiences,
  achievements,
  socials,
}: AboutMePageProps) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <HomeView aboutMe={aboutMe} />

      <div className="max-w-6xl mx-auto px-4 space-y-24 no-scrollbar">
        <EducationView education={education} />
        <SkillsView skills={skills} />
        <ExperienceView experiences={experiences} />
        <AchievementsView achievements={achievements} />
        <SocialsView data={socials} />
      </div>
    </div>
  );
};

export default AboutMePage;
