import { useState } from "react";
import { products } from "../data/product";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const s = search.trim().toLowerCase();
    const okSearch = s === "" || p.name.toLowerCase().includes(s);
    const okCategory = category === "All" || p.category === category;
    return okSearch && okCategory;
  });

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6 px-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for dishes or restaurants"
          className="flex-1 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition"
        />
      </div>

      {/* Category Chips */}
      <div className="flex gap-3 mb-6 overflow-x-auto py-2 px-4">
        {categories.map((c) => (
          <CategoryChip
            key={c}
            name={c}
            active={c === category}
            onClick={setCategory}
          />
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              className="transition-transform hover:scale-105 hover:shadow-xl"
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
