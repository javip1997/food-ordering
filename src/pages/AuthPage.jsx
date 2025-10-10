import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/authSlice";
import { saveProfile } from "../redux/profileSlice";
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
      dispatch(login(user));
      dispatch(saveProfile({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        location: user.location || "",
      }));
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
      dispatch(register(newUser));
      dispatch(saveProfile({
        name: newUser.name,
        email: newUser.email,
        phone: "",
        address: "",
        location: newUser.location,
      }));
      navigate("/");
    }
  };

  const inputClass = `px-4 py-3 rounded-lg border focus:outline-none focus:ring w-full ${
    dark
      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
      : "bg-white text-gray-800 border-gray-300 placeholder-gray-gray-500"
  }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative ${
        dark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl transition-colors duration-300 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Toggle */}
        <div className="flex justify-center mb-6 space-x-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`pb-2 font-semibold text-lg border-b-2 transition-colors duration-300 ${
              isLogin
                ? "border-blue-600 text-blue-600"
                : `border-transparent ${dark ? "text-gray-300" : "text-gray-500"}`
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`pb-2 font-semibold text-lg border-b-2 transition-colors duration-300 ${
              !isLogin
                ? "border-blue-600 text-blue-600"
                : `border-transparent ${dark ? "text-gray-300" : "text-gray-500"}`
            }`}
          >
            Register
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-center mb-4 animate-pulse">{error}</div>
        )}

        {/* Form */}
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
                placeholder="Location / Address"
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
            className="mt-4 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Footer text */}
        <p className="text-sm text-gray-500 text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
