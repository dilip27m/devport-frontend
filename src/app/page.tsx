"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/test")
      .then((res) => res.json())
      .then((data) => setTests(data.tests || []));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">DevPort 🚀</h1>
      <p className="mt-4 text-lg text-gray-600">Testing DB Connection</p>

      <ul className="mt-6 space-y-2">
        {tests.map((t: any) => (
          <li key={t._id} className="p-2 bg-white shadow rounded">
            {t.name} — {new Date(t.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
