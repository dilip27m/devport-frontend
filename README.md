DevPort – Frontend Setup Guide 
1. Project Overview
DevPort is a full-stack web application that enables students, developers, and professionals to create and deploy personal portfolio websites without writing any code. The frontend is built using Next.js and offers an Editor UI, Live Preview, and Template Switching. This document provides a clear, one-page step-by-step guide for setting up and running the DevPort frontend locally.
2. Prerequisites
Before running the frontend, ensure the following software is installed on your system:
•	• Node.js (v18 or above)
• npm (comes with Node.js)
• Git
3. Folder Structure
Ensure you are inside the frontend directory of the project (usually named `frontend` or `app`). You should see the following structure:
package.json
next.config.js
.env.local
app/
components/
4. Create .env.local File
Inside your frontend folder, create a `.env.local` file with the following content:
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dd2ltpkk1
If your backend is running on port 4000 instead of 5000, update the first line as:
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
5. Install Dependencies
Run the following commands in your terminal:
cd frontend
npm install
This installs all the necessary packages required for running the project.
6. Start Development Server
Once installation completes, start the server using:
npm run dev
You should see the message: '✔ Ready - started server on 0.0.0.0:3000'.
Open your browser and visit http://localhost:3000.
7. Verify Setup
After opening the app, ensure the following features work correctly:
• The landing page loads with Navbar (Templates | Pricing | Profile)
• The Editor page (`/editor`) opens with Sidebar, Live Preview, and FormContainer
• Live Preview updates as you type
• Template Switcher and Deploy buttons appear correctly
8. Common Issues & Fixes
• Error: Fetch failed → Check backend URL & port in `.env.local`
• Page not loading → Restart server (Ctrl + C → npm run dev)
• CSS not applying → Delete `.next/` folder and rerun
• Images not uploading → Verify Cloudinary configuration
• 'next' not found → Run `npm install next`
9. Build for Production (Optional)
To test production mode locally, use the following commands:
npm run build
npm start
Then open http://localhost:3000 in your browser.
10. Project Summary
DevPort eliminates the complexity of creating professional portfolios by providing an intuitive, no-code solution. Users can fill out their profile, add projects, skills,  and instantly see real-time updates in the Live Preview section. Multiple template designs are supported, and all user data is stored centrally, allowing seamless switching between designs. The final portfolio can be deployed with a single click.

This frontend module demonstrates modern web development practices including React hooks, Next.js App Router, and integration with Cloudinary for image handling.
