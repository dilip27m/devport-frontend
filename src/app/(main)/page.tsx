"use client";

import React, { useState, useEffect } from "react";

type SubmitStatus = "idle" | "success" | "error";

const LandingPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated] = useState(true);
  const [user] = useState({ name: "harish koanki" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use public env variable (must start with NEXT_PUBLIC to be available in client)
  // Fallback to devport120@gmail.com if not set
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "devport120@gmail.com";

  const team = [
    {
      name: "M Dilip Kumar Reddy",
      role: "Developer",
      image: "/images/dilip.jpeg",
      github: "https://github.com/dilip27m",
      linkedin: "https://www.linkedin.com/in/mdilipkumarreddy/",
      bio: "Frontend-focused dev who loves clean UI, smooth UX, and pixel-perfect details.",
    },
    {
      name: "B Krishna Subhash",
      role: "Developer",
      image: "/images/subhash.jpeg",
      github: "https://github.com/subhash865",
      linkedin: "https://www.linkedin.com/in/bkrishnasubhash/",
      bio: "Full-stack dev working with React, Next.js, and scalable systems. Always shipping.",
    },
    {
      name: "B Chakradhar",
      role: "Developer",
      image: "/images/chakri.jpeg",
      github: "https://github.com/chakri1184",
      linkedin: "https://www.linkedin.com/in/b-chakradhar-bb839531b/",
      bio: "Backend enthusiast, APIs, databases, and performance optimization are his playground.",
    },
    {
      name: "K Harish",
      role: "Developer",
      image: "/images/harish.jpeg",
      github: "https://github.com/Harishkonanki45",
      linkedin: "https://www.linkedin.com/in/harish-konanki-02181b290/",
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

    const rotateX = ((y - midY) / midY) * -8;
    const rotateY = ((x - midX) / midX) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = "0 20px 45px rgba(15,23,42,0.35)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    card.style.boxShadow = "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Basic required-field validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // formsubmit.co expects the recipient email in the URL path
      const url = `https://formsubmit.co/ajax/${encodeURIComponent(
        contactEmail
      )}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`,
          _template: "table",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // reset message after a short while
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
            Showcase your projects with stunning, ready-to-use templates. No
            coding required. Just add your content and go live.
          </p>
          <div className="mt-8">
            {isAuthenticated ? (
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  Welcome back, <span className="font-bold">{user?.name}</span>!
                </p>
                <button className="inline-block bg-black text-white font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-800 transition-transform duration-200 hover:scale-105">
                  Go to Your Editor
                </button>
              </div>
            ) : (
              <button className="inline-block bg-black text-white font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-800 transition-transform duration-200 hover:scale-105">
                Get Started for Free
              </button>
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
              <svg
                className="w-12 h-12 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">1. Choose a Template</h3>
              <p className="text-gray-600">
                Select from a library of professionally designed templates built
                for developers.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">2. Add Your Content</h3>
              <p className="text-gray-600">
                Use our simple editor to add your profile, projects, skills, and
                images.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">3. Publish Your Site</h3>
              <p className="text-gray-600">
                Your portfolio goes live instantly at a shareable URL. No
                waiting for deployments.
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
              <svg
                className="w-8 h-8 text-blue-500 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Built for Developers</h3>
              <p className="text-gray-600">
                Templates designed to highlight your GitHub projects, technical
                skills, and experience.
              </p>
            </div>
            <div className="p-6">
              <svg
                className="w-8 h-8 text-blue-500 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Live Real-Time Editor</h3>
              <p className="text-gray-600">
                See your changes instantly in the live preview as you type. No
                more guessing.
              </p>
            </div>
            <div className="p-6">
              <svg
                className="w-8 h-8 text-blue-500 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Growing Template Library</h3>
              <p className="text-gray-600">
                More templates are added regularly, giving you fresh new looks
                for your portfolio.
              </p>
            </div>
            <div className="p-6">
              <svg
                className="w-8 h-8 text-blue-500 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Fast and Optimized</h3>
              <p className="text-gray-600">
                Your final portfolio is a fast, static-like site, perfect for
                performance and SEO.
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
            The minds behind DevPort building tools that help developers launch
            a professional portfolio in minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`relative w-full h-80 [perspective:1200px] group transition-all duration-500 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: mounted ? `${index * 120}ms` : "0ms",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 p-[1px] rounded-2xl [backface-visibility:hidden] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                    <div className="bg-white rounded-2xl p-6 flex flex-col items-center h-full">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-200"
                      />
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{member.role}</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-white p-6 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] border shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{member.bio}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Contact email : <span className="font-medium">{contactEmail}</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Your Name
                  </div>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Your Email
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message
                  </div>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold text-lg rounded-full px-8 py-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {isAuthenticated
              ? "Ready to Continue?"
              : "Ready to Build Your Professional Presence?"}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {isAuthenticated
              ? "Jump back into the editor to perfect your portfolio."
              : "Join hundreds of developers who are showcasing their work with DevPort."}
          </p>

          {isAuthenticated ? (
            <button className="inline-block bg-white text-black font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-200 transition-transform duration-200 hover:scale-105">
              Go to Editor
            </button>
          ) : (
            <button className="inline-block bg-white text-black font-bold text-lg rounded-full px-8 py-4 hover:bg-gray-200 transition-transform duration-200 hover:scale-105">
              Sign Up Now
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
