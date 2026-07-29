import { Link } from "react-router-dom";

function CompanyCard({ company, role, packageName, companyData }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

      <h2 className="text-2xl font-bold">
        {company}
      </h2>

      <p className="text-gray-500 mt-2">
        {role}
      </p>

      <p className="text-green-600 font-semibold mt-2">
        {packageName}
      </p>

      <Link
        to="/student/company-details"
        state={{ company: companyData }}
        className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>

    </div>
  );
}

export default CompanyCard;