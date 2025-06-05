import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Plus, Search, Edit, Trash2, Tag, ArrowUpDown } from "lucide-react";
import EditProductModal from "../../components/seller/EditProductModal";
import AddProductModal from "../../components/seller/AddProductModal";
import { Product } from "../../types";

type SortField = "name" | "category" | "price" | "stock";
type SortOrder = "asc" | "desc";

const SProducts: React.FC = () => {
  const { products, updateProduct, deleteProduct, addProduct } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedProducts = [...products]
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;

      switch (sortField) {
        case "name":
          return multiplier * a.name.localeCompare(b.name);
        case "category":
          return multiplier * a.category.localeCompare(b.category);
        case "price":
          return multiplier * (a.price - b.price);
        case "stock":
          return multiplier * (a.stock - b.stock);
        default:
          return 0;
      }
    });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    addProduct({ ...productData, id: crypto.randomUUID() });
  };

  const SortableHeader: React.FC<{
    field: SortField;
    label: string;
  }> = ({ field, label }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown
          size={14}
          className={`transition-colors ${
            sortField === field
              ? "text-[#3B5249]"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        />
      </div>
    </th>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto text-black">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#40513B] focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-[#609966] hover:bg-[#40513B] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">
            No products found. Add your first product now!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <SortableHeader field="name" label="Product" />
                  <SortableHeader field="category" label="Category" />
                  <SortableHeader field="price" label="Price" />
                  <SortableHeader field="stock" label="Stock" />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sustainability
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="truncate max-w-[200px]">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex flex-wrap gap-1">
                        {product.sustainabilityLabels.map((label, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#EDF1D6] text-[#3B5249]"
                          >
                            <Tag size={12} className="mr-1 flex-shrink-0" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}

      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default SProducts;
