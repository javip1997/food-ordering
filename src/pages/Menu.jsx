import { React ,useState } from "react"
import { products } from "../data/product"
import ProductCard from "../components/ProductCard"

function Menu() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    
  const categories = ["All", ...new Set(products.map(p => p.category))];
  
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || p.category === category
    return matchesSearch && matchesCategory
  })

   return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

    
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

export default Menu