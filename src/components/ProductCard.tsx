import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  product_url: string;
  rating: string;
  reviews: number;
  inStock: boolean;
  discount?: number;
  tags?: string[]; // e.g. ["Plastic-Free", "Organic"]
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const rating = parseFloat(product.rating);
  //mathrandom a review from 100 - 300
  product.reviews = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

  // Format number with dots for thousands (Indonesian style)
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const navigate = useNavigate();

  return (
    <div
      className="bg-[#F4F8E8] rounded-xl shadow border border-[#E3E8D9] overflow-hidden flex flex-col relative cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="pb-0 flex flex-col items-center">
        <img
          src={product.product_url}
          alt={product.name}
          className="w-full h-40 object-cover mb-2"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between p-4 pt-2">
        {/* Tags */}
        <div className="flex gap-2 mb-2">
          {(product.tags || ["Plastic-Free", "Organic"]).map((tag) => (
            <span
              key={tag}
              className="bg-[#D1E7C6] text-[#4B6F44] text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Name */}
        <h3 className="font-bold text-lg text-[#222] mb-1">{product.name}</h3>
        {/* Price */}
        <div className="mb-2">
          <span className="font-bold text-[#4B6F44] text-xl">
            Rp{formatNumber(product.price)}
          </span>
        </div>
        {/* Rating and sold */}
        <div className="flex items-center text-sm text-[#4B6F44] mb-3">
          <span className="flex items-center mr-1">
            <svg
              width="16"
              height="16"
              fill="currentColor"
              className="text-[#4B6F44] mr-1"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
            {rating.toFixed(1)}
          </span>
          <span className="text-gray-500 ml-1">| {product.reviews} sold</span>
        </div>
        {/* Add to cart button */}
        <button
          className="w-full bg-[#4B6F44] hover:bg-[#3d5a37] text-white py-2 rounded-full flex items-center justify-center text-base font-semibold transition-colors"
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle add to cart logic here
          }}
        >
          <ShoppingBag size={18} className="mr-2" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
