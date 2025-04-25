import React from "react";
import { Link } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface BrandsSectionProps {
  title: string;
  brands: Brand[];
}

const BrandsSection: React.FC<BrandsSectionProps> = ({ title, brands }) => {
  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#2d4a29] mb-6">{title}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.id}`}
              className="flex items-center justify-center bg-white text-black rounded-lg shadow-sm hover:shadow-md p-4 transition-shadow"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 max-w-full opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
