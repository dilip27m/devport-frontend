interface Certification {
  title: string;
  org: string;
  date: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
      <div className="space-y-3">
        {certifications.map((cert, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold">{cert.title}</h3>
            <p className="text-gray-700">{cert.org} | {cert.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
