import React from "react";
import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2shell"; // Note: Corrected capitalization from your original

// --- THIS IS THE CHANGE ---
import Template3Shell from "@/app/templates/template3/Template3Shell";
// --------------------------

/** --- Template Map --- */
const templateMap: Record<string, React.ComponentType<{ data: any }>> = {
  template1: Template1Shell,
  template2: Template2Shell,
  template3: Template3Shell, // <-- ADDED
};

/** --- API Base --- */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** --- Fetch Portfolio Data --- */
async function getPortfolioData(username: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/portfolio/${username}`, {
      cache: "no-store", // Use 'no-store' for Next.js 13+ App Router for non-caching
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

  if (!portfolio) {
    const { notFound } = await import('next/navigation');
    return notFound(); // Standard way to 404 in App Router
  }

  const SelectedTemplate = templateMap[portfolio.template];

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
  
  return <SelectedTemplate data={portfolio.data} />;
}