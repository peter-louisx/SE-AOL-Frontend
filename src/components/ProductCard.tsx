import React from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";

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
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  //turn product.rating from string to number
  const rating = parseFloat(product.rating);
  const inStock = true;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.product_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <button
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Handle wishlist logic here
            }}
          >
            <Heart
              size={18}
              className="text-gray-500 hover:text-red-500 transition-colors"
            />
          </button>
          {product.discount && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-gray-800 mb-1 truncate text-left">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < rating ? "text-yellow-400" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-bold text-[#4B6F44] text-lg">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 text-sm line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </Link>

        <button
          className="w-full bg-[#4B6F44] hover:bg-[#3d5a37] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors"
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault();
            // Handle add to cart logic here
          }}
        >
          <ShoppingBag size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
