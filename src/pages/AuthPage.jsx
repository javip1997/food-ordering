import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/authSlice";
import { saveProfile } from "../redux/profileSlice"; // <-- import profile action
import { toggleTheme } from "../redux/themeSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dark = useSelector((state) => state.theme.dark);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const storedUsers = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    if (isLogin) {
      const user = storedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (!user) {
        setError("Invalid credentials. Please register first.");
        return;
      }

      // Update authSlice
      dispatch(login(user));

      // Update profileSlice
      dispatch(
        saveProfile({
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          address: user.address || "",
          location: user.location || "",
        })
      );

      navigate("/");
    } else {
      if (storedUsers.some((u) => u.email === formData.email)) {
        setError("User already exists. Please login.");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
      };

      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      // Update authSlice
      dispatch(register(newUser));

      // Update profileSlice
      dispatch(
        saveProfile({
          name: newUser.name,
          email: newUser.email,
          phone: "",
          address: "",
          location: newUser.location,
        })
      );

      navigate("/");
    }
  };

  const inputClass = `px-3 py-2 rounded border focus:outline-none focus:ring w-full ${
    dark
      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
      : "bg-white text-black border-gray-300 placeholder-gray-500"
  }`;

  const formBgClass = dark ? "bg-gray-800" : isLogin ? "bg-white" : "bg-blue-50";
  const pageBgClass = dark ? "bg-gray-900" : "bg-gray-100";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${pageBgClass}`}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`px-3 py-1 rounded shadow ${
            dark ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div
        className={`p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300 ${formBgClass}`}
      >
        {/* Login/Register Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-300 ${
              isLogin
                ? "border-blue-600 text-blue-600"
                : `border-transparent ${dark ? "text-gray-300" : "text-gray-600"}`
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-300 ${
              !isLogin
                ? "border-blue-600 text-blue-600"
                : `border-transparent ${dark ? "text-gray-300" : "text-gray-600"}`
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-3 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Address / Location"
                value={formData.location}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <button
            type="submit"
            className={`px-3 py-2 mt-2 rounded transition-colors duration-300 ${
              dark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
