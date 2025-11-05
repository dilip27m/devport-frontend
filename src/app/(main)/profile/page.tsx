"use client";

// 1. Import useEffect
import React, { useEffect } from "react"; 
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserInfo from "./UserInfo";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccount from "./DeleteAccount";

const ProfilePage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // --- THIS IS THE FIX ---
  // We move the redirect logic into a useEffect hook.
  useEffect(() => {
    // This code will now run *after* the component has rendered.
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]); // The effect re-runs if these values change
  // -----------------------

  // Show a loading state while the AuthContext is initializing or while redirecting
  if (loading || !isAuthenticated || !user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // This part will only be rendered if the user is authenticated
  return (
    <div className="flex-1 bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
        
        <UserInfo user={user} />
        <ChangePasswordForm />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default ProfilePage;