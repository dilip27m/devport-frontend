"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react"; // ← Lucide Icon

interface User {
  name: string;
  username: string;
  email: string;
}

const UserInfo = ({ user }: { user: User }) => {
  const [copied, setCopied] = useState(false);

  const portfolioUrl = `${window.location.origin}/p/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow">
          <span className="text-lg font-semibold">{user.name?.[0] || "U"}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">YOUR INFORMATION</h2>
        </div>
      </div>

      <div className="px-2 py-2">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-100 bg-white p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Name</dt>
            <dd className="mt-1 text-base text-neutral-900">{user.name}</dd>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-white p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Username</dt>
            <dd className="mt-1 text-base text-neutral-900">{user.username}</dd>
          </div>

          <div className="rounded-xl border border-neutral-100 bg-white p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Email</dt>
            <dd className="mt-1 text-base text-neutral-900 break-all">{user.email}</dd>
          </div>

          {/* Public Portfolio URL With Lucide Copy Icon */}
          <div className="rounded-xl border border-neutral-100 bg-white p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Public Portfolio URL
            </dt>

            <dd className="mt-1 text-base flex items-center gap-2">
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline-offset-2 hover:underline break-all"
              >
                {portfolioUrl}
              </a>

              <button
                onClick={handleCopy}
                className="p-1 rounded-md hover:bg-neutral-100 transition"
              >
                <Copy
                  size={18}
                  className={copied ? "text-green-600" : "text-neutral-700"}
                />
              </button>
            </dd>

            {/* Copied feedback text */}
            {copied && (
              <span className="text-xs text-green-600 mt-1 block">
                Copied!
              </span>
            )}
          </div>
        </dl>
      </div>
    </section>
  );
};

export default UserInfo;
