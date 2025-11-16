"use client";

import React from "react";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";

type SocialsViewProps = {
  data?: SocialNetworkFormProps["data"] & { twitter?: string; instagram?: string };
};

const SocialsView: React.FC<SocialsViewProps> = ({ data }) => {
  if (!data) {
    return (
      <section
        id="contact-section"
        className="p-8 min-h-[300px] flex items-center justify-center animate-section"
      >
        <p className="text-slate-400">Loading social links...</p>
      </section>
    );
  }

  const normalize = (url?: string) =>
    url && url.trim().length > 0 ? url.trim() : "";

  const socials = [
    { label: "Email", href: normalize(data.email) ? `mailto:${data.email}` : "", icon: <Mail size={26} /> },
    { label: "GitHub", href: normalize(data.github), icon: <Github size={26} /> },
    { label: "LinkedIn", href: normalize(data.linkedin), icon: <Linkedin size={26} /> },
    { label: "Twitter", href: normalize(data.twitter), icon: <Twitter size={26} /> },
    { label: "Instagram", href: normalize(data.instagram), icon: <Instagram size={26} /> },
  ];

  const available = socials.filter((s) => s.href);

  return (
    <section id="contact-section" className="p-8 lg:p-12 min-h-[300px] animate-section">
      <h2 className="text-3xl font-extrabold mb-10">Connect</h2>

      {available.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {available.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                glass-bg neon-border px-6 py-4 
                rounded-xl flex items-center gap-3
                hover:scale-[1.05] transition-all
                text-white shadow-lg
              "
            >
              <span className="neon-hover">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-center">No social links available.</p>
      )}
    </section>
  );
};

export default SocialsView;