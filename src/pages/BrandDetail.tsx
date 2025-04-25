import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Leaf, Award, Users, Globe } from "lucide-react";
import ProductCard from "../components/ProductCard";

const BrandDetail: React.FC = () => {
  const { id } = useParams();
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
  // Mock brand data
  const brand = {
    id: parseInt(id || "1"),
    name: "Bambu",
    logo: "https://via.placeholder.com/150x50/4B6F44/FFFFFF?text=Bambu",
    coverImage:
      "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
    description:
      "Bambu creates thoughtfully designed, handcrafted home goods made from renewable materials. Our commitment to sustainable practices and fair trade partnerships ensures that every product tells a story of environmental responsibility and social impact.",
    founded: "2003",
    location: "Portland, Oregon",
    values: [
      {
        icon: <Leaf className="w-8 h-8 text-green-600" />,
        title: "Sustainable Materials",
        description:
          "All products made from renewable bamboo and organic materials",
      },
      {
        icon: <Award className="w-8 h-8 text-green-600" />,
        title: "Fair Trade Certified",
        description:
          "Supporting artisan communities with fair wages and safe working conditions",
      },
      {
        icon: <Users className="w-8 h-8 text-green-600" />,
        title: "Artisan Made",
        description:
          "Each piece handcrafted by skilled artisans using traditional techniques",
      },
      {
        icon: <Globe className="w-8 h-8 text-green-600" />,
        title: "Global Impact",
        description:
          "Contributing to environmental conservation and community development",
      },
    ],
    stats: [
      { label: "Products", value: "200+" },
      { label: "Artisans Supported", value: "1,000+" },
      { label: "Countries Reached", value: "25+" },
      { label: "Trees Planted", value: "50,000+" },
    ],
  };

  // Filter products for this brand (mock data)
  const brandProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${brand.coverImage})` }}
      >
        <div className="absolute inset-0 bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center text-left">
            <Link to="/" className="text-white mb-4 inline-flex items-center">
              <ArrowLeft className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
              {brand.name}
            </h1>
            <p className="text-white text-lg max-w-2xl">{brand.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Brand Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {brand.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-md"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Brand Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {brand.values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-black">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Products */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
