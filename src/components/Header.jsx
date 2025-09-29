import React from 'react'
import { Link } from "react-router-dom"

function Header() {
   return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">FoodOrder</Link>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  )
}

export default Header