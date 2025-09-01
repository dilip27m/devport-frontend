"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserInfo from "./UserInfo"; // We will create this
import ChangePasswordForm from "./ChangePasswordForm"; // We will create this
import DeleteAccount from "./DeleteAccount"; // We will create this

const ProfilePage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // This is a simple protected route. If the user is not authenticated after loading, redirect them.
  if (!loading && !isAuthenticated) {
    router.push("/login");
    return null; // Render nothing while redirecting
  }

  // Show a loading state while the AuthContext is initializing
  if (loading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
        
        {/* Each section will be its own component */}
        <UserInfo user={user} />
        <ChangePasswordForm />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default ProfilePage;