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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = cart.reduce((a, b) => a + b.qty, 0);

  // Toggle body background based on theme
  useEffect(() => {
    document.body.classList.toggle("bg-gray-900", dark);
    document.body.classList.toggle("text-white", dark);
    document.body.classList.toggle("bg-white", !dark);
    document.body.classList.toggle("text-gray-900", !dark);
  }, [dark]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#profile-dropdown")) setShowProfile(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 shadow transition-colors duration-300 flex justify-between items-center px-4 py-3 ${
          dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Logo + Desktop Location */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`text-2xl font-bold ${dark ? "text-blue-400" : "text-blue-600"}`}
          >
            FoodieApp
          </Link>

          {/* Desktop location */}
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

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 items-center">
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

        {/* Right buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`px-3 py-1 rounded transition-colors duration-300 ${
              dark
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {/* Desktop Login/Profile */}
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="hidden sm:block px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Login / Register
            </button>
          ) : (
            <div id="profile-dropdown" className="relative hidden sm:block">
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
                      dark ? "hover:bg-gray-700 hover:text-white" : "hover:bg-gray-100"
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
                      dark ? "hover:bg-gray-700 hover:text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger for mobile */}
          <button
            className="sm:hidden px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            ☰
          </button>

          {/* Cart for desktop */}
          <div className="hidden sm:flex relative">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🛒 Cart
              {qty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {qty}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 sm:hidden bg-black bg-opacity-40"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 p-4 flex flex-col gap-4 shadow-lg transition-transform duration-300 ${
              dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Location */}
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded ${
                dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"></path>
              </svg>
              <div className="text-sm">{user?.location || "Search location"}</div>
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMobileMenu(false);
                }}
                className={`text-xs ml-2 ${dark ? "text-blue-400" : "text-blue-600"}`}
              >
                Change
              </button>
            </div>

            {/* Mobile Links */}
            <Link to="/" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/menu" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600">
              Menu
            </Link>
            <Link to="/about" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600">
              Contact
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`px-3 py-1 rounded mt-2 transition-colors duration-300 ${
                dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <button
                onClick={() => {
                  navigate("/auth");
                  setShowMobileMenu(false);
                }}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Login / Register
              </button>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setShowMobileMenu(false)}
                  className={`px-3 py-1 rounded hover:bg-gray-200 ${dark ? "hover:bg-gray-700" : ""}`}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(resetProfile());
                    setShowMobileMenu(false);
                    navigate("/");
                  }}
                  className={`px-3 py-1 rounded hover:bg-gray-200 ${dark ? "hover:bg-gray-700" : ""}`}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cart fixed at bottom for mobile */}
      <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
        >
          🛒 Cart
          {qty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {qty}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
