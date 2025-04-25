import React from "react";
import ProductCard, { Product } from "./ProductCard";
import { Clock } from "lucide-react";

interface DealSectionProps {
  title: string;
  subtitle: string;
  endTime: string;
  products: Product[];
}

const DealSection: React.FC<DealSectionProps> = ({
  title,
  subtitle,
  endTime,
  products,
}) => {
  const [timeLeft, setTimeLeft] = React.useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#e8f4e5] to-[#d1e6cd] rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#2d4a29] mb-1">
                {title}
              </h2>
              <p className="text-[#4B6F44]">{subtitle}</p>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <Clock size={20} className="text-[#4B6F44] mr-2" />
              <span className="font-medium mr-2">Ends in:</span>
              <div className="flex space-x-2">
                <div className="bg-[#4B6F44] text-white px-2 py-1 rounded">
                  {formatTime(timeLeft.hours)}
                </div>
                <span className="text-[#4B6F44]">:</span>
                <div className="bg-[#4B6F44] text-white px-2 py-1 rounded">
                  {formatTime(timeLeft.minutes)}
                </div>
                <span className="text-[#4B6F44]">:</span>
                <div className="bg-[#4B6F44] text-white px-2 py-1 rounded">
                  {formatTime(timeLeft.seconds)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="bg-[#4B6F44] hover:bg-[#3d5a37] text-white font-medium py-3 px-8 rounded-md transition-colors transform hover:scale-105 duration-300">
            View All Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealSection;
