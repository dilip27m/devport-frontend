"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Home() {


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">DevPort 🚀</h1>
      <p className="mt-4 text-lg text-gray-600">Testing DB Connection</p>

      <div className="space-x-3 p-6">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button size="lg">Big Button</Button>
    </div>
    </main>
  );
}