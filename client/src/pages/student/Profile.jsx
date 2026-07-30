import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setProfile(res.data);
      setFormData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await API.put("/users/me", formData);
      setProfile(res.data);

      // Keep localStorage user in sync (e.g. name shown in sidebar/dashboard)
      const storedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, name: res.data.name })
      );

      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-slate-100 p-8 flex items-center justify-center">
          <p className="text-gray-500">Loading profile...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-slate-100 p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        {error && (
          <p className="max-w-3xl text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            {error}
          </p>
        )}

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 max-w-3xl">

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {profile?.name?.charAt(0).toUpperCase() || "S"}
            </div>

            <div>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="text-2xl font-bold border rounded-lg px-3 py-1.5 outline-none focus:border-blue-600"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile?.name}</h2>
              )}
              <p className="text-gray-500 mt-1">{profile?.email}</p>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="mt-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Course
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course || ""}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech"
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch || ""}
                    onChange={handleChange}
                    placeholder="e.g. CSBS"
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear || ""}
                    onChange={handleChange}
                    placeholder="e.g. 2027"
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    value={formData.cgpa || ""}
                    onChange={handleChange}
                    placeholder="e.g. 8.2"
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-500 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills || ""}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-500 mb-1">
                    Resume Link
                  </label>
                  <input
                    type="url"
                    name="resume"
                    value={formData.resume || ""}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(profile);
                    setEditing(false);
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div>
                  <p className="text-gray-500">Course</p>
                  <h3 className="font-semibold">
                    {profile?.course || "Not added"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">Branch</p>
                  <h3 className="font-semibold">
                    {profile?.branch || "Not added"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">Graduation Year</p>
                  <h3 className="font-semibold">
                    {profile?.graduationYear || "Not added"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">CGPA</p>
                  <h3 className="font-semibold">
                    {profile?.cgpa || "Not added"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">Skills</p>
                  <h3 className="font-semibold">
                    {profile?.skills || "Not added"}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">Resume</p>
                  <h3 className="font-semibold text-blue-600">
                    {profile?.resume ? (
                      <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "Not added"
                    )}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;