import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

const statusStyles = {
  applied: "bg-blue-100 text-blue-700",
  shortlisted: "bg-yellow-100 text-yellow-700",
  interview: "bg-purple-100 text-purple-700",
  offered: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/my");
        setApplications(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load applications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-slate-100 p-8">
        <h1 className="text-4xl font-bold mb-2">My Applications</h1>
        <p className="text-gray-500 mb-8">
          Track the status of companies you've applied to.
        </p>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            {error}
          </p>
        )}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <p className="px-6 py-6 text-gray-500">
              Loading applications...
            </p>
          ) : applications.length === 0 ? (
            <p className="px-6 py-6 text-gray-500">
              You haven't applied to any companies yet.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Applied On</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.company?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {app.company?.role || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          statusStyles[app.status]
                        }`}
                      >
                        {app.status}
                      </span>
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

export default Applications;