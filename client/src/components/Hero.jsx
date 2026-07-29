import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center relative z-10">

        {/* Left Section */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            🎓 Trusted by 100+ Colleges
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span> with Ease
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            A complete Placement Management System connecting students,
            recruiters, and placement officers on one platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25"
            >
              Get Started
            </Link>

            <Link
              to="/features"
              className="border-2 border-blue-600 text-blue-600 px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <span>✓ Free for students</span>
            <span>✓ No credit card required</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700"
            alt="Students"
            className="rounded-2xl shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;