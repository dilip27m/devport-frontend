import HomeView from "@/app/templates/template3/HomeView";
import type { AboutMeFormProps } from '@/app/(main)/editor/components/forms/AboutMe';

async function getPortfolioData() {
  
  return {
    aboutMe: {
      greeting: "Hey there! I'm",
      name: "Harish Konanki",
      role: "Full Stack Developer",
      bio: "A passionate developer with experience in building scalable and user-friendly web applications.",
      photo: "https://placehold.co/150x150", 
      resume: "/resume.pdf", 
      aboutMe: "This is the more detailed 'About Me' section where I can talk at length about my journey, my technical philosophy, and my long-term career goals. I am proficient in both front-end and back-end technologies, allowing me to build complete and robust solutions from the ground up."
    } as AboutMeFormProps['data'],
  };
}

export default async function HomePage() {
  const data = await getPortfolioData();
    return <HomeView aboutMe={data.aboutMe} />;
}