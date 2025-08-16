interface AboutProps {
  bio: string;
}

export default function About({ bio }: AboutProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">About Me</h2>
      <p className="text-gray-700">{bio}</p>
    </section>
  );
}
