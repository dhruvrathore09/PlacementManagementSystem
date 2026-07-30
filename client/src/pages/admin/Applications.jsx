import { useEffect, useState } from "react";
import API from "../../services/api";

const statusOptions = ["applied", "shortlisted", "interview", "offered", "rejected"];

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

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/applications/${id}`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Applications</h1>
      <p className="text-gray-500 mt-1 mb-6 md:mb-8 text-sm md:text-base">
        {applications.length} total application{applications.length !== 1 ? "s" : ""}
      </p>

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">{error}</p>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <p className="px-6 py-6 text-gray-500">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="px-6 py-6 text-gray-500">No applications yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Student</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Company</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Role</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Applied On</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-800">{app.student?.name || "N/A"}</p>
                    <p className="text-xs text-gray-400">{app.student?.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{app.company?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{app.company?.role || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className={`text-xs font-medium capitalize px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer ${statusStyles[app.status]}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Applications;