import { FaUserGraduate, FaBuilding, FaClipboardList, FaChartLine, FaBell, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaUserGraduate size={30} />,
    title: "Student Dashboard",
    desc: "A centralized dashboard where students can track applications, view company details, and stay updated on placement drives in real time.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <FaBuilding size={30} />,
    title: "Company Management",
    desc: "Placement officers can add, edit, and manage recruiting companies, job openings, eligibility criteria, and hiring timelines with ease.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: <FaClipboardList size={30} />,
    title: "Application Tracking",
    desc: "Students can apply to companies directly through the platform and track the status of every application — applied, shortlisted, or selected.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: <FaChartLine size={30} />,
    title: "Placement Analytics",
    desc: "Get real-time statistics on placement rates, company-wise offers, and student participation to make data-driven decisions.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: <FaLock size={30} />,
    title: "Role-Based Access",
    desc: "Separate, secure dashboards for students, recruiters, and placement officers, each with permissions tailored to their role.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: <FaBell size={30} />,
    title: "Real-Time Notifications",
    desc: "Stay informed with instant updates on new job postings, application status changes, and upcoming placement events.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 py-20 px-6 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          Platform Features
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900">
          Everything You Need, <span className="text-blue-600">In One Place</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
          Built for students, recruiters, and placement officers — PlacePro
          brings the entire campus recruitment process onto one platform.
        </p>
      </div>

      {/* Feature grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${f.color}`}
              >
                {f.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-5">
                {f.title}
              </h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-white">
          Ready to get started?
        </h2>
        <p className="text-gray-400 mt-3 max-w-md mx-auto">
          Join PlacePro today and simplify your campus placement journey.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white text-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Features;