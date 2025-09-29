import React from 'react'

function ProductCard({ product }) {
  return (
      <div className="border rounded-xl p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <span className="block mt-1 font-bold">₹{product.price}</span>
    </div>
  )
}

export default ProductCard