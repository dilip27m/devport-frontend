"use client";

import Link from "next/link";
import { FiEdit, FiLayers, FiCode, FiZap } from "react-icons/fi";

import { useAuth } from "@/context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex-1 bg-white text-gray-800 font-sans">
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center text-center bg-white px-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Build Your Developer Portfolio{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mt-2">
              In Minutes.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Showcase your projects with stunning, ready-to-use templates. No coding required. Just add your content and go live.
          </p>
          <div className="mt-8">
            {isAuthenticated ? (
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  Welcome back, <span className="font-bold">{user?.name}</span>!
                </p>
                <Link
                  href="/editor"
                  className="inline-block bg-black text-white font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-800 transition-transform duration-200 hover:scale-105"
                >
                  Go to Your Editor
                </Link>
              </div>
            ) : (
              <Link
                href="/register"
                className="inline-block bg-black text-white font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-800 transition-transform duration-200 hover:scale-105"
              >
                Get Started for Free
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            A Simple Three-Step Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <FiLayers size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Choose a Template</h3>
              <p className="text-gray-600">
                Select from a library of professionally designed templates built for developers.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FiEdit size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">2. Add Your Content</h3>
              <p className="text-gray-600">
                Use our simple editor to add your profile, projects, skills, and images.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FiZap size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3. Publish Your Site</h3>
              <p className="text-gray-600">
                Your portfolio goes live instantly at a shareable URL. No waiting for deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6">
              <FiCode size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Built for Developers</h3>
              <p className="text-gray-600">Templates designed to highlight your GitHub projects, technical skills, and experience.</p>
            </div>
            <div className="p-6">
              <FiEdit size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Live Real-Time Editor</h3>
              <p className="text-gray-600">See your changes instantly in the live preview as you type. No more guessing.</p>
            </div>
            <div className="p-6">
              <FiLayers size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Growing Template Library</h3>
              <p className="text-gray-600">More templates are added regularly, giving you fresh new looks for your portfolio.</p>
            </div>
            <div className="p-6">
              <FiZap size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Fast and Optimized</h3>
              <p className="text-gray-600">Your final portfolio is a fast, static-like site, perfect for performance and SEO.</p>
            </div>
          </div>
        </div>
      </section>

<section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {isAuthenticated ? "Ready to Continue?" : "Ready to Build Your Professional Presence?"}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {isAuthenticated ? "Jump back into the editor to perfect your portfolio." : "Join hundreds of developers who are showcasing their work with DevPort."}
          </p>
          
          {isAuthenticated ? (
            <Link
              href="/editor"
              className="inline-block bg-white text-black font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-200 transition-transform duration-200 hover:scale-105"
            >
              Go to Editor
            </Link>
          ) : (
            <Link
              href="/register"
              className="inline-block bg-white text-black font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-200 transition-transform duration-200 hover:scale-105"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;