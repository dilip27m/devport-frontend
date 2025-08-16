import '@/app/globals.css';
import Template1 from '@/components/templates/template1';

const userData = {
  name: "Dilip Kumar",
  role: "Frontend Developer",
  contact: { email: "dilip@example.com", phone: "1234567890" },
  social: { github: "#", linkedin: "#" },
  bio: "Passionate developer building web applications.",
  skills: ["JavaScript", "Next.js", "Express.js"],
  projects: [{ title: "Project A", desc: "Demo project", link: "#" }],
  certifications: [{ title: "Cert A", org: "Org", date: "2025" }],
  blogs: [{ title: "Blog A", link: "#", desc: "Sample blog" }],
  achievements: [{ title: "Hackathon Winner", desc: "XYZ Hackathon 2024", date: "2024" }]
};

export default function Template1Page() {
  return <Template1 data={userData} />;
}
