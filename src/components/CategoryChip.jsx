import React from 'react'

function CategoryChip({ name, active, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className={`px-4 py-2 rounded-full border ${active ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
    >
      {name}
    </button>
  )
}

export default CategoryChip