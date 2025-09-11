// PASTE THIS ENTIRE CODE BLOCK INTO app/(main)/layout.tsx

import Navbar from "@/components/Navbar"; // Make sure this path is correct

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This is now the application shell.
    <div>
      {/* 1. The Navbar is rendered. It will be fixed to the top of the viewport. */}
      <Navbar />

      {/* 2. The <main> content area fills the screen and has top PADDING. */}
      {/* `h-screen`: Makes the container the full height of the viewport. */}
      {/* `pt-16`: Adds 4rem (64px) of PADDING to the top. This pushes all */}
      {/*           children down, perfectly clearing the navbar. */}
      {/* (If your navbar is taller or shorter than 64px, adjust pt-16 accordingly) */}
      <main className="h-screen pt-16">
        {children}
      </main>
    </div>
  );
}