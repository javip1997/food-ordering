import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dark } = useSelector((state) => state.theme);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    alert("Profile updated successfully!");
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-6 rounded shadow transition-colors duration-300 ${
        dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={`px-3 py-2 rounded border focus:outline-none focus:ring w-full transition-colors duration-300 ${
            dark
              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400"
          }`}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`px-3 py-2 rounded border focus:outline-none focus:ring w-full transition-colors duration-300 ${
            dark
              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400"
          }`}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className={`px-3 py-2 rounded border focus:outline-none focus:ring w-full transition-colors duration-300 ${
            dark
              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400"
          }`}
        />

        <button
          type="submit"
          className={`px-3 py-2 rounded transition-colors duration-300 ${
            dark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
