import React, { useState, useEffect } from 'react';
import { X, Tag, Info } from 'lucide-react';
import { Product } from '../../types';
import SustainabilityLabelSelector from './SustainabilityLabelSelector';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(product);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSustainabilityLabelsChange = (labels: string[]) => {
    setFormData(prev => ({
      ...prev,
      sustainabilityLabels: labels
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }

    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-1 focus:ring-[#40513B] px-4 py-2`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-left text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm text-left font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-1 focus:ring-[#40513B] px-4 py-2`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-left text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm text-left font-medium text-gray-700 mb-1">
                      Price (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full rounded-lg border ${
                        errors.price ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-1 focus:ring-[#40513B] px-4 py-2`}
                    />
                    {errors.price && <p className="mt-1 text-sm text-left text-red-500">{errors.price}</p>}
                  </div>

                  <div>
                    <label htmlFor="stock" className="block text-sm text-left font-medium text-gray-700 mb-1">
                      Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className={`w-full rounded-lg border ${
                        errors.stock ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-1 focus:ring-[#40513B] px-4 py-2`}
                    />
                    {errors.stock && <p className="mt-1 text-sm text-left text-red-500">{errors.stock}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm text-left font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#40513B] px-4 py-2`}
                  >
                    <option value="">Select a category</option>
                    <option value="Clothing and Apparel">Clothing and Apparel</option>
                    <option value="Zero-Waste Essentials">Zero-Waste Essentials</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-left text-red-500">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm text-left font-medium text-gray-700 mb-1">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.image ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-1 focus:ring-[#40513B] px-4 py-2`}
                  />
                  {errors.image && <p className="mt-1 text-sm text-left text-red-500">{errors.image}</p>}
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="mt-2 h-32 w-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-left text-gray-700">
                      Sustainability Labels
                    </label>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Info size={14} className="mr-1" />
                      Select up to 3 labels
                    </div>
                  </div>
                  <SustainabilityLabelSelector 
                    selectedLabels={formData.sustainabilityLabels}
                    onChange={handleSustainabilityLabelsChange}
                    maxLabels={3}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#40513B] hover:bg-[#609966] cursor-pointer text-white px-6 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;