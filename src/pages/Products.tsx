import React, { useEffect, useState } from "react";
import { Filter, ChevronDown, ChevronUp, Search } from "lucide-react";
import ProductCard, { Product } from "../components/ProductCard";
import axios from "../api/axios";

const CATEGORY_OPTIONS = [
  "Clothing and Apparel",
  "Accessories",
  "Home and Living",
  "Personal Care and Beauty",
  "Zero-Waste Essentials",
];
const SUSTAINABILITY_OPTIONS = ["Plastic-Free", "Biodegradable", "Organic"];
const BRAND_OPTIONS = [
  "EcoVibe Collective",
  "Etiko",
  "Bodie",
  "Bambu",
  "Biome",
];

const ProductListing: React.FC = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSustainabilityOpen, setIsSustainabilityOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  // Get search params from URL
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  );
  const [selectedSustainability, setSelectedSustainability] = useState<
    string[]
  >(searchParams.getAll("sustainability"));
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.getAll("brand")
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Search bar state
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("search") || ""
  );

  const updateParams = (search: string) => {
    const params = new URLSearchParams();

    selectedCategories.forEach((cat) => params.append("category", cat));
    selectedSustainability.forEach((sus) =>
      params.append("sustainability", sus)
    );
    selectedBrands.forEach((brand) => params.append("brand", brand));
    if (search.trim()) {
      params.set("search", search.trim());
    }

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setSearchParams(new URLSearchParams(params));
  };

  // Update URL params when filters or search change
  useEffect(() => {
    updateParams(searchInput);
  }, [selectedCategories, selectedSustainability, selectedBrands]);

  // Fetch products when searchParams change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/products", {
          params: {
            category: searchParams.getAll("category"),
            sustainability: searchParams.getAll("sustainability"),
            brand: searchParams.getAll("brand"),
            search: searchParams.get("search") || undefined,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Handlers for filter changes
  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Handler for search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchInput(searchInput.trim());
    updateParams(searchInput.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex items-center max-w-xl mx-auto">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 text-sm focus:outline-none text-black"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            className="bg-[#609966] hover:bg-green-700 text-white px-4 py-2 rounded-r-md flex items-center"
            aria-label="Search"
            onClick={handleSearchSubmit}
          >
            <Search size={18} />
          </button>
        </div>
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
                    {CATEGORY_OPTIONS.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 accent-[#609966]"
                          checked={selectedCategories.includes(category)}
                          onChange={() =>
                            handleCheckboxChange(
                              category,
                              selectedCategories,
                              setSelectedCategories
                            )
                          }
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
                    {SUSTAINABILITY_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedSustainability.includes(option)}
                          onChange={() =>
                            handleCheckboxChange(
                              option,
                              selectedSustainability,
                              setSelectedSustainability
                            )
                          }
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
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
                    {BRAND_OPTIONS.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedBrands.includes(brand)}
                          onChange={() =>
                            handleCheckboxChange(
                              brand,
                              selectedBrands,
                              setSelectedBrands
                            )
                          }
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
              <div className="text-sm text-gray-600">
                {products.length} result(s) found
              </div>
              <select className="border rounded-md px-3 py-1.5 text-sm">
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg shadow p-4 animate-pulse flex flex-col gap-4"
                    >
                      <div className="h-40 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
                    </div>
                  ))}
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
