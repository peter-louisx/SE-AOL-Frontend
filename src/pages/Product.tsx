import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LeafIcon, Star } from "lucide-react";
import axios from "../api/axios";
import { toast } from "react-toastify";

const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Skeleton */}
      <div>
        <div className="mb-4">
          <div className="w-full h-[450px] bg-gray-200 rounded-lg" />
        </div>
      </div>
      {/* Info Skeleton */}
      <div className="text-left">
        <div className="w-24 h-24 mb-4 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="flex items-center mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded mr-1" />
          <div className="h-5 w-10 bg-gray-200 rounded mr-1" />
          <div className="h-5 w-20 bg-gray-200 rounded mr-2" />
          <div className="h-5 w-6 bg-gray-200 rounded mx-2" />
          <div className="h-5 w-14 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-2 mb-4">
          <div className="bg-gray-200 h-7 w-24 rounded-full" />
          <div className="bg-gray-200 h-7 w-20 rounded-full" />
        </div>
        <div className="flex items-center mb-6">
          <div className="h-10 w-40 bg-gray-200 rounded" />
          <div className="ml-4 flex items-center px-5 py-2 rounded-xl bg-gray-200 w-48 h-10" />
        </div>
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-16 bg-gray-200 rounded" />
        </div>
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-16 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center border rounded-md">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="ml-4 h-10 w-10 bg-gray-200 rounded-tl-md rounded-bl-md" />
            <div className="h-10 w-12 bg-gray-200 border-x" />
            <div className="h-10 w-10 bg-gray-200 rounded-tr-md rounded-br-md" />
          </div>
          <div className="flex-1 bg-gray-200 h-10 rounded-md" />
        </div>
      </div>
    </div>
    {/* Reviews Skeleton */}
    <div className="mt-12">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
      {[1, 2].map((i) => (
        <div key={i} className="border-b pb-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center mb-2 gap-1">
            {[1, 2, 3, 4, 5].map((j) => (
              <div key={j} className="w-4 h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-4 w-full bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  </div>
);

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
  brand: {
    id: number;
    name: string;
    logo: string;
  };
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
  brand: {
    id: 1,
    name: "EcoCoconut",
    logo: "https://example.com/logo.png",
  },
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
      .then(() => {
        toast.success("Product added to cart successfully!");
        setQuantity(1); // Reset quantity after adding to cart
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
          brand: {
            id: data.brand?.id ?? dummyProduct.brand.id,
            name: data.brand?.name ?? dummyProduct.brand.name,
            logo: data.brand?.logo ?? dummyProduct.brand.logo,
          },
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
        <div className="w-full p-6">
          <ProductSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[450px] object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="text-left">
              <Link to={`/brand/${product.brand.id}`}>
                <img
                  src={product.brand.logo}
                  alt={product.brand.name}
                  className="w-24 h-24 mb-4"
                />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <Star
                  size={20}
                  className="text-[#609966] mr-1"
                  fill="#609966"
                />
                <span className="text-gray-800 font-semibold mr-1">
                  {product.rating}
                </span>
                <span className="text-gray-600 mr-2">
                  ({product.totalReviews} reviews)
                </span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-800">
                  {product.sold ?? 328} sold
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-[#609966] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Plastic-Free
                </span>
                <span className="bg-[#609966] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Organic
                </span>
              </div>

              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold text-black">
                  Rp {product.price.toLocaleString()}
                </div>
                <div className="ml-4 flex items-center px-5 py-2 rounded-xl bg-gradient-to-r from-[#609966] to-[#4A5A41]">
                  <LeafIcon size={20} className="text-white mr-2" />
                  <span className="text-white font-semibold text-lg">
                    50 GreenPoints
                  </span>
                </div>
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

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <div className="text-lg text-black text-bold">Quantity</div>
                  <button
                    className="ml-4 px-4 py-2 text-gray-600 hover:bg-gray-100 border rounded-tl-md rounded-bl-md"
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
                  className="flex-1 bg-[#609966] text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
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
