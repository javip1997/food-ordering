import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import CartPage from "./pages/CartPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"
import LoginPage from "./pages/LoginPage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Register from "./pages/Register"
import AuthPage from "./pages/AuthPage"
import Header from "./components/Header"
import { useSelector } from "react-redux"


export default function App() {

  const { dark } = useSelector((s) => s.theme);

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen transition-colors duration-300`}>
     <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
