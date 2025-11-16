"use client";

import React from "react";
import type { SocialNetworkFormProps } from "@/app/(main)/editor/components/forms/SocialNetworForm";
import { Mail, Github, Linkedin } from "lucide-react";

type SocialsViewProps = {
  data?: SocialNetworkFormProps["data"];
};

const t = (v?: string) => (v ?? "").trim();

/** robust normalizers */
const normalizeEmail = (email?: string) => {
  const e = t(email);
  if (!e || !e.includes("@")) return "";
  return `mailto:${e}`;
};

const normalizeGithub = (github?: string) => {
  let g = t(github);
  if (!g) return "";
  // handle @user
  g = g.replace(/^@/, "");
  // already a full url?
  if (/^https?:\/\//i.test(g)) return g;
  // copied without protocol?
  if (/^github\.com\//i.test(g)) return `https://${g}`;
  // username or org/repo
  return `https://github.com/${g}`;
};

const normalizeLinkedIn = (linkedin?: string) => {
  let l = t(linkedin);
  if (!l) return "";
  if (/^https?:\/\//i.test(l)) return l;
  if (/^linkedin\.com\//i.test(l)) return `https://${l}`;
  // accept "in/slug" or just "slug"
  const slug = l.startsWith("in/") ? l : `in/${l}`;
  return `https://www.linkedin.com/${slug}`;
};

const SocialsView: React.FC<SocialsViewProps> = ({ data }) => {
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

  const emailHref = normalizeEmail(data.email);
  const githubHref = normalizeGithub(data.github);
  const linkedinHref = normalizeLinkedIn(data.linkedin);

  const socialLinks = [
    {
      name: "Email",
      href: emailHref,
      icon: <Mail className="w-8 h-8 text-white" />,
      bg: "bg-red-700", // Adjusted for dark theme
      label: data.email ? `Email ${data.email}` : "Email",
    },
    {
      name: "GitHub",
      href: githubHref,
      icon: <Github className="w-8 h-8 text-white" />,
      bg: "bg-gray-800", // Adjusted for dark theme
      label: data.github ? `GitHub ${data.github}` : "GitHub",
    },
    {
      name: "LinkedIn",
      href: linkedinHref,
      icon: <Linkedin className="w-8 h-8 text-white" />,
      bg: "bg-blue-700", // Adjusted for dark theme
      label: data.linkedin ? `LinkedIn ${data.linkedin}` : "LinkedIn",
    },
  ];

  const linksToShow = socialLinks.filter((s) => s.href);

  return (
    <section
      id="socials"
      className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px]"
    >
      <h2 className="text-3xl font-bold mb-8 text-white">Social Networks</h2>

      {linksToShow.length ? (
        <div className="flex flex-wrap justify-center gap-6">
          {linksToShow.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`flex items-center justify-center w-24 h-24 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl ${link.bg}`}
              title={link.label}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center max-w-prose">
          Add your Email, GitHub, or LinkedIn in the form to show buttons here.
        </p>
      )}
    </section>
  );
};

export default SocialsView;