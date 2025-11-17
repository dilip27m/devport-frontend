import ProjectsView from "@/app/templates/template3/projects/ProjectsView";

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
  
  return <ProjectsView projects={data.projects} />;
}