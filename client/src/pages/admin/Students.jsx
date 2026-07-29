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
        setError(
          err.response?.data?.message || "Failed to load students."
        );
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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Students
          </h1>
          <p className="text-gray-500 mt-1">
            {students.length} registered student
            {students.length !== 1 ? "s" : ""}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2.5 w-72 outline-none focus:border-blue-600"
        />
      </div>

      {error && (
        <p className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="px-6 py-6 text-gray-500">Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="px-6 py-6 text-gray-500">No students found.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium">Branch</th>
                <th className="px-6 py-3 font-medium">Grad. Year</th>
                <th className="px-6 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {student.course || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {student.branch || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {student.graduationYear || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
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