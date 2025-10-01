import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("user")
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (username, password) => {

    if (username === "admin" && password === "1234") {
      const newUser = { username }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
