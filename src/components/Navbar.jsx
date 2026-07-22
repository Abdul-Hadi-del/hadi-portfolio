import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Hadi<span className="text-purple-500">.</span></h1>

        <ul className="hidden md:flex gap-8 text-gray-300">
          {links.map((link) => (
            <li key={link.href}><a href={link.href} className="hover:text-purple-400 transition">{link.label}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition">
            Hire Me
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4">
          <ul className="flex flex-col gap-4 text-gray-300">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="block hover:text-purple-400 transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm text-center transition">
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;