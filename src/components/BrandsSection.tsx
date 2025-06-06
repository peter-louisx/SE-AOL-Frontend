import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface BrandsSectionProps {
  title: string;
  brands?: Brand[];
}

const SkeletonBrand = () => (
  <div className="flex items-center justify-center bg-white rounded-lg shadow-sm p-4 animate-pulse h-20">
    <div className="bg-gray-200 rounded w-24 h-8" />
  </div>
);

const BrandsSection: React.FC<BrandsSectionProps> = ({ title }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/brands");
        setBrands(response.data.slice(0, 5));
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            `Error fetching brands: ${
              error.response?.data.message || error.message
            }`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#2d4a29] mb-6">{title}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <SkeletonBrand key={idx} />
              ))
            : brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/brands/${brand.id}`}
                  className="flex items-center justify-center bg-white text-black rounded-lg shadow-sm hover:shadow-md p-4 transition-shadow"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className=" max-w-full opacity-80 hover:opacity-100 transition-opacity"
                  />
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
