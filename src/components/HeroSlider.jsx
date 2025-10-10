import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Delicious Meals Delivered",
    subtitle: "Fresh & Tasty Food, Right at Your Doorstep",
    buttonText: "Order Now",
    position: "left",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1672242676674-f4349cc6470e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Explore Our Menu",
    subtitle: "Choose from a wide variety of delicious dishes",
    buttonText: "View Menu",
    position: "right",
  },
];

function HeroSlider() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function redirectToMenu(){
      navigate("/menu");
  }

  const currentSlide = slides[index];

  return (
    <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
      {/* Slide Image */}
      <img
        src={currentSlide.image}
        alt={`slide-${index}`}
        className="w-full h-full object-cover block"
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 ${
          currentSlide.position === "left"
            ? "bg-gradient-to-r from-black/60 to-transparent"
            : "bg-gradient-to-r from-transparent to-black/60"
        }`}
      ></div>

      {/* Text Overlay */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 text-white max-w-md space-y-3 ${
          currentSlide.position === "left" ? "left-6 md:left-16 text-left" : "right-6 md:right-16 text-right"
        }`}
      >
        <h2 className="text-xl md:text-4xl font-bold">{currentSlide.title}</h2>
        <p className="text-sm md:text-lg">{currentSlide.subtitle}</p>
        <button className="mt-2 px-5 py-3 bg-orange-500 rounded-md hover:bg-orange-600 transition-colors font-semibold"  onClick={() => redirectToMenu(true)}>
          {currentSlide.buttonText}
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === index ? "bg-white w-4 h-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
