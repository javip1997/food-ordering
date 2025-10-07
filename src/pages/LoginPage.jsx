import { useState } from "react"
import { useDispatch } from "react-redux"
import { saveProfile } from "../redux/profileSlice"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Fake login: accept any non-empty creds
    if (!email || !password) return
    dispatch(saveProfile({ email, name: email.split("@")[0], phone: "", address: "" }))
    nav("/profile")
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="border p-2 rounded w-full mb-3" required/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 rounded w-full mb-3" required/>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}
