import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

function CompanyDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const company = location.state?.company;

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    setApplying(true);
    setError("");

    try {
      await API.post("/applications", { companyId: company._id });
      setApplied(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to apply. Try again."
      );
    } finally {
      setApplying(false);
    }
  };

  if (!company) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-slate-100 p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 text-center">
            <p className="text-gray-500">
              No company selected. Please go back and choose a company.
            </p>
            <button
              onClick={() => navigate("/student/companies")}
              className="mt-5 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700"
            >
              Back to Companies
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-slate-100 p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <h1 className="text-4xl font-bold text-blue-600">
            {company.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-gray-500">Role</p>
              <h2 className="font-semibold">{company.role}</h2>
            </div>

            <div>
              <p className="text-gray-500">Package</p>
              <h2 className="font-semibold text-green-600">
                {company.salary ? company.salary : "Not specified"}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Location</p>
              <h2 className="font-semibold">
                {company.location ? company.location : "Not specified"}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Eligibility</p>
              <h2 className="font-semibold">
                {company.eligibility ? company.eligibility : "Not specified"}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Last Date to Apply</p>
              <h2 className="font-semibold">
                {company.lastDateToApply
                  ? new Date(company.lastDateToApply).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "long", year: "numeric" }
                    )
                  : "Not specified"}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Website</p>
              <h2 className="font-semibold">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit site
                  </a>
                ) : (
                  "Not specified"
                )}
              </h2>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-3">Job Description</h2>
            <p className="text-gray-600">
              {company.description
                ? company.description
                : "No description provided."}
            </p>
          </div>

          {error && (
            <p className="mt-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </p>
          )}

          <button
            onClick={handleApply}
            disabled={applying || applied}
            className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {applied
              ? "✓ Applied"
              : applying
              ? "Applying..."
              : "Apply Now"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default CompanyDetails;