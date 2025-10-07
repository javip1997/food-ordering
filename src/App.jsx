import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import CartPage from "./pages/CartPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"
import LoginPage from "./pages/LoginPage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Header from "./components/Header"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}
