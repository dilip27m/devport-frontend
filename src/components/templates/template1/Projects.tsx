interface Project {
  title: string;
  desc: string;
  link?: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={idx} className="border p-4 rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-bold">{proj.title}</h3>
            <p className="text-gray-700">{proj.desc}</p>
            {proj.link && <a href={proj.link} target="_blank" className="text-blue-600 underline">View Project</a>}
          </div>
        ))}
      </div>
    </section>
  );
}
