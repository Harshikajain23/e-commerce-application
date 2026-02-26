import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? formData : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update current session user
    localStorage.setItem(
      "session",
      JSON.stringify({
        user: formData,
        expiresAt: Date.now() + 5 * 60 * 1000,
      })
    );

    setUser(formData);
    setMessage("Profile updated successfully ");
  };

  return (
    <>
     

      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            My Profile
          </h1>

          {message && (
            <p className="text-green-400 text-sm mb-4 text-center">
              {message}
            </p>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full bg-gray-800 p-3 rounded-lg outline-none"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-gray-800 p-3 rounded-lg outline-none"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-800 p-3 rounded-lg outline-none"
            />

            <button
              onClick={handleSave}
              className="w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-500 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;