"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// We will dynamically import the templates just like on the public page
import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2shell";
import Template3Shell from "@/app/templates/template3/Template3Shell";

const templateMap: { [key: string]: React.ComponentType<{ data: any }> } = {
  template1: Template1Shell,
  template2: Template2Shell,
  template3: Template3Shell,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// A simplified type for the data we expect
interface Portfolio {
  template: string;
  data: any;
}

const PreviewPage = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Protect the route: If auth is done loading and user is not authenticated, redirect
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    // 2. Fetch the portfolio data once we know the user is logged in
    const fetchPortfolioData = async () => {
      if (!user || !token) return;

      try {
        // We use the EXISTING protected endpoint to get the user's own data
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data for preview.");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setPortfolio(result.data);
        }
      } catch (error) {
        console.error("Preview fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && isAuthenticated) {
        fetchPortfolioData();
    }
  }, [authLoading, isAuthenticated, user, token, router]);

  // 3. Render the correct state (loading, no data, or the template)
  if (authLoading || loading) {
    return <div className="flex h-screen items-center justify-center"><p>Loading Preview...</p></div>;
  }

  if (!portfolio) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold">No Portfolio Data Found</h1>
          <p>Go to the editor and save your portfolio to see a preview.</p>
        </div>
      </div>
    );
  }

  const SelectedTemplate = templateMap[portfolio.template];

  if (!SelectedTemplate) {
    return <div className="flex h-screen items-center justify-center"><p>Error: Template "{portfolio.template}" not found.</p></div>;
  }

  return <SelectedTemplate data={portfolio.data} />;
};

export default PreviewPage;