import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import RewardsSection from "../components/RewardsSelection";
import BrandsSection from "../components/BrandsSection";
import DealSection from "../components/DealSection";

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

  const products = [
    {
      id: 1,
      name: "Round Teak Wood Candle Holder",
      price: 24.99,
      originalPrice: 34.99,
      image:
        "https://images.pexels.com/photos/4992490/pexels-photo-4992490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.5,
      reviews: 28,
      inStock: true,
      discount: 30,
    },
    {
      id: 2,
      name: "Natural Wood Serving Bowl",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.8,
      reviews: 42,
      inStock: true,
      discount: 25,
    },
    {
      id: 3,
      name: "Bamboo Utensil Set",
      price: 19.99,
      originalPrice: 24.99,
      image:
        "https://images.pexels.com/photos/5824922/pexels-photo-5824922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.2,
      reviews: 16,
      inStock: true,
      discount: 20,
    },
    {
      id: 4,
      name: "Recycled Glass Planter",
      price: 34.99,
      originalPrice: 44.99,
      image:
        "https://images.pexels.com/photos/5825561/pexels-photo-5825561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.7,
      reviews: 31,
      inStock: true,
      discount: 22,
    },
    {
      id: 5,
      name: "Wooden Wall Art",
      price: 49.99,
      originalPrice: 69.99,
      image:
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.9,
      reviews: 64,
      inStock: true,
      discount: 30,
    },
  ];
  const bestSellers = [
    {
      id: 6,
      name: "Rustic Wooden Coasters (Set of 4)",
      price: 16.99,
      image:
        "https://images.pexels.com/photos/5825560/pexels-photo-5825560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.6,
      reviews: 53,
      inStock: true,
    },
    {
      id: 7,
      name: "Acacia Wood Cutting Board",
      price: 29.99,
      image:
        "https://images.pexels.com/photos/4226888/pexels-photo-4226888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.8,
      reviews: 72,
      inStock: true,
    },
    {
      id: 8,
      name: "Macramé Plant Hanger",
      price: 22.99,
      image:
        "https://images.pexels.com/photos/4507005/pexels-photo-4507005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.4,
      reviews: 38,
      inStock: true,
    },
    {
      id: 9,
      name: "Wooden Photo Frame",
      price: 18.99,
      image:
        "https://images.pexels.com/photos/593035/pexels-photo-593035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.5,
      reviews: 41,
      inStock: true,
    },
    {
      id: 10,
      name: "Ceramic Succulent Planter",
      price: 14.99,
      image:
        "https://images.pexels.com/photos/1701535/pexels-photo-1701535.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.7,
      reviews: 64,
      inStock: true,
    },
  ];

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

  const todaysDeals = [
    {
      id: 11,
      name: "Wooden Storage Box",
      price: 27.99,
      originalPrice: 39.99,
      image:
        "https://images.pexels.com/photos/5825536/pexels-photo-5825536.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.3,
      reviews: 19,
      inStock: true,
      discount: 30,
    },
    {
      id: 12,
      name: "Reclaimed Wood Shelf",
      price: 32.99,
      originalPrice: 49.99,
      image:
        "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.6,
      reviews: 24,
      inStock: true,
      discount: 35,
    },
    {
      id: 13,
      name: "Glass Terrarium",
      price: 19.99,
      originalPrice: 29.99,
      image:
        "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.4,
      reviews: 27,
      inStock: true,
      discount: 35,
    },
    {
      id: 14,
      name: "Organic Cotton Throw Pillow",
      price: 22.99,
      originalPrice: 34.99,
      image:
        "https://images.pexels.com/photos/5824893/pexels-photo-5824893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.5,
      reviews: 31,
      inStock: true,
      discount: 35,
    },
    {
      id: 15,
      name: "Wooden Wall Clock",
      price: 39.99,
      originalPrice: 59.99,
      image:
        "https://images.pexels.com/photos/3699434/pexels-photo-3699434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      rating: 4.8,
      reviews: 42,
      inStock: true,
      discount: 35,
    },
  ];

  return (
    <main className="flex-grow">
      <HeroBanner
        title="SPRING SALE"
        subtitle="20% OFF EVERYTHING IN THE STORE"
        backgroundImage="https://images.pexels.com/photos/1470168/pexels-photo-1470168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
      <CategoryGrid title="Shop Our Top Categories" categories={categories} />
      <ProductGrid
        title="Explore Our Latest Arrivals"
        products={products}
        viewAllLink="/products"
      />
      <RewardsSection />
      <ProductGrid
        title="Best Sellers of All Time"
        products={bestSellers}
        viewAllLink="/products"
      />
      <BrandsSection title="Find Your Favorite Brands" brands={brands} />
      <DealSection
        title="Today's Best Deals For You"
        subtitle="Limited time offers - Shop now before they're gone!"
        endTime={endTime.toISOString()}
        products={todaysDeals}
      />
    </main>
  );
}
