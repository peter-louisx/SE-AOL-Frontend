import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import RewardsSection from "../components/RewardsSelection";
import BrandsSection from "../components/BrandsSection";
import DealSection from "../components/DealSection";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Product } from "../components/ProductCard";

const brands = [
  {
    id: 1,
    name: "Green Premium",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Green+Premium",
  },
  {
    id: 2,
    name: "Wood Avenue",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Wood+Avenue",
  },
  {
    id: 3,
    name: "Eco Designs",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Eco+Designs",
  },
  {
    id: 4,
    name: "Natural Habitat",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Natural+Habitat",
  },
  {
    id: 5,
    name: "Elemental",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Elemental",
  },
  {
    id: 6,
    name: "Terra Nova",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Terra+Nova",
  },
];

export default function Landing() {
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 1);
  endTime.setHours(23, 59, 59, 0);
  const categories = [
    {
      id: 1,
      name: "Wooden Decor",
      image:
        "https://images.pexels.com/photos/4992458/pexels-photo-4992458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 2,
      name: "Plants & Planters",
      image:
        "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 3,
      name: "Eco-Friendly",
      image:
        "https://images.pexels.com/photos/5748205/pexels-photo-5748205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 4,
      name: "Candles & Scents",
      image:
        "https://images.pexels.com/photos/4992461/pexels-photo-4992461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 5,
      name: "Kitchen & Dining",
      image:
        "https://images.pexels.com/photos/5825578/pexels-photo-5825578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
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
      <HeroBanner
        title="SPRING SALE"
        subtitle="20% OFF EVERYTHING IN THE STORE"
        backgroundImage="https://images.pexels.com/photos/1470168/pexels-photo-1470168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
      <CategoryGrid title="Shop Our Top Categories" categories={categories} />
      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-lg text-gray-500">Loading products...</span>
        </div>
      ) : (
        <ProductGrid
          title="Explore Our Latest Arrivals"
          products={[...products].sort(() => Math.random() - 0.5).slice(0, 5)}
          viewAllLink="/products"
        />
      )}
      <RewardsSection />

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-lg text-gray-500">Loading products...</span>
        </div>
      ) : (
        <ProductGrid
          title="Best Sellers of All Time"
          products={[...products].sort(() => Math.random() - 0.5).slice(0, 5)}
          viewAllLink="/products"
        />
      )}
      <BrandsSection title="Find Your Favorite Brands" brands={brands} />

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="text-lg text-gray-500">Loading products...</span>
        </div>
      ) : (
        <DealSection
          title="Today's Best Deals For You"
          subtitle="Limited time offers - Shop now before they're gone!"
          endTime={endTime.toISOString()}
          products={[...products].sort(() => Math.random() - 0.5).slice(0, 5)}
        />
      )}
    </main>
  );
}
