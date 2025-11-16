"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the shape of our user and the context's value
interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  registerUser: (userData: any) => Promise<void>;
  loginUser: (userData: any) => Promise<void>;
  logoutUser: () => void;
  updatePassword: (passwordData: any) => Promise<string>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (resetData: any) => Promise<string>;
  deleteAccount: () => Promise<void>; // <-- NEW: Added to the interface
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(JSON.parse(storedToken));
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // --- REGISTER FUNCTION (Your version, unchanged) ---
  const registerUser = async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || "Failed to register"); }
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      router.push("/"); // Kept as per your original code
    } catch (error) { throw error; }
  };

  // --- LOGIN FUNCTION (Your version, unchanged) ---
  const loginUser = async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || "Failed to log in"); }
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      router.push("/"); // Kept as per your original code
    } catch (error) { throw error; }
  };

  // --- LOGOUT FUNCTION (Your version, unchanged) ---
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/"); // Kept as per your original code
  };

  // --- UPDATE PASSWORD FUNCTION (Your version, unchanged) ---
  const updatePassword = async (passwordData: any): Promise<string> => {
    if (!token) { throw new Error("You must be logged in to change your password."); }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwordData),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || "Failed to update password."); }
      return data.message;
    } catch (error) { throw error; }
  };

  // --- FORGOT PASSWORD FUNCTION (Your version, unchanged) ---
  const forgotPassword = async (email: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || "Failed to send reset email."); }
      return data.message;
    } catch (error) { throw error; }
  };
  
  // --- RESET PASSWORD FUNCTION (Your version, unchanged) ---
  const resetPassword = async (resetData: any): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }
      return data.message;
    } catch (error) {
      throw error;
    }
  };
  
  // --- NEW FUNCTION: DELETE ACCOUNT ---
  const deleteAccount = async (): Promise<void> => {
    if (!token) {
      throw new Error("You must be logged in to delete your account.");
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Send token to prove identity
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account.");
      }
      // On success, call your existing logoutUser function to clear state and redirect.
      logoutUser();
    } catch (error) {
      throw error;
    }
  };
  // ---------------------------------

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        updatePassword,
        forgotPassword,
        resetPassword,
        deleteAccount, // <-- NEW: Added to the provider value
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};