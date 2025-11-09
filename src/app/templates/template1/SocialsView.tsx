"use client";

import React from "react";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";
import { Mail, Github, Linkedin } from "lucide-react";

type SocialsViewProps = {
  /** Make the prop optional so the page can render while data loads */
  data?: SocialNetworkFormProps["data"];
};

const SocialsView: React.FC<SocialsViewProps> = ({ data }) => {
  // If socials haven't been passed yet, show a friendly placeholder.
  if (!data) {
    return (
      <section
        id="socials"
        className="p-6 md:p-8 flex items-center justify-center min-h-[300px]"
      >
        <p className="text-gray-500">Loading social links...</p>
      </section>
    );
  }

  // Basic normalizer that ensures we don't render empty anchors
  const normalize = (url?: string) => (url && url.trim().length > 0 ? url.trim() : "");

  const emailHref = normalize(data.email) ? `mailto:${data.email.trim()}` : "";
  const githubHref = normalize(data.github);
  const linkedinHref = normalize(data.linkedin);

  const socialLinks = [
    {
      name: "Email",
      href: emailHref,
      icon: <Mail className="w-8 h-8 text-white" />,
      bgColor: "bg-red-500",
    },
    {
      name: "GitHub",
      href: githubHref,
      icon: <Github className="w-8 h-8 text-white" />,
      bgColor: "bg-gray-800",
    },
    {
      name: "LinkedIn",
      href: linkedinHref,
      icon: <Linkedin className="w-8 h-8 text-white" />,
      bgColor: "bg-blue-600",
    },
  ];

  const linksToShow = socialLinks.filter((l) => !!l.href);
  const hasLinks = linksToShow.length > 0;

  return (
    <section
      id="socials"
      className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px]"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Connect With Me</h2>

      {hasLinks ? (
        <div className="flex flex-wrap justify-center gap-6">
          {linksToShow.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on ${link.name}`}
              className={`flex items-center justify-center w-24 h-24 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl ${link.bgColor}`}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
        
        </p>
      )}
    </section>
  );
};

export default SocialsView;
