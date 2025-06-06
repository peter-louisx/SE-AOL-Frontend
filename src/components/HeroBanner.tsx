import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import React, { useState } from "react";

const images = [
  "Landing/3.png",
  "Landing/1.jpg",
  "Landing/2.jpg",
  "Landing/4.jpg",
];

const HeroBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden bg-[#e8f4e5] mb-8 w-full">
      <div className="w-full py-10 px-8">
        <div className="flex justify-center">
          <div className="w-full relative max-w-[1400px] h-[500px]">
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              style={{ maxWidth: "1400px", maxHeight: "500px" }}
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
              aria-label="Previous Slide"
            >
              <MoveLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
              aria-label="Next Slide"
            >
              <MoveRightIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${
                    current === idx ? "bg-[#4B6F44]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
