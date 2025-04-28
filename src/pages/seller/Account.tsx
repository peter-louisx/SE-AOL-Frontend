import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SAccount: React.FC = () => {
  const navigate = useNavigate();
  const { sellerProfile, updateSellerProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(sellerProfile);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(sellerProfile.image);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSellerProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Store Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#3B5249] hover:text-[#2A3C33] cursor-pointer"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-start gap-8">
            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account
                </label>
                <div className="flex gap-2">
                  <select
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                    disabled={!isEditing}
                    className="w-24 rounded-lg border border-gray-300 px-2 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="BCA">BCA</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="Mandiri">Mandiri</option>
                  </select>
                  <input
                    type="text"
                    id="bankAccount"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B5249] focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="w-48 space-y-4">
              <div className="aspect-square rounded-full overflow-hidden bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Store logo"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-5 text-center">
                    Store Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer text-center block w-full text-xs text-gray-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#609966] file:text-white hover:file:bg-[#40513B]"
                  />
                  <p className="mt-1 text-xs text-gray-500 text-center">Max. 10 MB (*.JPG, *.PNG)</p>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(sellerProfile);
                  setPreviewUrl(sellerProfile.image);
                }}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#609966] hover:bg-[#40513B] text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SAccount;