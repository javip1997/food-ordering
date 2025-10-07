import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function AdminPanel() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>


     <div className="grid h-56 grid-cols-3 content-start gap-4 bg-blue-100 p-4 rounded-lg shadow-md">
        <div className="bg-white rounded-lg shadow p-4 text-center font-semibold">
          Total Products
          
          <p>
            50
          </p>

        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center font-semibold">
          Total Orders
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center font-semibold">
          Total Collection
        </div>
      </div>
    </div>
  )
}

export default AdminPanel