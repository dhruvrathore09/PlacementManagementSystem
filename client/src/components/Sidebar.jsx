import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400">
          PlacePro
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-3">

        <NavLink
          to="/student/dashboard"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600"
            }`
          }
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/student/companies"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600"
            }`
          }
        >
          🏢 Companies
        </NavLink>

        <NavLink
          to="/student/applications"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600"
            }`
          }
        >
          📄 Applications
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-gray-700">
        <NavLink
          to="/"
          className="block px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          🚪 Logout
        </NavLink>
      </div>

    </aside>
  );
}

export default Sidebar;