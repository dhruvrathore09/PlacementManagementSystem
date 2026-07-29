import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            PlacePro
          </h2>
          <p className="text-gray-400 mt-2 max-w-xs">
            Connecting students with opportunities.
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          <Link to="/" className="text-gray-300 hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/features" className="text-gray-300 hover:text-blue-400 transition">
            Features
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-blue-400 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition">
            Contact
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>

      <p className="text-center text-gray-500 mt-10 pt-6 border-t border-gray-800 mx-8">
        © 2026 PlacePro. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;