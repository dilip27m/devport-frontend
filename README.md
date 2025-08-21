# DevPort – Dynamic Portfolio Builder

## 📌 Overview
**DevPort** is a full-stack web application that helps students, developers, and professionals create and deploy their personal portfolios in minutes.

Unlike static portfolio templates, **DevPort** allows users to:
- Edit portfolio details (Profile, Projects, Skills, Blogs, Certifications, Achievements, etc.) via an **Editor UI**
- Preview changes in real-time through a **Live Preview**
- Switch between multiple templates (different designs) **without re-entering data**
- Deploy a shareable portfolio site with **one click**

**Tech Stack**: Next.js (frontend), Express.js (backend), MongoDB (database).

---

## 🎯 Problem Statement
- Most students struggle to build professional portfolios.
- Available templates require coding knowledge and are not easily customizable.
- Users want to focus on **content**, not design or deployment issues.

---

## 🚀 Purpose
DevPort solves this by providing:
- **Zero-code** portfolio building
- **Multiple templates** for different design styles
- **Centralized data model** → once filled, data works across all templates
- **One-click deployment**

---

## 🛠️ System Workflow

### 1) Landing Page
- Navbar with: **Templates | Pricing | Profile**
- Explains what DevPort is and provides **signup/login options**

### 2) Editor (Main User Dashboard)
- **Left Sidebar**: Navigation (Profile, Projects, Skills, Blogs, Certifications, Achievements, Activities)
- **Right Panel (Forms)**: Input fields for each section (e.g., Project title, description, links)
- **Middle Panel (Live Preview)**: Renders the selected template with live updates as the user types

**Bottom Bar**
- **Template Switcher** → toggle between Template1, Template2, Template3 previews
- **Deploy Button** → saves data to MongoDB and deploys portfolio (via backend)

### 3) Templates
- Each template is a mini-website structure with Navbar, Header, Projects, Skills, Blogs, etc.
- Built with **Next.js App Router** → multi-page routing (`/projects`, `/skills`, `/blogs`)
- Uses **shared data model** from the Editor

### 4) Data Flow
~~~
User input (FormContainer) → updates global state (data)
data → passed to LivePreview → dynamically injected into the chosen template
When saved → data is stored in MongoDB via Express backend
On deployment → chosen template fetches this data and renders the final portfolio
~~~

---

## 🖼️ UI/UX Breakdown

### Editor Page
- **Left Sidebar (10–15% width)**: Section selector (Profile, Skills, etc.)
- **Middle Live Preview (65% width)**: Mini portfolio preview (selected template)
- **Right FormContainer (25% width)**: Input fields

**Bottom Bar**
- Template switcher (buttons for Template1, Template2, Template3)
- Deploy button (one-click publish)

### Template Page (Example: Template1)
- **Navbar**: Links to different sections (Home, Projects, Skills, Blogs, etc.)
- **Landing Page**: Hero/Profile section
- **Projects Page**: Maps over `projects[]` and renders `ProjectComp`
- **Skills Page**: Renders `skills[]` as styled badges
- **Blogs Page**: Maps over `blogs[]` and displays blog cards
- **Certifications/Achievements**: Similar structure

---

## 📂 File Structure
~~~
app/
│── editor/                       
│   ├── page.tsx                  # Editor main page
│   ├── layout.tsx                # Layout for editor
│   └── components/               
│       ├── Sidebar.tsx
│       ├── LivePreview.tsx
│       ├── FormContainer.tsx
│       ├── BottomBar.tsx         # Template switcher + Deploy button
│       └── InputFields/          
│           ├── ProfileForm.tsx
│           ├── ProjectsForm.tsx
│           ├── SkillsForm.tsx
│           ├── BlogsForm.tsx
│           ├── CertificationsForm.tsx
│           ├── AchievementsForm.tsx
│           └── ExtracurricularForm.tsx
│
│── templates/                    
│   ├── template1/
│   │   ├── layout.tsx            
│   │   ├── page.tsx              
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── certifications/page.tsx
│   │   ├── achievements/page.tsx
│   │   └── components/           
│   │       ├── Navbar.tsx
│   │       ├── Header.tsx
│   │       ├── ProjectComp.tsx
│   │       └── ...
│
components/                       
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── Card.tsx
│
api/                              
│
globals.css                       
│── layout.tsx                    
│── page.tsx                      
~~~

---

## 🔄 Data Model
~~~js
const data = {
  profile: { name: "", bio: "", email: "" },
  skills: [ "React", "Next.js", "MongoDB" ],
  projects: [ { title: "", description: "", link: "" } ],
  blogs: [ { title: "", description: "", link: "" } ],
  certifications: [ { name: "", issuer: "" } ],
  achievements: [ { title: "", description: "", date: "" } ],
  activities: [ { title: "", description: "", date: "" } ]
};
export default data;
~~~

> **Note**: The same `data` object powers all templates. Users fill once; every template renders from the same schema.

---

## 🧠 State Management (Editor → Live Preview)
- Maintain a **global state** (e.g., React Context/Zustand) named `data`.
- `FormContainer` updates slices of `data` (e.g., `projects`, `skills`).  
- `LivePreview` subscribes to `data` and re-renders the chosen template in real time.
- Persist to backend on **Save** / **Deploy**.

---

## 🌐 API (High-Level)
~~~
POST /api/save          # Save current data to MongoDB
GET  /api/load/:userId  # Fetch saved data
POST /api/deploy        # Trigger deployment for selected template
~~~

**Payload example (save):**
~~~json
{
  "userId": "abc123",
  "template": "template1",
  "data": {
    "profile": { "name": "Dilip", "bio": "Frontend Dev", "email": "dilip@example.com" },
    "skills": ["React", "Next.js", "MongoDB"],
    "projects": [{ "title": "DevPort", "description": "Dynamic portfolio builder", "link": "#" }]
  }
}
~~~

---

## 🚢 Deployment Flow (One-Click)
1. User clicks **Deploy** in the Bottom Bar.
2. Frontend sends `userId`, `template`, and **data reference** to backend.
3. Backend builds a static site for the selected template using the stored data.
4. Uploaded to hosting (e.g., Vercel/Static bucket).  
5. Returns a shareable URL (e.g., `https://username.devport.com`).

---

## ⚙️ Environment Variables
Create `.env` files for frontend and backend.

~~~bash
# frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# backend/.env
MONGODB_URI=mongodb://localhost:27017/devport
JWT_SECRET=supersecret
DEPLOY_TARGET=local
~~~

---

## 🧪 Local Development

### Prerequisites
- Node.js LTS
- MongoDB (local or cloud)

### Run Backend
~~~bash
cd backend
npm install
npm run dev
# server on http://localhost:4000
~~~

### Run Frontend
~~~bash
cd frontend
npm install
npm run dev
# app on http://localhost:3000
~~~

---

## ✅ Current Progress
- [x] Frontend setup with Next.js (App Router)
- [x] Backend setup with Express + MongoDB
- [x] Editor UI (Sidebar, Forms, Live Preview, Bottom Bar)
- [x] Template1 (static, multi-page structure)
- [ ] Connect Live Preview → Template1 dynamically
- [ ] Save/Load data from MongoDB
- [ ] Add more templates (Template2, Template3)
- [ ] Deployment system

---

## 🔮 Future Scope
- User authentication (Login/Signup)
- Cloud hosting for portfolios (subdomain like `username.devport.com`)
- Drag-and-drop form editing
- Premium templates (pricing model)
- Export as static HTML/CSS/React code

---

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome-thing`
3. Commit: `git commit -m "feat: add awesome thing"`
4. Push: `git push origin feat/awesome-thing`
5. Open a PR

---

## ❓ FAQ
- **Can I switch templates later?**  
  Yes. The data model is centralized; templates are interchangeable.

- **Do I need to code to use DevPort?**  
  No. Everything is handled via the Editor (zero-code).

- **Will blog posts be real pages?**  
  Yes. Templates can render `/blogs` as static pages from your `blogs[]` data.

---

## 📝 Summary
This README explains **why DevPort exists**, **how Editor → Templates → Deploy** connects, and **where each component/file belongs**, so any new teammate or AI can jump in quickly.
