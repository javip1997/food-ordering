import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Header from "./components/Header"
import Login from "./pages/Login"
import AdminPanel from "./pages/AdminPanel"

export default function App() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  )
}
