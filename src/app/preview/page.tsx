"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

// We will dynamically import the templates just like on the public page
import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2Shell";
import Template3Shell from "@/app/templates/template3/Template3Shell";
import Template4Shell from "@/app/templates/template4/Template4Shell";
import Template5Shell from "@/app/templates/template5/Template5Shell";

const templateMap: { [key: string]: React.ComponentType<{ data: any }> } = {
  template1: Template1Shell,
  template2: Template2Shell,
  template3: Template3Shell,
  template4: Template4Shell,
  template5: Template5Shell,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// A simplified type for the data we expect
interface Portfolio {
  template: string;
  data: any;
}

const PreviewContent = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get("portfolioId");

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
        let url: string;

        if (portfolioId) {
          // Fetch specific portfolio by ID
          url = `${API_BASE_URL}/portfolio/${portfolioId}`;
        } else {
          // Fetch all portfolios and show the first one (or published one)
          url = `${API_BASE_URL}/portfolio`;
        }

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data for preview.");
        }

        const result = await response.json();

        if (result.success && result.data) {
          if (portfolioId) {
            // Single portfolio response
            setPortfolio(result.data);
          } else {
            // Array of portfolios - get the first published one, or just the first one
            const portfolios = result.data;
            if (portfolios.length > 0) {
              const publishedPortfolio = portfolios.find((p: any) => p.isPublished);
              const targetPortfolioId = publishedPortfolio?._id || portfolios[0]._id;

              // Fetch the full portfolio data
              const fullResponse = await fetch(`${API_BASE_URL}/portfolio/${targetPortfolioId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (fullResponse.ok) {
                const fullResult = await fullResponse.json();
                if (fullResult.success && fullResult.data) {
                  setPortfolio(fullResult.data);
                }
              }
            } else {
              setError("No portfolios found. Create one in the editor first.");
            }
          }
        }
      } catch (err) {
        console.error("Preview fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch portfolio");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && isAuthenticated) {
      fetchPortfolioData();
    }
  }, [authLoading, isAuthenticated, user, token, router, portfolioId]);

  // 3. Render the correct state (loading, error, no data, or the template)
  if (authLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading Preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-white mb-2">Error Loading Preview</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => router.push("/profile")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-white mb-2">No Portfolio Data Found</h1>
          <p className="text-gray-400 mb-4">Go to the editor and save your portfolio to see a preview.</p>
          <button
            onClick={() => router.push("/editor")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Create Portfolio
          </button>
        </div>
      </div>
    );
  }

  const SelectedTemplate = templateMap[portfolio.template];

  if (!SelectedTemplate) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white">Error: Template "{portfolio.template}" not found.</p>
      </div>
    );
  }

  return <SelectedTemplate data={portfolio.data} />;
};

const PreviewPage = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
};

export default PreviewPage;