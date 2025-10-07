import { useState } from "react"
import { products } from "../data/product"
import ProductCard from "../components/ProductCard"

export default function Menu() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const categories = ["All", ...new Set(products.map(p => p.category))]

  const filtered = products.filter(p => {
    const s = search.trim().toLowerCase()
    const okSearch = s === "" || p.name.toLowerCase().includes(s)
    const okCategory = category === "All" || p.category === category
    return okSearch && okCategory
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for dishes or restaurants" className="flex-1 border p-3 rounded"/>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border p-3 rounded">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
