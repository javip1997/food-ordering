import React, { useState, useEffect } from 'react'

function HeroSlider() {

const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])


const slides = [
  "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1672242676674-f4349cc6470e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg mb-6">
      <img src={slides[index]} alt="cover" className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider