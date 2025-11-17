"use client";

import React from "react";
import type { SocialNetworkFormProps } from '@/app/(main)/editor/components/forms/SocialNetworForm';
import { Mail, Linkedin, FileText } from "lucide-react";

interface ContactViewProps {
  userEmail?: string;
  socials: SocialNetworkFormProps["data"];
  resume?: string;
}

const t = (v?: string) => (v ?? "").trim();

const normalizeEmail = (email?: string) => {
  const e = t(email);
  if (!e || !e.includes("@")) return "";
  return `mailto:${e}`;
};

const normalizeLinkedIn = (linkedin?: string) => {
  let l = t(linkedin);
  if (!l) return "";
  if (/^https?:\/\//i.test(l)) return l;
  if (/^linkedin\.com\//i.test(l)) return `https://${l}`;
  const slug = l.startsWith("in/") ? l : `in/${l}`;
  return `https://www.linkedin.com/${slug}`;
};

const isUrlLike = (s?: string) =>
  !!s && /^(https?:\/\/|data:application\/pdf;|\/|blob:)/i.test(s);

const ContactView: React.FC<ContactViewProps> = ({ socials, resume }) => {
  const linkedinHref = normalizeLinkedIn(socials?.linkedin);
  const emailHref = normalizeEmail(socials?.email);

  return (
    <section className="text-center py-20 border-t border-gray-800">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
        Keep In Touch.
      </h2>
      
      <p className="text-gray-400 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
        I'm currently specializing in <span className="text-green-400 font-medium">Front-end Development</span>. 
        Feel free to get in touch and talk more about your projects.
      </p>

 
      <div className="flex justify-center flex-wrap gap-4 mb-16">
        {linkedinHref && (
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#161b22] border border-gray-700 text-gray-200 hover:text-green-400 hover:border-green-400 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
        )}
        
        {emailHref && (
          <a
            href={emailHref}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#161b22] border border-gray-700 text-gray-200 hover:text-green-400 hover:border-green-400 transition-all duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
            <span>Email</span>
          </a>
        )}
        
        {resume && isUrlLike(resume) && (
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#161b22] border border-gray-700 text-gray-200 hover:text-green-400 hover:border-green-400 transition-all duration-200"
            aria-label="Resume"
          >
            <FileText size={18} />
            <span>Resume</span>
          </a>
        )}
      </div>
      
  
      <div className="text-xs text-gray-600 space-y-1">
        <p>Designed and Developed by Abdul Rahman.</p>
        <p>
          Built with <span className="text-green-400">Next.js</span> & <span className="text-green-400">Chakra UI</span>. 
          Hosted on <span className="text-green-400">Vercel</span>.
        </p>
      </div>
    </section>
  );
};

export default ContactView;