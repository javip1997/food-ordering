import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveProfile, setLocation } from "../redux/profileSlice"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const profile = useSelector(s => s.profile)
  const [name, setName] = useState(profile.name || "")
  const [email, setEmail] = useState(profile.email || "")
  const [phone, setPhone] = useState(profile.phone || "")
  const [address, setAddress] = useState(profile.address || "")
  const [location, setLocationLocal] = useState(profile.location || "")
  const dispatch = useDispatch()
  const nav = useNavigate()

  useEffect(()=> {
    setName(profile.name || "")
    setEmail(profile.email || "")
    setPhone(profile.phone || "")
    setAddress(profile.address || "")
    setLocationLocal(profile.location || "")
  }, [profile])

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(saveProfile({ name, email, phone, address, location }))
    nav("/checkout")
  }

  const handleLocationSearch = () => {
    dispatch(setLocation(location))
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile & Delivery</h1>

      <form onSubmit={handleSave} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="border p-3 rounded w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="border p-3 rounded w-full" type="email" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="border p-3 rounded w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery address</label>
          <textarea value={address} onChange={e=>setAddress(e.target.value)} className="border p-3 rounded w-full" rows="3" required/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location (search)</label>
          <div className="flex gap-2">
            <input value={location} onChange={e=>setLocationLocal(e.target.value)} className="border p-3 rounded flex-1" placeholder="Enter city or area"/>
            <button type="button" onClick={handleLocationSearch} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Saved location: <strong>{profile.location}</strong></p>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded">Save & Continue</button>
      </form>
    </div>
  )
}
