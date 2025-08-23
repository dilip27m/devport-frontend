import HomeView from "./HomeView";

// This function simulates fetching the final data for deployment.
// In a real app, it would get data from your DB based on a user ID.
async function getPortfolioData() {
  return {
    profile: {
      name: "Dilip Kumar",
      bio: "This is the final, deployed portfolio. The data is static and loaded during the build process.",
      email: "hello@example.com",
    },
  };
}

export default async function HomePage() {
  const data = await getPortfolioData();
  
  // Renders the reusable UI component with the final data
  return <HomeView profile={data.profile} />;
}