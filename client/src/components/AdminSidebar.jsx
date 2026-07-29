import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const adminUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400">
          PlacePro
        </h1>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-3">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/companies"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
            }`
          }
        >
          🏢 Companies
        </NavLink>

        <NavLink
          to="/admin/add-company"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
            }`
          }
        >
          ➕ Add Company
        </NavLink>

        <NavLink
          to="/admin/students"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
            }`
          }
        >
          🎓 Students
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
            }`
          }
        >
          📄 Applications
        </NavLink>

      </nav>

      {/* Admin info + Logout */}
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
  );
}

export default AdminSidebar;