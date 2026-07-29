import { FaBuilding, FaUserGraduate, FaClipboardList, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: <FaUserGraduate size={28} />,
      title: "Student Portal",
      description: "Manage profile, resume, and track your applications easily.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <FaBuilding size={28} />,
      title: "Company Listings",
      description: "Browse companies, eligibility criteria, and job openings.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <FaClipboardList size={28} />,
      title: "Application Tracking",
      description: "Track every application from applied to selected.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <FaChartLine size={28} />,
      title: "Analytics",
      description: "Placement statistics and insights for students and admins.",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Why Choose PlacePro?
          </h2>
          <p className="text-gray-600 mt-3 mb-12">
            Everything you need to manage campus placements in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${feature.color}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold mt-5 text-gray-900">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/features"
            className="inline-block bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore All Features →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Features;