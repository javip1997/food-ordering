import { products } from "../data/product";
import CategoryChip from "../components/CategoryChip";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuPreview({ limit = 999, showCategoriesOnly = false }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = products
    .filter(p => category === "All" || p.category === category)
    .slice(0, limit);

  if (showCategoriesOnly) {
    return (
      <div className="flex items-center gap-3 overflow-x-auto py-2 px-4 scrollbar-hide">
        {categories.map(c => (
          <CategoryChip
            key={c}
            name={c}
            active={c === category}
            onClick={setCategory}
          />
        ))}
        <Link
          to="/menu"
          className="ml-4 text-blue-600 font-medium whitespace-nowrap hover:underline"
        >
          See all
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Categories filter chips */}
      <div className="flex gap-3 mb-6 overflow-x-auto py-2 scrollbar-hide">
        {categories.map(c => (
          <CategoryChip
            key={c}
            name={c}
            active={c === category}
            onClick={setCategory}
          />
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
        {filtered.length > 0 ? (
          filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              className="transition-transform hover:scale-105 hover:shadow-xl"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No items found.
          </p>
        )}
      </div>
    </div>
  );
}
