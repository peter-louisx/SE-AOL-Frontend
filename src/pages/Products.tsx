import React, { useEffect, useState } from "react";
import { Filter, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ProductCard, { Product } from "../components/ProductCard";
import axios from "../api/axios";

const ProductListing: React.FC = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSustainabilityOpen, setIsSustainabilityOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-black">
                  <Filter size={20} />
                  Filters
                </h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full font-medium mb-2 text-black"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Clothing and Apparel
                  {isCategoryOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {isCategoryOpen && (
                  <div className="space-y-2">
                    {[
                      "Clothing and Apparel",
                      "Accessories",
                      "Home & Living",
                      "Personal Care & Beauty",
                      "Zero-Waste Essentials",
                    ].map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sustainability Filter */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full font-medium mb-2 text-black"
                  onClick={() => setIsSustainabilityOpen(!isSustainabilityOpen)}
                >
                  Sustainability
                  {isSustainabilityOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {isSustainabilityOpen && (
                  <div className="space-y-2">
                    {["Plastic-Free", "Biodegradable", "Organic"].map(
                      (option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-black"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full font-medium mb-2 text-black"
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                >
                  Brand
                  {isBrandOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {isBrandOpen && (
                  <div className="space-y-2">
                    {[
                      "EcoVibe Collective",
                      "Etiko",
                      "Bodie",
                      "Bambu",
                      "Biome",
                    ].map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">9 result(s) found</div>
              <select className="border rounded-md px-3 py-1.5 text-sm">
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 text-center text-gray-500 py-12">
                  Loading products...{" "}
                  <Loader2 className="inline-block animate-spin" />
                </div>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500">
                  No products found.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 gap-2">
              <button className="px-3 py-1 rounded-md bg-green-100 text-green-800">
                &lt;
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded-md ${
                    page === 1 ? "bg-green-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 rounded-md bg-green-100 text-green-800">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
