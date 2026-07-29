import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load companies."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/companies/${id}`);
      setCompanies(companies.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete company.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            Manage Companies
          </h1>
          <p className="text-gray-500 mt-1">
            View, edit, and remove companies listed for placement.
          </p>
        </div>

        <Link
          to="/admin/add-company"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
        >
          + Add Company
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading companies...</p>}

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      {!loading && !error && companies.length === 0 && (
        <p className="text-gray-500">
          No companies added yet. Click "Add Company" to get started.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {company.name}
            </h2>
            <p className="text-blue-600 font-medium">{company.role}</p>

            {company.location && (
              <p className="text-gray-500 text-sm mt-2">
                📍 {company.location}
              </p>
            )}
            {company.salary && (
              <p className="text-gray-500 text-sm">💰 {company.salary}</p>
            )}
            {company.eligibility && (
              <p className="text-gray-500 text-sm">
                🎓 {company.eligibility}
              </p>
            )}

            <div className="flex gap-3 mt-5">
              <Link
                to={`/admin/edit-company/${company._id}`}
                className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(company._id)}
                className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;