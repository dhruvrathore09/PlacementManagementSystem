import { useEffect, useState } from "react";
import API from "../../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/users/students");
        setStudents(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Students</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            {students.length} registered student{students.length !== 1 ? "s" : ""}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2.5 w-full md:w-72 outline-none focus:border-blue-600"
        />
      </div>

      {error && (
        <p className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <p className="px-6 py-6 text-gray-500">Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="px-6 py-6 text-gray-500">No students found.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Name</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Email</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Course</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Branch</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Grad. Year</th>
                <th className="px-6 py-3 font-medium whitespace-nowrap">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{student.course || "—"}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{student.branch || "—"}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{student.graduationYear || "—"}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Students;