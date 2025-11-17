"use client";

import React from "react";
import HomeView from "@/app/templates/template3/HomeView";
import EducationView from "@/app/templates/template3/Education/EducationView";
import SkillsView from "@/app/templates/template3/SkillsView";
import ExperienceView from "@/app/templates/template3/ExperienceView";
import AchievementsView from "@/app/templates/template3/AchievementsView";
import SocialsView from "@/app/templates/template1/SocialsView";

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