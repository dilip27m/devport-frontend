"use client";

import Link from "next/link";

const DeployedNavbar = () => {
  return (
    // CHANGE: Dark, earthy brown background for the header, creamy text
    <nav className="bg-amber-800 text-stone-100 p-4 flex justify-end space-x-8 sticky top-0 z-10 shadow-lg border-b border-stone-700 max-w-7xl mx-auto w-full">
      {/* CHANGE: Links align to the right side of the main container (like the example) */}
      <Link href="/templates/template1/experience" className="hover:text-yellow-300 transition font-semibold">
        Experience
      </Link>
      <Link href="/templates/template1/projects" className="hover:text-yellow-300 transition font-semibold">
        Projects
      </Link>
      <Link href="#" className="hover:text-yellow-300 transition font-semibold">
        Contact
      </Link>
      <Link href="#" className="hover:text-yellow-300 transition font-semibold">
        Resume
      </Link>
    </nav>
  );
};

export default DeployedNavbar;