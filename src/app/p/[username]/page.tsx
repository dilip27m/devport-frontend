import React from "react";
import { notFound } from "next/navigation";
import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2Shell";
import Template3Shell from "@/app/templates/template3/Template3Shell";

const templateMap: Record<string, React.ComponentType<{ data: any }>> = {
  template1: Template1Shell,
  template2: Template2Shell,
  template3: Template3Shell
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

// Updated for Next.js 15 - params is now a Promise
export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Await the params Promise before using
  const { username } = await params;
  
  const portfolio = await getPortfolioData(username);

  if (!portfolio) {
    notFound();
  }

  const SelectedTemplate = templateMap[portfolio.template];

  if (!SelectedTemplate) {
    notFound();
  }

  return <SelectedTemplate data={portfolio.data} />;
}

// If you have generateMetadata, update it like this too:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  const portfolio = await getPortfolioData(username);
  
  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    };
  }
  
  return {
    title: `${username}'s Portfolio`,
    description: portfolio.data?.about?.bio || `Check out ${username}'s portfolio`,
  };
}