import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CompanyCard from "../../components/CompanyCard";
import API from "../../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-slate-100 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Available Companies
        </h1>

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 p-3 border rounded-lg mb-8"
        />

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500">Loading companies...</p>
        ) : filteredCompanies.length === 0 ? (
          <p className="text-gray-500">No companies found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company._id}
                company={company.name}
                role={company.role}
                packageName={company.salary}
                companyData={company}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Companies;