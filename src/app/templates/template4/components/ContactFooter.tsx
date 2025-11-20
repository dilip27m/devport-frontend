"use client";

import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const ContactFooter = ({ socials }: { socials: any }) => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 py-16 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Work Together</h2>
            <p className="mb-10 max-w-xl mx-auto text-slate-400">
                I'm currently available for freelance projects and open to new opportunities. 
                If you have a project in mind or just want to say hello, feel free to reach out!
            </p>

            <div className="flex justify-center gap-6 mb-12">
                {socials?.email && (
                    <a href={`mailto:${socials.email}`} className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
                        <Mail size={18} />
                        <span>Email Me</span>
                    </a>
                )}
            </div>

            <div className="flex justify-center gap-6 border-t border-slate-800 pt-8">
                {socials?.github && (
                    <a href={socials.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Github size={24} />
                    </a>
                )}
                {socials?.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </a>
                )}
            </div>
            
            <div className="mt-8 text-sm text-slate-600">
                © {new Date().getFullYear()} Portfolio. Built with DevPort.
            </div>
        </div>
    </footer>
  );
};

export default ContactFooter;