import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  sold?: number;
  stock?: number;
  description: string;
  rating: number;
  totalReviews: number;
  product_url?: string;
  features: string[];
  images: string[];
  reviews: Review[];
};

const dummyProduct: Product = {
  id: 1,
  name: "Coconut Bowl and Spoon",
  price: 50000,
  rating: 4.8,
  totalReviews: 128,
  description:
    "Eco-friendly Coconut Bowl and Wooden Spoon combo. Perfect for your healthy and sustainable eating. Made from 100% natural coconuts and sustainable wood. Each piece is unique and handcrafted.",
  features: [
    "Made from real coconut shells",
    "Handcrafted by artisans",
    "Food-safe coating",
    "Includes matching wooden spoon",
    "Perfect size for smoothie bowls and salads",
  ],
  images: [
    "https://images.pexels.com/photos/5825560/pexels-photo-5825560.jpeg",
    "https://images.pexels.com/photos/5825578/pexels-photo-5825578.jpeg",
    "https://images.pexels.com/photos/5825536/pexels-photo-5825536.jpeg",
  ],
  reviews: [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment:
        "Really nice coconut bowls! Perfect for smoothie bowls and soup! Love it. Plus I feel good knowing it uses family leftovers!",
      date: "2024-03-15",
    },
    {
      id: 2,
      user: "John D.",
      rating: 5,
      comment:
        "Great eco-friendly bowls! Perfect for smoothie bowls and soup! Love it. Plus I feel good knowing it uses family leftovers!",
      date: "2024-03-14",
    },
    {
      id: 3,
      user: "Emma W.",
      rating: 4,
      comment:
        "Beautiful bowls, just slightly smaller than expected but still perfect for most meals.",
      date: "2024-03-13",
    },
  ],
};

const Product: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>(
    dummyProduct.images[0]
  );

  const addToCart = async () => {
    await axios
      .post("/store-cart", {
        product_id: product?.id,
        quantity: quantity,
      })
      .catch(() => {
        toast.error("Failed to add product to cart. Please try again later.");
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/${id}`)
      .then((response) => {
        // If your API doesn't return all fields, fill with dummy data
        const data = response.data;
        setProduct({
          id: data.id ?? dummyProduct.id,
          name: data.name ?? dummyProduct.name,
          price: data.price ?? dummyProduct.price,
          rating: data.rating ?? dummyProduct.rating,
          totalReviews: data.totalReviews ?? dummyProduct.totalReviews,
          description: data.description ?? dummyProduct.description,
          features: data.features ?? dummyProduct.features,
          images: data.images ?? dummyProduct.images,
          reviews: data.reviews ?? dummyProduct.reviews,
        });

        if (data.product_url) {
          setSelectedImage([data.product_url, ...dummyProduct.images][0]);
        } else {
          setSelectedImage(data.images[0] || dummyProduct.images[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setProduct(dummyProduct);
        setSelectedImage(dummyProduct.images[0]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-700 text-lg">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="text-left  text-gray-600 hover:text-gray-800 mb-6"
        >
          <div className="flex items-center pb-5">
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative rounded-lg overflow-hidden ${
                      selectedImage === image ? "ring-2 ring-green-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={
                        index < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.totalReviews} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-6">
                Rp{product.price.toLocaleString()}
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-gray-800 mb-2">
                  Description
                </h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-gray-800 mb-2">Features</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 border rounded-tl-md rounded-bl-md"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x text-black border">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 border rounded-tr-md rounded-br-md"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="flex-1 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck size={20} />
                  <span>Free shipping on orders over Rp200.000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield size={20} />
                  <span>1 year warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 text-left">
                  <div className="flex items-center justify-between mb-2 text-black">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        {review.user.charAt(0)}
                      </div>
                      <span className="font-medium">{review.user}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
