import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard, { Product } from "../components/ProductCard";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type Brand = {
  id: number;
  name: string;
  description: string;
  logo: string;
  cover: string;
  products: Product[];
};

const Skeleton = () => (
  <div className="min-h-screen bg-white animate-pulse">
    <div className="px-10 py-8 pb-2">
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl mb-8" />
    </div>
    <div className="container mx-auto px-10 pb-8">
      <div className="flex flex-col mb-6">
        <div className="w-50 h-30 bg-gray-200 rounded mb-4" />
        <div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-black bg-gray-200 h-6 w-32 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-60 rounded" />
        ))}
      </div>
    </div>
  </div>
);

const BrandDetail: React.FC = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Brand>(`/brands/${id}`);
        setBrand(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to fetch brand details"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBrand();
    }
  }, [id]);

  if (loading) return <Skeleton />;
  if (!brand) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="px-10 py-8 pb-2">
        <img
          src={brand.cover}
          alt={`${brand.name} cover`}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
        />
      </div>
      <div className="container mx-auto px-10 pb-8">
        {/* Brand Logo and Description */}
        <div className="flex flex-col  mb-6">
          <img src={brand.logo} alt={brand.name} className="w-50 h-30 mr-4" />
          <div>
            <p className="text-gray-600">{brand.description}</p>
          </div>
        </div>
        {/* Products */}
        <h2 className="text-xl font-semibold mb-4 text-black">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brand.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
