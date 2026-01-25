"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Layers, CheckCircle, Clock, Edit3, Globe, Trash2, FileText } from "lucide-react";

interface PortfolioCardProps {
    portfolio: {
        _id: string;
        title: string;
        template: string;
        lastUpdatedAt: string;
        isPublished: boolean;
    };
    onDeploy: (portfolioId: string) => void;
    onDelete: (portfolioId: string) => void;
    isDeploying: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
    portfolio,
    onDeploy,
    onDelete,
    isDeploying,
}) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/editor?portfolioId=${portfolio._id}`);
    };

    const handleDeploy = () => {
        onDeploy(portfolio._id);
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${portfolio.title}"?`)) {
            onDelete(portfolio._id);
        }
    };

    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Header with Title & Status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                        <FileText size={20} className="text-neutral-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-900 text-lg">{portfolio.title}</h3>
                        <p className="text-sm text-neutral-500 flex items-center gap-1.5 mt-0.5">
                            <Layers size={14} />
                            <span className="capitalize">{portfolio.template}</span>
                        </p>
                    </div>
                </div>

                {/* Status Badge */}
                {portfolio.isPublished ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600 border border-green-200">
                        <CheckCircle size={14} />
                        Live
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-500 border border-neutral-200">
                        Draft
                    </span>
                )}
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                <Clock size={14} />
                <span>Last updated: {new Date(portfolio.lastUpdatedAt).toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-neutral-100">
                <button
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                >
                    <Edit3 size={16} />
                    Edit
                </button>

                {!portfolio.isPublished && (
                    <button
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Globe size={16} />
                        {isDeploying ? "Deploying..." : "Deploy"}
                    </button>
                )}

                <button
                    onClick={handleDelete}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    title="Delete portfolio"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PortfolioCard;
