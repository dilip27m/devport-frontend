import ProjectsView from "./ProjectsView";

// This function simulates fetching the final data for deployment.
async function getPortfolioData() {
  return {
    projects: [
      { title: "Deployed Project 1", description: "This is a description for a project on the live site.", link: "#" },
      { title: "Deployed Project 2", description: "The data for this comes from a build-time process.", link: "#" },
    ],
  };
}

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  
  // Renders the reusable UI component with the final data
  return <ProjectsView projects={data.projects} />;
}