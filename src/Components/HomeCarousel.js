import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://freshyfruits-backend.onrender.com";

const HomeCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/carousel`)
      .then((res) => setSlides(res.data))
      .catch((err) => console.log("Carousel Error:", err));
  }, []);

  if (slides.length === 0) return null;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="w-full h-[450px] bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${slides[current].image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-5 text-white text-4xl z-10"
      >
        ‹
      </button>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-xl px-4">
        <h1 className="text-4xl font-bold mb-3">
          {slides[current].title}
        </h1>

        <p className="mb-6 text-lg">
          {slides[current].desc}
        </p>

        <button
          onClick={() => navigate(slides[current].link)}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Explore Fruits
        </button>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-5 text-white text-4xl z-10"
      >
        ›
      </button>
    </div>
  );
};

export default HomeCarousel;