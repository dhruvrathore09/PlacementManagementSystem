import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = [
    { to: "/admin/dashboard", label: "📊 Dashboard" },
    { to: "/admin/companies", label: "🏢 Companies" },
    { to: "/admin/add-company", label: "➕ Add Company" },
    { to: "/admin/students", label: "🎓 Students" },
    { to: "/admin/applications", label: "📄 Applications" },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-4 sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-400">PlacePro Admin</h1>
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
          <div>
            <h1 className="text-2xl font-bold text-blue-400">PlacePro</h1>
            <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
          </div>
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
          <p className="text-sm font-semibold">{adminUser?.name || "Admin"}</p>
          <p className="text-xs text-gray-400 mb-3">{adminUser?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;