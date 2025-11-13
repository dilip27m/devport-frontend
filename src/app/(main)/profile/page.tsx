"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserInfo from "./UserInfo";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccount from "./DeleteAccount";

const ProfilePage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-neutral-50">
        <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-900" />
          <p className="text-sm font-medium text-neutral-700">Loading your account…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mb-2">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Account Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage your profile, security, and account preferences.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* left */}
          <div className="lg:col-span-2 space-y-6">
            <UserInfo user={user} />

            {/* (Optional) future sections go here, will match spacing */}
            {/* <YourSection /> */}
          </div>

          {/* right (password on top, delete below) */}
          <aside className="lg:col-span-1">
            <div className="flex flex-col gap-6">
              <ChangePasswordForm />
              <DeleteAccount />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;