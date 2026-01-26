"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { Plus, FolderOpen } from "lucide-react";
import PortfolioCard from "./PortfolioCard";

interface Portfolio {
    _id: string;
    title: string;
    template: string;
    lastUpdatedAt: string;
    isPublished: boolean;
}

import ConfirmBox from "@/components/ConfirmBox";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const PortfolioManager = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deployingId, setDeployingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null); // For confirmation
    const { user, token } = useAuth();
    const { showAlert } = useAlert();
    const router = useRouter();

    const fetchPortfolios = async () => {
        if (!user || !token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/portfolio`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch portfolios.");
            }

            const result = await response.json();
            if (result.success) {
                setPortfolios(result.data);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, [user, token]);

    const handleCreateNew = () => {
        router.push("/editor?createNew=true");
    };

    const handleDeploy = async (portfolioId: string) => {
        if (!token) return;

        setDeployingId(portfolioId);
        try {
            const response = await fetch(`${API_BASE_URL}/portfolio/${portfolioId}/publish`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Failed to deploy");

            // Refresh the list to show updated status
            await fetchPortfolios();
            showAlert("Portfolio published successfully!", "success");
        } catch (err: any) {
            showAlert(`Error: ${err.message}`, "error");
        } finally {
            setDeployingId(null);
        }
    };

    const confirmDelete = (portfolioId: string) => {
        setDeleteId(portfolioId);
    };

    const handleDelete = async () => {
        if (!token || !deleteId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/portfolio/${deleteId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Failed to delete");

            // Remove from local state
            setPortfolios(portfolios.filter((p) => p._id !== deleteId));
            showAlert("Portfolio deleted successfully!", "success");
        } catch (err: any) {
            showAlert(`Error: ${err.message}`, "error");
        } finally {
            setDeleteId(null);
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-400" />
                    <p className="text-sm text-gray-500">Loading your portfolios...</p>
                </div>
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

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-neutral-900">My Portfolios</h2>
                    <p className="text-sm text-neutral-500 mt-0.5">
                        {portfolios.length === 0
                            ? "Create your first portfolio to get started"
                            : `${portfolios.length} portfolio${portfolios.length > 1 ? "s" : ""}`}
                    </p>
                </div>

                <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <Plus size={18} />
                    Create New
                </button>
            </div>

            {/* Portfolio Grid */}
            {portfolios.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 bg-neutral-100 rounded-full mb-4">
                        <FolderOpen size={32} className="text-neutral-400" />
                    </div>
                    <p className="text-neutral-600 mb-4">No portfolios yet</p>
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-900 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        <Plus size={18} />
                        Create Your First Portfolio
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolios.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio._id}
                            portfolio={portfolio}
                            onDeploy={handleDeploy}
                            onDelete={confirmDelete}
                            isDeploying={deployingId === portfolio._id}
                        />
                    ))}
                </div>
            )}

            {/* Confirm Dialog */}
            {deleteId && (
                <ConfirmBox
                    message="Are you sure you want to delete this portfolio? This action cannot be undone."
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </div>
    );
};

export default PortfolioManager;
