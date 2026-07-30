import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/student/dashboard", label: "📊 Dashboard" },
    { to: "/student/profile", label: "👤 Profile" },
    { to: "/student/companies", label: "🏢 Companies" },
    { to: "/student/applications", label: "📄 Applications" },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-4 sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-400">PlacePro</h1>
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 min-h-screen bg-gray-900 text-white flex flex-col z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-blue-400">PlacePro</h1>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-5 space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-5 border-t border-gray-700">
          <NavLink
            to="/"
            className="block px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            🚪 Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;