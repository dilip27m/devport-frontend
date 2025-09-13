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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Checks for token on initial load
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(JSON.parse(storedToken));
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // --- 1. REGISTER FUNCTION ---
  const registerUser = async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // On success, update state and localStorage
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));

      // Redirect to the editor
      router.push("/editor");

    } catch (error) {
      // Re-throw the error to be caught by the UI component
      throw error;
    }
  };

  // --- 2. LOGIN FUNCTION ---
  const loginUser = async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to log in");
      }

      // On success, update state and localStorage
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      
      // Redirect to the editor
      router.push("/editor");

    } catch (error) {
      // Re-throw the error to be caught by the UI component
      throw error;
    }
  };

  // --- 3. LOGOUT FUNCTION ---
  const logoutUser = () => {
    // Clear state
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Redirect to the login page
    router.push("/login");
  };

  const updatePassword = async (passwordData: any): Promise<string> => {
    if (!token) {
      throw new Error("You must be logged in to change your password.");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the user's token for authentication
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server sends an error (e.g., "Incorrect current password"), throw it
        throw new Error(data.error || "Failed to update password.");
      }

      // On success, return the success message from the server
      return data.message;

    } catch (error) {
      // Re-throw the error to be caught by the UI component
      throw error;
    }
  };


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
        updatePassword, // <-- Add the new function to the context's value
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