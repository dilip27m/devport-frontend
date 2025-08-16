interface Achievement {
  title: string;
  desc: string;
  date: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {achievements.map((ach, idx) => (
          <li key={idx}>
            <span className="font-bold">{ach.title}</span>: {ach.desc} ({ach.date})
          </li>
        ))}
      </ul>
    </section>
  );
}
