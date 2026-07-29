import { useEffect, useState } from "react";
import API from "../services/api";

function Stats() {
  const [companyCount, setCompanyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await API.get("/companies/public/count");
        setCompanyCount(res.data.count);
      } catch (err) {
        // fail silently on public page
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  const stats = [
    {
      number: loading ? "..." : `${companyCount}+`,
      title: "Companies Listed",
      emoji: "🏢",
    },
    {
      number: "Live",
      title: "Application Tracking",
      emoji: "📄",
    },
    {
      number: "Real-time",
      title: "Placement Updates",
      emoji: "📈",
    },
    {
      number: "Free",
      title: "For Students",
      emoji: "🎓",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <h2 className="text-4xl font-extrabold text-blue-600">
              {item.number}
            </h2>
            <p className="mt-2 text-gray-600 font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;