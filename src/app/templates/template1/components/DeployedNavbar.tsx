"use client";

import Link from "next/link";

const DeployedNavbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex space-x-6 sticky top-0 z-10">
      {/* These are real links for the final deployed site */}
      <Link href="/templates/template1" className="hover:text-blue-300 transition">
        About
      </Link>
      <Link href="/templates/template1/projects" className="hover:text-blue-300 transition">
        Projects
      </Link>
      {/* Add a placeholder for contact */}
      <Link href="#" className="hover:text-blue-300 transition">
        Contact
      </Link>
    </nav>
  );
};

export default DeployedNavbar;