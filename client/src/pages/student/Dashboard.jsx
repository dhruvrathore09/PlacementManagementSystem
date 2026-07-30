import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

const statusStyles = {
  applied: "text-blue-600",
  shortlisted: "text-yellow-600",
  interview: "text-purple-600",
  offered: "text-green-600",
  rejected: "text-red-600",
};

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const student = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsRes, companiesRes] = await Promise.all([
          API.get("/applications/my"),
          API.get("/companies"),
        ]);
        setApplications(applicationsRes.data);
        setCompanies(companiesRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = {
    totalApplications: applications.length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    interviews: applications.filter((a) => a.status === "interview").length,
    offers: applications.filter((a) => a.status === "offered").length,
  };

  const appliedCompanyIds = applications.map((a) => a.company?._id);
  const upcomingCompanies = companies
    .filter((c) => !appliedCompanyIds.includes(c._id))
    .slice(0, 3);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-slate-100 p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold">
          Welcome, {student?.name?.split(" ")[0] || "Student"} 👋
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Here's an overview of your placement activity.
        </p>

        {error && (
          <p className="mt-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              {loading ? "..." : stats.totalApplications}
            </p>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Applications</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">
              {loading ? "..." : stats.shortlisted}
            </p>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Shortlisted</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <p className="text-2xl md:text-3xl font-bold text-purple-600">
              {loading ? "..." : stats.interviews}
            </p>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Interviews</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <p className="text-2xl md:text-3xl font-bold text-green-600">
              {loading ? "..." : stats.offers}
            </p>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Offers</p>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-8 md:mt-10 mb-4">
          Companies You Can Apply To
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : upcomingCompanies.length === 0 ? (
          <p className="text-gray-500">
            You've applied to all available companies, or none are listed yet.
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingCompanies.map((company) => (
              <div
                key={company._id}
                className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col md:flex-row justify-between md:items-center gap-3"
              >
                <div>
                  <p className="font-bold text-lg">{company.name}</p>
                  <p className="text-gray-500">{company.role}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-green-600 font-semibold">
                    {company.salary || "—"}
                  </p>
                  <Link
                    to="/student/company-details"
                    state={{ company }}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-bold mt-8 md:mt-10 mb-4">
          Recent Applications
        </h2>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <p className="px-6 py-6 text-gray-500">Loading...</p>
          ) : applications.length === 0 ? (
            <p className="px-6 py-6 text-gray-500">
              No applications yet. Browse companies to get started.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.slice(0, 5).map((app) => (
                  <tr key={app._id}>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {app.company?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {app.company?.role || "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 font-medium capitalize whitespace-nowrap ${statusStyles[app.status]}`}
                    >
                      {app.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;