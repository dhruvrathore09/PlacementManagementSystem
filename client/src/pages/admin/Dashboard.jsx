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
        const [companiesRes, studentsRes, applicationsRes] = await Promise.all([
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
        setError(err.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Total Companies", value: stats.totalCompanies, emoji: "🏢", color: "bg-blue-50 text-blue-600" },
    { label: "Total Students", value: stats.totalStudents, emoji: "🎓", color: "bg-emerald-50 text-emerald-600" },
    { label: "Applications", value: stats.totalApplications, emoji: "📄", color: "bg-amber-50 text-amber-600" },
    { label: "Placement Rate", value: "—", emoji: "📈", color: "bg-purple-50 text-purple-600", note: "Coming soon" },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {adminUser?.name?.split(" ")[0] || "Admin"} 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Here's what's happening with your placements today.
          </p>
        </div>
        <Link
          to="/admin/add-company"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-sm font-medium text-center"
        >
          + Add Company
        </Link>
      </div>

      {error && (
        <p className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-lg md:text-xl ${card.color}`}>
              {card.emoji}
            </div>
            <p className="text-gray-500 text-xs md:text-sm mt-3 md:mt-4">{card.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
              {loading ? "..." : card.value}
            </p>
            {card.note && <p className="text-xs text-gray-400 mt-1">{card.note}</p>}
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-10 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center px-4 md:px-6 py-4 md:py-5 border-b border-gray-100">
          <h2 className="text-base md:text-lg font-bold text-gray-800">Recently Added Companies</h2>
          <Link to="/admin/companies" className="text-sm text-blue-600 font-medium hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="px-4 md:px-6 py-6 text-gray-500">Loading...</p>
        ) : recentCompanies.length === 0 ? (
          <p className="px-4 md:px-6 py-6 text-gray-500">No companies added yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentCompanies.map((company) => (
              <div key={company._id} className="flex justify-between items-center px-4 md:px-6 py-4 gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{company.name}</p>
                  <p className="text-sm text-gray-500 truncate">{company.role}</p>
                </div>
                <Link
                  to={`/admin/edit-company/${company._id}`}
                  className="text-sm text-blue-600 font-medium hover:underline whitespace-nowrap"
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