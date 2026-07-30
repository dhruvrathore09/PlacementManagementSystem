import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AddCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", role: "", description: "", location: "",
    salary: "", eligibility: "", lastDateToApply: "", website: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/companies", formData);
      navigate("/admin/companies");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white max-w-2xl mx-auto rounded-xl shadow-lg p-5 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Add Company</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Fill in the details to list a new company for placements
        </p>

        {error && (
          <p className="mt-4 text-center text-red-600 bg-red-50 border border-red-200 rounded-lg p-2 text-sm">
            {error}
          </p>
        )}

        <form className="mt-6 md:mt-8 space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" name="name" placeholder="e.g. Google" value={formData.name} onChange={handleChange} required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
            <input type="text" name="role" placeholder="e.g. Software Engineer" value={formData.role} onChange={handleChange} required
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="4" placeholder="Brief job description" value={formData.description} onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"></textarea>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" name="location" placeholder="e.g. Bangalore" value={formData.location} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input type="text" name="salary" placeholder="e.g. 12 LPA" value={formData.salary} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
            <input type="text" name="eligibility" placeholder="e.g. CGPA 7+, No backlogs" value={formData.eligibility} onChange={handleChange}
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
              <input type="url" name="website" placeholder="https://..." value={formData.website} onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Adding Company..." : "Add Company"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddCompany;