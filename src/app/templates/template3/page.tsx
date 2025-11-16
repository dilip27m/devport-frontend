import HomeView from "./HomeView";
// It's good practice to import the types to ensure data consistency
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';

// This function simulates fetching the final data for deployment.
async function getPortfolioData() {
  
  // --- THIS IS THE UPDATED DATA ---
  // The function now returns an `aboutMe` object with all the new fields,
  // populated with sample data.
  return {
    aboutMe: {
      greeting: "Hey there! I'm",
      name: "Harish Konanki",
      role: "Full Stack Developer",
      bio: "A passionate developer with experience in building scalable and user-friendly web applications.",
      photo: "https://placehold.co/150x150", // Using a placeholder for the photo URL
      resume: "/resume.pdf", // Placeholder link to a resume file
      aboutMe: "This is the more detailed 'About Me' section where I can talk at length about my journey, my technical philosophy, and my long-term career goals. I am proficient in both front-end and back-end technologies, allowing me to build complete and robust solutions from the ground up."
    } as AboutMeFormProps['data'],
    // You can add other data sections like projects, education etc. here as needed
  };
  // -----------------------------
}

export default async function HomePage() {
  const data = await getPortfolioData();
  
  // --- This component now receives the 'aboutMe' prop instead of 'profile' ---
  return <HomeView aboutMe={data.aboutMe} />;
  // --------------------------------------------------------------------
}