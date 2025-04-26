import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { UploadCloud, Info } from 'lucide-react';

const SAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    sustainabilityScore: '',
    image: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    
    if (!formData.sustainabilityScore.trim()) {
      newErrors.sustainabilityScore = 'Sustainability score is required';
    } else {
      const score = parseFloat(formData.sustainabilityScore);
      if (isNaN(score) || score < 0 || score > 10) {
        newErrors.sustainabilityScore = 'Score must be between 0 and 10';
      }
    }
    
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newProduct = {
        id: Math.random().toString(36).substring(2, 9),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        sustainabilityScore: parseFloat(formData.sustainabilityScore),
        image: formData.image,
        status: 'active',
        createdAt: new Date(),
        sustainabilityLabels: [],
      };
      
      addProduct(newProduct);
      navigate('/products');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <button
          onClick={() => navigate('/products')}
          className="text-[#3B5249] hover:text-[#2A3C33] font-medium"
        >
          Cancel
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B5249]'
                  } focus:border-transparent focus:outline-none focus:ring-2 px-4 py-2`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B5249]'
                  } focus:border-transparent focus:outline-none focus:ring-2 px-4 py-2`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.price ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B5249]'
                    } focus:border-transparent focus:outline-none focus:ring-2 px-4 py-2`}
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
                
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.stock ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B5249]'
                    } focus:border-transparent focus:outline-none focus:ring-2 px-4 py-2`}
                  />
                  {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.category ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B5249]'
                  } focus:border-transparent focus:outline-none focus:ring-2 px-4 py-2`}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home">Home</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bags">Bags</option>
                  <option value="Beauty">Beauty</option>
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
              
              <div>
                <label htmlFor="sustainabilityScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Sustainability Score (0-10) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="sustainabilityScore"
                    name="sustainabilityScore"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.sustainabilityScore}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.sustainabilityScore ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3B5249]'
                    } focus:border-transparent focus:outline-none focus:ring-2 px-4 py-2`}
                  />
                  <div className="absolute top-2 right-2 text-gray-400 cursor-help group">
                    <Info size={16} />
                    <div className="hidden group-hover:block absolute z-10 right-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                      Rate how sustainable your product is from 0 (not sustainable) to 10 (extremely sustainable).
                    </div>
                  </div>
                </div>
                {errors.sustainabilityScore && (
                  <p className="mt-1 text-sm text-red-500">{errors.sustainabilityScore}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#3B5249] hover:text-[#2A3C33] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#3B5249]"
                      >
                        <span>Paste image URL</span>
                        <input
                          id="image"
                          name="image"
                          type="text"
                          className="sr-only"
                          value={formData.image}
                          onChange={handleChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="text"
                      id="image-url"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={handleChange}
                      className={`w-full mt-2 rounded-lg border ${
                        errors.image ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-1 text-sm`}
                    />
                  </div>
                </div>
                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-[#3B5249] hover:bg-[#2A3C33] text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SAddProduct;