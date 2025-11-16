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
  const { greeting, name, role, bio, aboutMe: aboutMeText } = aboutMe;

  console.log("Portfolio data:", { greeting, name, role, bio, aboutMeText, socials });
  
  return (
    <div className="bg-black text-gray-300 min-h-screen w-full">
      
      <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl">
          <h1 className="font-bold leading-tight">
            <span className="block text-white text-4xl md:text-5xl lg:text-6xl mb-2">{greeting || "Hi, I'm"}</span>
            <span className="block text-blue-500 text-6xl md:text-7xl lg:text-8xl break-words">{name || "Your Name"}</span>
          </h1>

          {role && (
            <p className="mt-6 text-xl md:text-2xl text-gray-300 font-medium">{role}</p>
          )}
          
          {bio && (
            <p className="mt-10 text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl break-words">{bio}</p>
          )}

          <div className="pt-6 flex items-center gap-4 flex-wrap">
            {Object.entries(socials).filter(([_, v]) => v).map(([key, val]) => (
              <a key={key} href={key === "email" ? `mailto:${val}` : String(val)} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all">
                {socialIcons[key] || null}
              </a>
            ))}
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
                    
                    {/* NEW: Description Bullets */}
                    {exp.descriptionBullets && exp.descriptionBullets.length > 0 && (
                      <ul className="mt-3 space-y-2 text-gray-400 leading-relaxed max-w-3xl">
                        {exp.descriptionBullets.map((bullet: string, bi: number) => (
                          bullet && (
                            <li key={bi} className="flex gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span className="break-words whitespace-pre-wrap">{bullet}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    )}

                    {/* NEW: Tech Stack */}
                    {exp.stack && exp.stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.stack.map((tech: string, ti: number) => (
                          <span
                            key={ti}
                            className="px-3 py-1 text-xs bg-gray-800/50 border border-gray-700 rounded-full text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* NEW: Links */}
                    {exp.links && exp.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {exp.links.map((link: any, li: number) => (
                          link.url && (
                            <a
                              key={li}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {link.label || "Link"}
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap pt-1">
                    {[exp.startDate ? format(new Date(exp.startDate), 'MMM yyyy') : '', exp.isPresent ? 'Present' : exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : ''].filter(Boolean).join(" - ")}
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
                  {edu.grade && <p className="text-gray-400 text-sm mt-1">Grade: {edu.grade}</p>}
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap pt-1">
                  {/* Handle month/year format from education form */}
                  {edu.startMonth && edu.startYear && edu.endMonth && edu.endYear
                    ? `${edu.startMonth} ${edu.startYear} - ${edu.endMonth} ${edu.endYear}`
                    : edu.startYear && edu.endYear
                    ? `${edu.startYear} - ${edu.endYear}`
                    : ""
                  }
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ========== Updated Achievements Section (Now matches ProjectsView style) ========== */}
      {achievements.length > 0 && (
        <Section title="Achievements">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(achievements as any[]).map((a: any, i: number) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col min-h-0"
              >
                {/* Image area (constrained like ProjectsView) */}
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-950 to-black flex-none">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title || `achievement-${i}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900/30">
                      <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM8 14c0 1.105-1.343 2-3 2v2h10v-2c-1.657 0-3-.895-3-2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* optional tag (year/type) */}
                  {a.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                        {a.tag}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 min-h-0">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 break-words">
                    {a.title || "Achievement"}
                  </h3>

                  {a.year && <p className="text-sm text-gray-500 mb-3">({a.year})</p>}

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 break-words break-all whitespace-normal overflow-hidden"
                     style={{
                       display: "-webkit-box",
                       WebkitBoxOrient: "vertical",
                       WebkitLineClamp: 4,
                     }}
                  >
                    {a.description || ""}
                  </p>

                  {/* optional extra links or metadata */}
                  {a.link && (
                    <div className="mt-auto pt-4 border-t border-gray-800/50">
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 hover:text-blue-300 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 3h7v7m0-7L10 14" />
                        </svg>
                        View
                      </a>
                    </div>
                  )}
                </div>
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
