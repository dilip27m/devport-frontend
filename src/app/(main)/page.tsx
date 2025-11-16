"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiEdit, FiLayers, FiCode, FiZap, FiGithub, FiLinkedin } from "react-icons/fi";

import { useAuth } from "@/context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const team = [
    {
      name: "M Dilip Kumar Reddy",
      role: "Developer",
      image: "/team/dilip.jpg", // update with real path
      github: "#",
      linkedin: "#",
      bio: "Frontend-focused dev who loves clean UI, smooth UX, and pixel-perfect details.",
    },
    {
      name: "B Krishna Subhash",
      role: "Developer",
      image: "/images/profile.jpeg",
      github: "#",
      linkedin: "#",
      bio: "Full-stack dev working with React, Next.js, and scalable systems. Always shipping.",
    },
    {
      name: "B Chakradhar",
      role: "Developer",
      image: "/team/chakri.jpg",
      github: "#",
      linkedin: "#",
      bio: "Backend enthusiast, APIs, databases, and performance optimization are his playground.",
    },
    {
      name: "K Harish",
      role: "Developer",
      image: "/team/harish.jpg",
      github: "#",
      linkedin: "#",
      bio: "Problem-solver who enjoys building efficient logic and robust systems.",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -8; // invert for natural feel
    const rotateY = ((x - midX) / midX) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = "0 20px 45px rgba(15,23,42,0.35)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    card.style.boxShadow = "";
  };

  return (
    <div className="flex-1 bg-white text-gray-800 font-sans">
      {/* HERO */}
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

      {/* 3-STEP PROCESS */}
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

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6">
              <FiCode size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Built for Developers</h3>
              <p className="text-gray-600">
                Templates designed to highlight your GitHub projects, technical skills, and experience.
              </p>
            </div>
            <div className="p-6">
              <FiEdit size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Live Real-Time Editor</h3>
              <p className="text-gray-600">
                See your changes instantly in the live preview as you type. No more guessing.
              </p>
            </div>
            <div className="p-6">
              <FiLayers size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Growing Template Library</h3>
              <p className="text-gray-600">
                More templates are added regularly, giving you fresh new looks for your portfolio.
              </p>
            </div>
            <div className="p-6">
              <FiZap size={32} className="text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Fast and Optimized</h3>
              <p className="text-gray-600">
                Your final portfolio is a fast, static-like site, perfect for performance and SEO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            The minds behind DevPort building tools that help developers launch a professional portfolio in minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`relative w-full h-80 [perspective:1200px] group transition-all duration-500 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: mounted ? `${index * 120}ms` : "0ms" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 p-[1px] rounded-2xl 
                      [backface-visibility:hidden] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                  >
                    <div className="bg-white rounded-2xl p-6 flex flex-col items-center h-full">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-200"
                      />
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{member.role}</p>

                      <div className="flex items-center gap-4 mt-4">
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <FiGithub size={20} />
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <FiLinkedin size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-white p-6 flex flex-col justify-center items-center text-center 
                      [transform:rotateY(180deg)] [backface-visibility:hidden] border shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {isAuthenticated ? "Ready to Continue?" : "Ready to Build Your Professional Presence?"}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {isAuthenticated
              ? "Jump back into the editor to perfect your portfolio."
              : "Join hundreds of developers who are showcasing their work with DevPort."}
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