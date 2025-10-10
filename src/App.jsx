import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

export default function App() {
  const { dark } = useSelector((s) => s.theme);

  return (
    <div className={`min-h-screen flex flex-col ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-300`}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Scrollable Content */}
      <main className="flex-1 pt-20 pb-24 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

   
        <Footer />
  
    </div>
  );
}
