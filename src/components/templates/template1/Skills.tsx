interface SkillsProps {
  skills: string[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{skill}</span>
        ))}
      </div>
    </section>
  );
}
