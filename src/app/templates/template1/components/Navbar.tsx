"use client";
import React, { useState } from "react";
// Import Link or Share2 icon for Socials
import { User, Briefcase, Mail, GraduationCap, Star, Building2, Trophy, PenSquare, Link as LinkIcon } from 'lucide-react'; 

interface NavbarProps {
    onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    const [activePage, setActivePage] = useState("home");

    const handleNavigate = (page: string) => {
        setActivePage(page);
        onNavigate(page);
    };
    
    // An array to manage our navigation items cleanly
    const navItems = [
      { id: "home", label: "About Me", icon: <User size={16}/> },
      { id: "projects", label: "Projects", icon: <Briefcase size={16}/> },
      { id: "education", label: "Education", icon: <GraduationCap size={16}/> },
      { id: "skills", label: "Skills", icon: <Star size={16}/> },
      { id: "experience", label: "Experience", icon: <Building2 size={16}/> },
      { id: "achievements", label: "Achievements", icon: <Trophy size={16}/> },
      { id: "blogs", label: "Blogs", icon: <PenSquare size={16}/> },
      { id: "socials", label: "Connect", icon: <LinkIcon size={16}/> } // <-- RENAMED from "Contact" to "Connect"
    ];

    return (
        <nav className="bg-gray-800 text-white p-3 shadow-lg mx-4 md:mx-8 my-4 rounded-xl">
            <div className="flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
                 {navItems.map(item => (
                    <button 
                        key={item.id}
                        onClick={() => handleNavigate(item.id)} 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${ activePage === item.id
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                 ))}
            </div>
        </nav>
    );
};

export default Navbar;