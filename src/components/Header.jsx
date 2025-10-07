import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const cart = useSelector((s) => s.cart.items)
  const profile = useSelector((s) => s.profile)
  const navigate = useNavigate()
  const qty = cart.reduce((a, b) => a + b.qty, 0)

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">FoodieApp</Link>
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"></path></svg>
            <div className="text-sm text-gray-700">{profile.location || "Search location"}</div>
            <button onClick={() => navigate("/profile")} className="text-xs text-blue-600 ml-3">Change</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link to="/menu" className="text-gray-700 hover:text-blue-600">Menu</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>

          {/* Login / Profile */}
          {!profile.loggedIn ? (
            <button onClick={() => navigate("/login")} className="px-3 py-1 bg-green-600 text-white rounded">Login</button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-700">
              <div>{profile.name || profile.email}</div>
            </div>
          )}

          {/* Cart button */}
          <button onClick={() => navigate("/cart")} className="relative flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded">
            <span>🛒</span>
            <span>Cart</span>
            {qty > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{qty}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
