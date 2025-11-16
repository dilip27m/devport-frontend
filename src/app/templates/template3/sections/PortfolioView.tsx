"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import type { PortfolioData } from '@/app/(main)/editor/page';
import { format } from "date-fns";

// Helper to check for valid URLs/data URIs.
const isUrlLike = (s?: string) => !!s && /^(https?:\/\/|data:)/i.test(s);

// Map social media keys from your form to their respective icon components.
const socialIcons: { [key: string]: React.ReactNode } = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  email: <Mail size={20} />,
};

// Reusable Section component for consistent styling of subsections.
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 border-t border-gray-900">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{title}</h2>
    <div className="text-gray-400">{children}</div>
  </section>
);

// This is the contact form component, styled to match your dark theme.
const ContactForm = ({ portfolioOwnerEmail }: { portfolioOwnerEmail?: string }) => {
  const [formData, setFormData] = useState({ senderEmail: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    console.log("Submitting form to portfolio owner:", portfolioOwnerEmail);
    console.log("Form data:", formData);
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ senderEmail: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000); // Reset button text after 3 seconds
    }, 1500);
  };
  
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12 py-16">
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="senderEmail"
            value={formData.senderEmail}
            onChange={(e) => setFormData(p => ({...p, senderEmail: e.target.value}))}
            placeholder="Your Email"
            required
            className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <textarea
            name="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData(p => ({...p, message: e.target.value}))}
            placeholder="Your message"
            required
            className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
};


const PortfolioView: React.FC<{ data: PortfolioData }> = ({ data }) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.background;
    const prevBodyBg = body.style.background;
    html.style.background = "#000";
    body.style.background = "#000";
    return () => {
      html.style.background = prevHtmlBg;
      body.style.background = prevBodyBg;
    };
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 bg-black">
        Loading Portfolio...
      </div>
    );
  }

  const {
    aboutMe = {} as any, socials = {}, experiences = [], education = [], achievements = []
  } = data as any;
  const { greeting, name, role, bio, aboutMe: aboutMeText, resume } = aboutMe;
  
  return (
    <div className="bg-black text-gray-300 min-h-screen w-full">
      
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-bold leading-tight">
            <span className="block text-white text-4xl md:text-5xl lg:text-6xl mb-2">{greeting || "Hi, I'm"}</span>
            <span className="block text-blue-500 text-6xl md:text-7xl lg:text-8xl break-words">{name || "Your Name"}</span>
          </h1>

          {role && <p className="mt-6 text-xl md:text-2xl text-gray-300 font-medium">{role}</p>}
          {bio && <p className="mt-10 text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl break-words">{bio}</p>}

          <div className="pt-6 flex items-center gap-4 flex-wrap">
            {Object.entries(socials).filter(([_, v]) => v).map(([key, val]) => (
              <a key={key} href={key === "email" ? `mailto:${val}` : String(val)} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
                {socialIcons[key] || null}
              </a>
            ))}
            {resume && isUrlLike(resume) && (
              <a href={resume} target="_blank" rel="noopener noreferrer" title="View Résumé"
                className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {aboutMeText && (
        <Section title="About Me">
          <p className="whitespace-pre-wrap break-words leading-relaxed max-w-4xl">{aboutMeText}</p>
        </Section>
      )}

      {experiences.length > 0 && (
        <Section title="Work Experience">
          <div className="space-y-12">
            {experiences.map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-500 break-words">{exp.company || "Company"}</h3>
                    <p className="text-white font-medium mt-1 break-words">{exp.role || "Role"}</p>
                    <p className="mt-3 text-gray-400 leading-relaxed max-w-3xl break-words whitespace-pre-wrap">{exp.description || "Description"}</p>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap pt-1">
                    {[exp.startDate ? format(new Date(exp.startDate), 'MMM yyyy') : '', exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'].filter(Boolean).join(" - ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-8">
            {education.map((edu: any, i: number) => (
              <div key={i} className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-blue-500 break-words">{edu.institution || "Institution"}</h3>
                  <p className="text-white font-medium mt-1 break-words">{edu.degree || "Degree"}</p>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap pt-1">
                  {[edu.startYear, edu.endYear].filter(Boolean).join(" - ")}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {achievements.length > 0 && (
        <Section title="Achievements">
          <div className="space-y-8">
            {(achievements as any[]).map((a: any, i: number) => (
              <div key={i} className="max-w-3xl">
                <h3 className="text-lg font-semibold text-blue-500 mb-3">{a.title || "Achievement"}</h3>
                <p className="text-white leading-relaxed">{a.description || ""}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <ContactForm portfolioOwnerEmail={socials?.email} />
    </div>
  );
};

export default PortfolioView;