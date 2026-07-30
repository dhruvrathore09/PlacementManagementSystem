import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", role: "", description: "", location: "",
    salary: "", eligibility: "", lastDateToApply: "", website: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await API.get(`/companies/${id}`);
        const company = res.data;
        setFormData({
          name: company.name || "", role: company.role || "",
          description: company.description || "", location: company.location || "",
          salary: company.salary || "", eligibility: company.eligibility || "",
          lastDateToApply: company.lastDateToApply ? company.lastDateToApply.split("T")[0] : "",
          website: company.website || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load company details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await API.put(`/companies/${id}`, formData);
      navigate("/admin/companies");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">Loading company details...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white max-w-2xl mx-auto rounded-xl shadow-lg p-5 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Edit Company</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Update the company details below</p>

        {error && (
          <p className="mt-4 text-center text-red-600 bg-red-50 border border-red-200 rounded-lg p-2 text-sm">
            {error}
          </p>
        )}

        <form className="mt-6 md:mt-8 space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"></textarea>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
            <input type="text" name="eligibility" value={formData.eligibility} onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Date to Apply</label>
              <input type="date" name="lastDateToApply" value={formData.lastDateToApply} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button type="button" onClick={() => navigate("/admin/companies")}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditCompany;