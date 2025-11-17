"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  deleteAccount: () => Promise<void>; 
  sendOtp: (email: string) => Promise<string>;
  verifyOtp: (email: string, otp: string) => Promise<string>;
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
      router.push("/"); 
    } catch (error) { throw error; }
  };

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
      router.push("/"); 
    } catch (error) { throw error; }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/"); 
  };

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
  
  const deleteAccount = async (): Promise<void> => {
    if (!token) {
      throw new Error("You must be logged in to delete your account.");
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account.");
      }
      logoutUser();
    } catch (error) {
      throw error;
    }
  };

  const sendOtp = async (email: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to send OTP");

    return data.message; 
  } catch (err) {
    throw err;
  }
};


const verifyOtp = async (email: string, otp: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Invalid OTP");

    return data.message; 
  } catch (err) {
    throw err;
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
       updatePassword,
       forgotPassword,
       resetPassword,
       deleteAccount,
       sendOtp,        
       verifyOtp,      
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