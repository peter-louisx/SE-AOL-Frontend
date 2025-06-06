import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import RewardsSection from "../components/RewardsSelection";
import BrandsSection from "../components/BrandsSection";
import DealSection from "../components/DealSection";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Product } from "../components/ProductCard";

// Skeleton loader for product grid
function ProductGridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-6 h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col space-y-3 bg-white p-4 rounded shadow animate-pulse"
          >
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const categories = [
    {
      id: 1,
      name: "Clothing & Apparel",
      image: "/Categories/clothing.jpg",
    },
    {
      id: 2,
      name: "Accessories",
      image: "/Categories/accessories.jpg",
    },
    {
      id: 3,
      name: "Home & Living",
      image: "/Categories/home.jpg",
    },
    {
      id: 4,
      name: "Personal Care & Beauty",
      image: "/Categories/personal.jpg",
    },
    {
      id: 5,
      name: "Zero-Waste Essentials",
      image: "/Categories/zero.jpg",
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [limited, setLimited] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/products");
        const data = response.data;
        setProducts(data);
        setBestSellers(data.sort(() => Math.random() - 0.5).slice(0, 5));
        setLimited(data.sort(() => Math.random() - 0.5).slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex-grow">
      <HeroBanner />
      <CategoryGrid title="Shop Our Top Categories" categories={categories} />
      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid
          title="Explore Our Latest Arrivals"
          products={products.slice(0, 5)}
          viewAllLink="/products"
        />
      )}

      <div className="px-4">
        <RewardsSection />
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid
          title="Best Sellers of All Time"
          products={bestSellers}
          viewAllLink="/products"
        />
      )}
      <BrandsSection title="Find Your Favorite Brands" />

      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <DealSection
          title="Today's Best Deals For You"
          subtitle="Limited time offers - Shop now before they're gone!"
          products={limited}
        />
      )}
    </main>
  );
}
