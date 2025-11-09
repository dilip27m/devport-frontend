import React from "react";
import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2shell"; // ← Enable this when ready

/** --- Template Map --- */
const templateMap: Record<string, React.ComponentType<{ data: any }>> = {
  template1: Template1Shell,
  template2: Template2Shell, // ← Add more templates easily here
};

/** --- API Base --- */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** --- Fetch Portfolio Data --- */
async function getPortfolioData(username: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/portfolio/${username}`, {
      cache: "no-cache",
    });
    if (!response.ok) return null;
    const result = await response.json();
    return result.portfolio;
  } catch (error) {
    console.error("Failed to fetch public portfolio:", error);
    return null;
  }
}

/** --- Public Portfolio Page --- */
export default async function PublicPortfolioPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const portfolio = await getPortfolioData(username);

  // If portfolio not found
  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl">Portfolio not found.</p>
        </div>
      </div>
    );
  }

  // Pick correct template dynamically
  const SelectedTemplate = templateMap[portfolio.template];

  // If invalid or missing template
  if (!SelectedTemplate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Error</h1>
          <p className="text-xl">
            The selected template "{portfolio.template}" is not available.
          </p>
        </div>
      </div>
    );
  }

  // Render selected template with portfolio data
  return <SelectedTemplate data={portfolio.data} />;
}
