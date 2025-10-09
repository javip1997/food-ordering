import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { resetProfile } from "../redux/profileSlice";
import { toggleTheme } from "../redux/themeSlice";

export default function Header() {
  const cart = useSelector((s) => s.cart.items);
  const { user } = useSelector((s) => s.auth);
  const { dark } = useSelector((s) => s.theme);

  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = cart.reduce((a, b) => a + b.qty, 0);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-gray-900");
    } else {
      document.body.classList.add("bg-white", "text-gray-900");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [dark]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#profile-dropdown")) setShowProfile(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 shadow transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`text-2xl font-bold ${
              dark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            FoodieApp
          </Link>

          <div
            className={`hidden sm:flex items-center gap-2 ${
              dark ? "bg-gray-800" : "bg-gray-100"
            } rounded-full px-3 py-1`}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"></path>
            </svg>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {user?.location || "Search location"}
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="text-xs text-blue-600 dark:text-blue-400 ml-3"
            >
              Change
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/menu" className="hover:text-blue-600 dark:hover:text-blue-400">
              Menu
            </Link>
            <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </nav>

          <button
            onClick={() => dispatch(toggleTheme())}
            className={`px-3 py-1 rounded transition-colors duration-300 ${
              dark
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Toggle Theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Login / Register
            </button>
          ) : (
            <div id="profile-dropdown" className="relative">
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className={`px-3 py-1 rounded ${
                  dark
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {user.name || user.email}
              </button>

              {showProfile && (
                <div
                  className={`absolute right-0 mt-2 w-44 rounded shadow-lg border transition-colors duration-300 ${
                    dark
                      ? "bg-gray-800 border-gray-700 text-gray-200"
                      : "bg-white border-gray-200 text-gray-800"
                  }`}
                >
                  <Link
                    to="/profile"
                    onClick={() => setShowProfile(false)}
                    className={`block px-4 py-2 text-sm ${
                      dark
                        ? "hover:bg-gray-700 hover:text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      dispatch(resetProfile()); 
                      setShowProfile(false);
                      navigate("/");
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      dark
                        ? "hover:bg-gray-700 hover:text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <span>🛒</span>
            <span>Cart</span>
            {qty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {qty}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
