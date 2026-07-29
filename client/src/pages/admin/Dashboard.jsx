import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalStudents: 0,
    totalApplications: 0,
  });
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const adminUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [companiesRes, studentsRes, applicationsRes] =
          await Promise.all([
            API.get("/companies"),
            API.get("/users/students"),
            API.get("/applications"),
          ]);

        setStats({
          totalCompanies: companiesRes.data.length,
          totalStudents: studentsRes.data.length,
          totalApplications: applicationsRes.data.length,
        });

        setRecentCompanies(companiesRes.data.slice(0, 5));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Companies",
      value: stats.totalCompanies,
      emoji: "🏢",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      emoji: "🎓",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Applications",
      value: stats.totalApplications,
      emoji: "📄",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Placement Rate",
      value: "—",
      emoji: "📈",
      color: "bg-purple-50 text-purple-600",
      note: "Coming soon",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {adminUser?.name?.split(" ")[0] || "Admin"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your placements today.
          </p>
        </div>
        <Link
          to="/admin/add-company"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-sm font-medium"
        >
          + Add Company
        </Link>
      </div>

      {error && (
        <p className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div
              className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl ${card.color}`}
            >
              {card.emoji}
            </div>
            <p className="text-gray-500 text-sm mt-4">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {loading ? "..." : card.value}
            </p>
            {card.note && (
              <p className="text-xs text-gray-400 mt-1">{card.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Recently Added Companies
          </h2>
          <Link
            to="/admin/companies"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <p className="px-6 py-6 text-gray-500">Loading...</p>
        ) : recentCompanies.length === 0 ? (
          <p className="px-6 py-6 text-gray-500">
            No companies added yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentCompanies.map((company) => (
              <div
                key={company._id}
                className="flex justify-between items-center px-6 py-4"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {company.name}
                  </p>
                  <p className="text-sm text-gray-500">{company.role}</p>
                </div>
                <Link
                  to={`/admin/edit-company/${company._id}`}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;