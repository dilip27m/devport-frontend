DevPort – Dynamic Portfolio Builder
📌 Overview

DevPort is a full-stack web application that helps students, developers, and professionals create and deploy their personal portfolios in minutes.

Unlike static portfolio templates, DevPort allows users to:

Edit portfolio details (Profile, Projects, Skills, Blogs, Certifications, Achievements, etc.) via an Editor UI

Preview changes in real-time through a Live Preview

Switch between multiple templates (different designs) without re-entering data

Deploy a shareable portfolio site with one click

Tech stack: Next.js (frontend), Express.js (backend), MongoDB (database).

🎯 Problem Statement

Most students struggle to build professional portfolios.

Available templates require coding knowledge and are not easily customizable.

Users want to focus on content, not design or deployment issues.

🚀 Purpose

DevPort solves this by providing:

Zero-code portfolio building

Multiple templates for different design styles

Centralized data model → once filled, data works across all templates

One-click deployment

🛠️ System Workflow

Landing Page

Navbar with: Templates | Pricing | Profile

Explains what DevPort is and provides signup/login options.

Editor (Main User Dashboard)

Left Sidebar: Navigation (Profile, Projects, Skills, Blogs, Certifications, Achievements, Activities).

Right Panel (Forms): Input fields for each section (e.g., Project title, description, links).

Middle Panel (Live Preview): Renders the selected template with live updates as the user types.

Templates

Each template is a mini-website structure with Navbar, Header, Projects, Skills, Blogs, etc.

Built with Next.js App Router → multi-page routing (/projects, /skills, /blogs).

Uses shared data model from the Editor.

Data Flow

User input (FormContainer) → updates global state (data).

data → passed to LivePreview → dynamically injected into the chosen template.

When saved, data is stored in MongoDB via Express backend.

On deployment, the chosen template fetches this data and renders the final portfolio.

🖼️ UI/UX Breakdown
Editor Page

Left Sidebar (10–15% width): Section selector (Profile, Skills, etc.)

Middle Live Preview (65% width): Mini portfolio preview (selected template)

Right FormContainer (25% width): Input fields

Template Page (example: Template1)

Navbar: Links to different sections (Home, Projects, Skills, Blogs, etc.)

Landing Page: Hero/Profile section

Projects Page: Maps over projects[] and renders ProjectComp

Skills Page: Renders skills[] as styled badges

Blogs Page: Maps over blogs[] and displays blog cards

Certifications/Achievements: Similar structure

📂 File Structure
app/
│── editor/                       # Portfolio editor UI
│   ├── page.tsx                  # Editor main page
│   ├── layout.tsx                # Layout for editor
│   └── components/               # Editor UI parts
│       ├── Sidebar.tsx
│       ├── LivePreview.tsx
│       ├── FormContainer.tsx
│       └── InputFields/          # Profile, Projects, Skills, etc.
│
│── templates/                    # All templates live here
│   ├── template1/
│   │   ├── layout.tsx            # Template-wide layout (Navbar/Footer)
│   │   ├── page.tsx              # Landing/Profile page
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── certifications/page.tsx
│   │   ├── achievements/page.tsx
│   │   └── components/           # Template1-specific UI
│   │       ├── Navbar.tsx
│   │       ├── Header.tsx
│   │       ├── ProjectComp.tsx
│   │       └── ...
│
components/                       # Shared UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── Card.tsx
│
api/                              # API routes to connect backend
│
globals.css                       # Global styles
│── layout.tsx                    # Global app layout
│── page.tsx                      # Landing Page

🔄 Data Model
data = {
  profile: { name: "", bio: "", email: "" },
  skills: [ "React", "Next.js", "MongoDB" ],
  projects: [ { title: "", description: "", link: "" } ],
  blogs: [ { title: "", description: "", link: "" } ],
  certifications: [ { name: "", issuer: "" } ],
  achievements: [ { title: "", description: "", date: "" } ],
  activities: [ { title: "", description: "", date: "" } ]
}

✅ Current Progress

 Frontend setup with Next.js (App Router)

 Backend setup with Express + MongoDB

 Editor UI (Sidebar, Forms, Live Preview)

 Template1 (static, multi-page structure)

 Connect Live Preview → Template1 dynamically

 Save/Load data from MongoDB

 Add more templates (Template2, Template3)

 Deployment system

🔮 Future Scope

Add user authentication (Login/Signup)

Cloud hosting for portfolios (subdomain like username.devport.com)

Drag-and-drop form editing

Premium templates (pricing model)

Export as static HTML/CSS/React code
