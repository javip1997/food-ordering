import { products } from "../data/product"
import CategoryChip from "../components/CategoryChip"
import ProductCard from "../components/ProductCard"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function MenuPreview({ limit = 999, showCategoriesOnly = false }) {
  const [category, setCategory] = useState("All")
  const categories = ["All", ...new Set(products.map(p => p.category))]
  const filtered = products.filter(p => (category === "All" ? true : p.category === category)).slice(0, limit)

  if (showCategoriesOnly) {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {categories.map(c => <CategoryChip key={c} name={c} active={c===category} onClick={setCategory} />)}
        <Link to="/menu" className="ml-4 text-blue-600 font-medium">See all</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-3 mb-4 overflow-x-auto">
        {categories.map(c => <CategoryChip key={c} name={c} active={c===category} onClick={setCategory} />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
