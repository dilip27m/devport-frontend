"use client";

import React, { Suspense } from "react";
import type { TemplateKey } from "@/app/(main)/viewTemplate/page";

import Template1Shell from "@/app/templates/template1/Template1Shell";
import Template2Shell from "@/app/templates/template2/Template2Shell";
import Template3Shell from "@/app/templates/template3/Template3Shell";
import Template4Shell from "@/app/templates/template4/Template4Shell";
import Template5Shell from "@/app/templates/template5/Template5Shell";

const templateRegistry = {
  template1: Template1Shell,
  template2: Template2Shell,
  template3: Template3Shell,
  template4: Template4Shell,
  template5: Template5Shell,
};

// --- UPDATED PREVIEW DATA TO MATCH INTERFACES ---
const previewData: any = {
  aboutMe: {
    greeting: "Hey there, I'm",
    name: "DEVport",
    role: "Full Stack Developer & UI/UX Enthusiast",
    bio: "Passionate about creating seamless digital experiences that solve real-world problems. I love turning complex challenges into elegant solutions.",
    photo: "/images/profile.jpeg",
    aboutMe: "I'm a full-stack developer with 3 years of experience building scalable web applications. Started my coding journey in high school with Python, and haven't looked back since. When I'm not coding, you'll find me contributing to open source, writing technical blogs, or exploring the latest in AI and machine learning. I believe in writing clean, maintainable code and create products that users love."
  },
  projects: [
    {
      title: "TaskFlow - Project Management Tool",
      description: "A collaborative project management platform with real-time updates, Kanban boards, and team analytics. Built to help remote teams stay organized and productive.",
      image: "/images/project1.png",
      // FIXED: Links are now objects, not strings
      links: [
        { label: "GitHub", url: "https://github.com/alexthompson/taskflow" },
        { label: "Others", url: "https://taskflow-demo.vercel.app" }
      ],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io", "TailwindCSS"],
      startDate: "2024-06-15",
      endDate: "2024-10-20",
      type: "Web Application"
    },
    {
      title: "CodeSnippet - Developer's Notebook",
      description: "A beautiful code snippet manager with syntax highlighting, tagging system, and cloud sync. Helps developers organize and share their favorite code snippets.",
      image: "/images/project2.png",
      // FIXED
      links: [
        { label: "GitHub", url: "https://github.com/alexthompson/codesnippet" }
      ],
      stack: ["React", "Node.js", "MongoDB", "Express", "Redux", "Prism.js"],
      startDate: "2024-01-10",
      endDate: "2024-04-05",
      type: "Desktop & Web App"
    },
    {
      title: "WeatherWise - Smart Weather Dashboard",
      description: "An intelligent weather forecasting app that provides personalized recommendations based on weather conditions, location, and user preferences.",
      image: "/images/project3.png",
      // FIXED
      links: [
        { label: "Others", url: "https://weatherwise-app.netlify.app" }
      ],
      stack: ["Vue.js", "TypeScript", "OpenWeather API", "Chart.js", "Vuetify"],
      startDate: "2023-08-01",
      endDate: "2023-11-15",
      type: "Web Application"
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Massachusetts Institute of Technology",
      startMonth: "Sep",
      startYear: "2019",
      endMonth: "May",
      endYear: "2023",
      grade: "3.8 GPA"
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "General Assembly",
      startMonth: "Jan",
      startYear: "2019",
      endMonth: "Apr",
      endYear: "2019",
      grade: "Certificate of Completion"
    },
    {
      degree: "High School Diploma - Computer Science Track",
      institution: "Lincoln High School",
      startMonth: "Sep",
      startYear: "2015",
      endMonth: "Jun",
      endYear: "2019",
      grade: "4.0 GPA, Valedictorian"
    }
  ],
  skills: [
    {
      name: "Frontend",
      skills: ["react", "nextjs", "vue", "typescript", "tailwindcss", "redux"]
    },
    {
      name: "Backend",
      skills: ["nodejs", "express", "python", "django", "postgresql", "mongodb", "redis"]
    },
    {
      name: "DevOps & Tools",
      skills: ["docker", "aws", "vercel", "git", "github", "linux", "nginx"]
    }
  ],
  experiences: [
    {
      role: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      startDate: "2023-07-01",
      endDate: "2024-05-31",
      isPresent: true,
      descriptionBullets: [
        "Led development of company's main SaaS product serving 50K+ active users, improving load time by 40%",
        "Architected and implemented a micro-frontend system using Module Federation, reducing deployment time by 60%",
        "Mentored 3 junior developers, conducting code reviews and leading weekly technical workshops"
      ],
      stack: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
      // FIXED
      links: [{ label: "Others", url: "https://techcorp.com" }]
    },
    {
      role: "Full Stack Developer Intern",
      company: "StartupHub Inc",
      startDate: "2022-06-01",
      endDate: "2023-06-30",
      isPresent: false,
      descriptionBullets: [
        "Built RESTful APIs handling 1M+ requests daily with 99.9% uptime",
        "Implemented automated testing suite increasing code coverage from 45% to 85%",
        "Collaborated with design team to create responsive UI components used across 5+ products"
      ],
      stack: ["Node.js", "Express", "PostgreSQL", "React", "Docker"],
      links: []
    },
    {
      role: "Freelance Web Developer",
      company: "Self-Employed",
      startDate: "2021-01-15",
      endDate: "2022-05-30",
      isPresent: false,
      descriptionBullets: [
        "Delivered 15+ web projects for clients across e-commerce, education, and healthcare sectors",
        "Managed end-to-end project lifecycle from requirements gathering to deployment",
        "Maintained 98% client satisfaction rate with timely delivery and post-launch support"
      ],
      stack: ["WordPress", "React", "Node.js", "PHP", "MySQL"],
      links: []
    }
  ],
  achievements: [
    {
      title: "AWS Certified Solutions Architect",
      description: "Earned professional certification demonstrating expertise in designing distributed systems on AWS, focusing on scalability, security, and cost optimization.",
      year: "2024",
    },
    {
      title: "HackMIT 2023 - First Place Winner",
      description: "Led team to victory by building an AI-powered accessibility tool for visually impaired users. Won $10,000 prize and mentorship from Google engineers.",
      year: "2023",
    },
    {
      title: "Open Source Contributor - 500+ Contributions",
      description: "Active contributor to major open-source projects including React, Next.js, and TailwindCSS. Maintained several npm packages with 10K+ weekly downloads.",
      year: "2022",
    }
  ],
  blogs: [
    {
      name: "Building Scalable React Apps: Best Practices for 2024",
      category: "Web Development",
      image: "/images/blog1.png",
      description: "A comprehensive guide covering code splitting, state management, performance optimization, and architectural patterns for large-scale React applications.",
      link: "https://dev.to/alexthompson/building-scalable-react-apps"
    },
    {
      name: "From Monolith to Microservices: A Migration Story",
      category: "Backend Architecture",
      image: "/images/blog2.png",
      description: "Lessons learned from migrating a legacy monolithic application to microservices architecture. Covers challenges, solutions, and key takeaways.",
      link: "https://medium.com/@alexthompson/monolith-to-microservices"
    },
    {
      name: "TypeScript Tips Every Developer Should Know",
      category: "Programming",
      image: "/images/blog3.png",
      description: "Advanced TypeScript techniques including conditional types, mapped types, and utility types that can make your code more type-safe and maintainable.",
      link: "https://hashnode.com/@alexthompson/typescript-tips"
    }
  ],
  socials: {
    email: "alex.thompson.dev@gmail.com",
    github: "https://github.com/alexthompson",
    linkedin: "https://linkedin.com/in/alexthompsondev"
  }
};

type Props = {
  selectedTemplate: TemplateKey;
};

const TemplateLivePreview: React.FC<Props> = ({ selectedTemplate }) => {
  const ActiveTemplateComponent = templateRegistry[selectedTemplate];

  return (
    <div className="h-full w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center text-slate-500">
             <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading Template...</span>
             </div>
          </div>
        }
      >
        {ActiveTemplateComponent ? (
          <div 
            className="h-full overflow-y-auto no-scrollbar bg-slate-50 relative"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <ActiveTemplateComponent data={previewData} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-red-500">
            <strong>Error:</strong> Template "{selectedTemplate}" could not be found.
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default TemplateLivePreview;