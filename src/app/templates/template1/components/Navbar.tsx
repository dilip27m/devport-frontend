"use client";

interface NavbarProps {
  // This function is ONLY used by the live preview Shell
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex space-x-6 sticky top-0 z-10">
      <button onClick={() => onNavigate("home")} className="hover:text-blue-300 transition">
        About
      </button>
      <button onClick={() => onNavigate("projects")} className="hover:text-blue-300 transition">
        Projects
      </button>
      <button onClick={() => onNavigate("contact")} className="hover:text-blue-300 transition">
        Contact
      </button>
    </nav>
  );
};

export default Navbar;