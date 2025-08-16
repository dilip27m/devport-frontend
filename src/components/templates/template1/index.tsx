import Header from './Header';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certifications from './Certifications';
import Blogs from './Blogs';
import Achievements from './Achievements';
import Footer from './Footer';

interface Template1Data {
  name: string;
  role: string;
  contact: any; // Replace 'any' with a specific type if known
  social: any; // Replace 'any' with a specific type if known
  bio: string;
  skills: any[]; // Replace 'any' with a specific type if known
  projects: any[]; // Replace 'any' with a specific type if known
  certifications: any[]; // Replace 'any' with a specific type if known
  blogs: any[]; // Replace 'any' with a specific type if known
  achievements: any[]; // Replace 'any' with a specific type if known
}

export default function Template1({ data }: { data: Template1Data }) {
  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto p-6">
      <Header name={data.name} role={data.role} contact={data.contact} social={data.social} />
      <About bio={data.bio} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Certifications certifications={data.certifications} />
      <Blogs blogs={data.blogs} />
      <Achievements achievements={data.achievements} />
      <Footer contact={data.contact} />
    </div>
  );
}
