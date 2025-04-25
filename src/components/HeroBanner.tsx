import React from "react";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#e8f4e5] mb-8">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d4a29] mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-[#4B6F44] mb-8">
              {subtitle}
            </p>
            <button className="bg-[#4B6F44] hover:bg-[#3d5a37] text-white py-3 px-8 rounded-md font-medium transition-colors duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src={backgroundImage}
              alt="Spring Sale"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
