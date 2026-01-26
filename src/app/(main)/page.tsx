"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Edit3,
  Zap,
  Layout,
  Globe,
  CheckCircle,
  ArrowRight,
  Send,
  FolderKanban,
  Palette,
  Eye,
  Share2,
  Sparkles,
  UserPlus,
  MousePointerClick,
  FileEdit,
  Rocket,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type SubmitStatus = "idle" | "success" | "error";

const LandingPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "devport120@gmail.com";

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <FolderKanban size={28} />,
      title: "Multiple Portfolios",
      description: "Create different portfolio versions for various job roles. Switch between your Frontend, Backend, or Full-Stack resumes instantly.",
    },
    {
      icon: <Palette size={28} />,
      title: "5+ Premium Templates",
      description: "Choose from professionally designed templates. Each template is crafted to highlight your skills and projects beautifully.",
    },
    {
      icon: <Eye size={28} />,
      title: "Live Real-Time Preview",
      description: "See your changes instantly as you type. No more guessing—what you see is exactly what your visitors will see.",
    },
    {
      icon: <Globe size={28} />,
      title: "One-Click Deploy",
      description: "Publish your portfolio with a single click. Get a shareable URL instantly—no hosting setup required.",
    },
    {
      icon: <Layout size={28} />,
      title: "Resizable Editor",
      description: "Adjust the editor panel to your preference. Drag to resize and customize your workspace like VS Code.",
    },
    {
      icon: <Share2 size={28} />,
      title: "Public Shareable Links",
      description: "Share your portfolio with recruiters using your unique username URL (devport.com/p/yourname).",
    },
  ];

  const userJourney = [
    {
      step: 1,
      icon: <UserPlus size={24} />,
      title: "Sign Up",
      description: "Create your free account in seconds",
      color: "from-blue-500 to-blue-600",
    },
    {
      step: 2,
      icon: <MousePointerClick size={24} />,
      title: "Pick a Template",
      description: "Choose a design you love",
      color: "from-purple-500 to-purple-600",
    },
    {
      step: 3,
      icon: <FileEdit size={24} />,
      title: "Add Your Info",
      description: "Fill in your skills & projects",
      color: "from-teal-500 to-teal-600",
    },
    {
      step: 4,
      icon: <Eye size={24} />,
      title: "Preview It",
      description: "See exactly how it looks",
      color: "from-orange-500 to-orange-600",
    },
    {
      step: 5,
      icon: <Rocket size={24} />,
      title: "Go Live!",
      description: "One click and you're online",
      color: "from-green-500 to-green-600",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message, _subject: `Contact from ${formData.name}`, _template: "table" }),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayName = user?.name?.trim() || "";

  return (
    <div className="flex-1 bg-white text-gray-900">
      {/* ================== HERO SECTION ================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Liquid Gradient Background */}
        <div className="absolute inset-0 liquid-gradient" />

        {/* Floating Water Bubbles */}
        <div className="water-bubble w-32 h-32 top-20 right-[10%] opacity-60" style={{ animationDelay: '0s' }} />
        <div className="water-bubble w-48 h-48 top-40 right-[25%] opacity-40" style={{ animationDelay: '2s' }} />
        <div className="water-bubble w-24 h-24 bottom-32 left-[15%] opacity-50" style={{ animationDelay: '1s' }} />
        <div className="water-bubble w-40 h-40 bottom-20 left-[30%] opacity-30" style={{ animationDelay: '3s' }} />
        <div className="water-bubble w-20 h-20 top-32 left-[20%] opacity-70" style={{ animationDelay: '4s' }} />
        <div className="water-bubble w-36 h-36 bottom-40 right-[20%] opacity-35" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="frosted-badge inline-flex items-center gap-2 px-5 py-2.5 mb-8">
            <Sparkles size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Now with Multi-Portfolio Support</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Build Your Developer
            <span className="block mt-2 gradient-text">Portfolio in Minutes</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Create stunning, professional portfolios with our intuitive editor.
            Choose templates, add your projects, and go live instantly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                {displayName && <p className="text-gray-600 mb-2 sm:hidden">Welcome back, <span className="font-semibold">{displayName}</span>!</p>}
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-lg rounded-xl px-8 py-4 hover:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  Go to Editor
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold text-lg rounded-xl px-8 py-4 border-2 border-gray-200 hover:border-gray-900 transition-all duration-200"
                >
                  View Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-lg rounded-xl px-8 py-4 hover:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold text-lg rounded-xl px-8 py-4 border-2 border-gray-200 hover:border-gray-900 transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================== USER JOURNEY ================== */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From signup to live portfolio — it's this simple!
            </p>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full" />

              <div className="grid grid-cols-5 gap-4">
                {userJourney.map((item, idx) => (
                  <div key={idx} className="relative flex flex-col items-center text-center">
                    {/* Step Circle - Glossy Bubble */}
                    <div className={`journey-bubble relative z-10 w-20 h-20 flex items-center justify-center mb-4`}>
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                        {item.icon}
                      </div>
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 frosted-badge w-7 h-7 !rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">{item.step}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full" />

              <div className="space-y-8">
                {userJourney.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-6 pl-4">
                    {/* Step Circle */}
                    <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {item.step}
                        </span>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simple Summary */}
          <div className="mt-16 text-center">
            <div className="frosted-badge inline-flex items-center gap-2 px-6 py-3">
              <CheckCircle size={20} className="text-green-500" />
              <span className="font-medium text-gray-700">No coding required • Free forever • Takes 5 minutes</span>
            </div>
          </div>
        </div>
      </section >

      {/* ================== FEATURES ================== */}
      < section className="py-24 relative overflow-hidden" >
        {/* Subtle gradient background */}
        < div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build a portfolio that gets you noticed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="glass-card p-6 group">
                <div className="glossy-icon w-12 h-12 flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* ================== CONTACT ================== */}
      < section className="py-24 bg-white" >
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600">Have questions or feedback? We'd love to hear from you.</p>
          </div>

          <div className="card-elevated p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                  placeholder="Your message..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl">
                  <CheckCircle size={20} />
                  Message sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  Please fill all fields and try again.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold rounded-xl px-6 py-4 hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={20} /> Send Message</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section >

      {/* ================== FINAL CTA ================== */}
      < section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden" >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {isAuthenticated ? "Ready to Continue Building?" : "Ready to Stand Out?"}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isAuthenticated
              ? "Jump back into your editor and perfect your portfolio."
              : "Join developers who are showcasing their work with DevPort."}
          </p>
          <Link
            href={isAuthenticated ? "/editor" : "/register"}
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg rounded-xl px-10 py-5 hover:bg-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            {isAuthenticated ? "Open Editor" : "Get Started Free"}
            <ArrowRight size={22} />
          </Link>
        </div>
      </section >
    </div >
  );
};

export default LandingPage;
