"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
// 1. Import all the icons we need for the new sections
import { Layers, CheckCircle, XCircle, Clock, GraduationCap, Code, Briefcase, Award, Rss } from "lucide-react";

// 2. Update the interface to match your full data structure
interface Portfolio {
  template: string;
  isPublished: boolean;
  lastUpdatedAt: string;
  data: {
    projects?: any[];
    education?: any[];
    skills?: any[];
    experience?: any[];
    achievements?: any[];
    blogs?: any[];
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const PortfolioSummary = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!user || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 404) {
          setPortfolio(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data.");
        }

        const result = await response.json();
        if (result.success) {
          setPortfolio(result.data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [user, token]);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm text-center">
        <p className="text-sm text-gray-500">Loading portfolio summary...</p>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm text-center">
        <p className="text-sm text-gray-500">You haven't saved any portfolio data yet.</p>
        <Link href="/editor" className="text-sm text-blue-500 hover:underline font-semibold mt-2 inline-block">
          Go to Editor to get started
        </Link>
      </div>
    );
  }

  // --- THIS IS THE UPDATED JSX ---
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Portfolio Summary</h2>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Layers size={16} /> Template
          </span>
          <span className="font-semibold text-neutral-900 capitalize">{portfolio.template}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <CheckCircle size={16} /> Status
          </span>
          {portfolio.isPublished ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
              <CheckCircle size={14} /> Public
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 font-semibold text-yellow-600">
              <XCircle size={14} /> Private
            </span>
          )}
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Briefcase size={16} /> Projects
          </span>
          <span className="font-semibold text-neutral-900">{portfolio.data.projects?.length || 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <GraduationCap size={16} /> Education
          </span>
          <span className="font-semibold text-neutral-900">{portfolio.data.education?.length || 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Code size={16} /> Skills
          </span>
          <span className="font-semibold text-neutral-900">{portfolio.data.skills?.length || 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Briefcase size={16} /> Experience
          </span>
          <span className="font-semibold text-neutral-900">{portfolio.data.experience?.length || 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Award size={16} /> Achievements
          </span>
          <span className="font-semibold text-neutral-900">{portfolio.data.achievements?.length || 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Rss size={16} /> Blogs
          </span>
          <span className="font-semibold text-neutral-900">{portfolio.data.blogs?.length || 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-neutral-600">
            <Clock size={16} /> Last Saved
          </span>
          <span className="font-semibold text-neutral-900">
            {new Date(portfolio.lastUpdatedAt).toLocaleString()}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PortfolioSummary;