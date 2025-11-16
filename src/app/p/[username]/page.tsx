import React from "react";
// 1. Import the 'notFound' function from Next.js
import { notFound } from "next/navigation";
import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2shell"; 
import Template3Shell from "@/app/templates/template3/Template3Shell";


const templateMap: Record<string, React.ComponentType<{ data: any }>> = {
  template1: Template1Shell,
  template2: Template2Shell, 
  template3: Template3Shell,
};

// Your environment variable setup is correct
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Your data fetching function is correct and unchanged
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

// Your page component function signature is correct and unchanged
export default async function PublicPortfolioPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const portfolio = await getPortfolioData(username);

  // --- THIS IS THE UPDATED LOGIC ---
  // Instead of returning a custom div, we call notFound()
  // This tells Next.js to render your global not-found.tsx file
  if (!portfolio) {
    notFound();
  }
  // --------------------------------

  const SelectedTemplate = templateMap[portfolio.template];

  // --- THIS IS ALSO UPDATED for consistency ---
  if (!SelectedTemplate) {
    // If the template name from the database is invalid,
    // we should also show the proper 404 page.
    notFound();
  }
  // -------------------------------------------

  // This return statement is correct and unchanged
  return <SelectedTemplate data={portfolio.data} />;
}