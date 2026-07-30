import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white px-5 md:px-20 py-4 md:py-5 shadow-sm relative z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">PlacePro</h1>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-4 border-t border-gray-100 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;