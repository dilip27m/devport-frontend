 DevPort – Frontend Setup Guide 
1) Project Overview

DevPort is a full-stack web application that enables students, developers, and professionals to create, preview, and deploy personal portfolios — all without coding.

The frontend (built using Next.js) provides:

An intuitive Editor UI

A Live Preview section

Template Switching to view different designs

Integration with Cloudinary for image uploads

This guide explains, step-by-step, how to run the frontend locally for testing and evaluation.

2) Prerequisites

Before starting, make sure these are installed:

Node.js (version 18 or above)

npm (comes with Node.js)

Git

Optional: Backend should already be running at http://localhost:5000/api for full functionality.

3) Folder Structure

Make sure you’re inside the frontend directory (commonly named frontend/ or app/).

You should see files like:

package.json
next.config.js
.env.local
app/
components/

4) Create .env.local File

Inside your frontend folder, create a file named .env.local and add the following lines:

NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dd2ltpkk1


Explanation:

NEXT_PUBLIC_API_URL → Backend API base URL

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME → Cloudinary configuration for image uploads

If your backend runs on port 4000, change the first line to:

NEXT_PUBLIC_API_URL="http://localhost:4000/api"

5) Install Dependencies

Open a terminal in the frontend folder and run:

npm install


This command installs all required dependencies (Next.js, React, Zustand, etc.).

6) Start the Development Server

After installation completes, start the app with:

npm run dev


If successful, you’ll see:

✔ Ready - started server on 0.0.0.0:3000


Now open your browser and go to:
👉 http://localhost:3000

7) Verify the Setup

Once the app opens, verify these points:

Landing page loads with Navbar (Templates | Pricing | Profile)

Go to /editor → Sidebar, FormContainer, and Live Preview are visible

Typing in form fields updates Live Preview instantly

Template switcher changes layout but keeps your data

Deploy button is visible (it may simulate deployment locally)

8️) Common Errors & Fixes
 Issue	 Fix
Error: Fetch failed	Check backend URL and port in .env.local
Page not loading	Stop & restart server: Ctrl + C → npm run dev
CSS not applying	Delete .next/ folder → run npm run dev again
Images not uploading	Verify your Cloudinary name and credentials
“next not found”	Run npm install next again
9️) Optional: Build for Production

To test a production build locally:

npm run build
npm start


Then visit http://localhost:3000
.

10) Project Summary

DevPort helps users focus on content instead of coding.
It provides a zero-code portfolio builder with:

Real-time Live Preview

Multiple customizable templates

Data stored in a central model shared across all templates

Integration with MongoDB backend and Cloudinary image uploads

The frontend uses:

Next.js App Router for modern routing

React hooks for interactivity

Zustand (or Context API) for global state management

Clean, responsive design for smooth user experience

In short:
Once the faculty runs npm install → npm run dev → opens http://localhost:3000,
they’ll see a fully functional, editable, and dynamic portfolio editor UI — ready for demonstration.
