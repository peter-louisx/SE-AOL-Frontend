import React, { useState } from "react";
import { MapPin, Star, X } from "lucide-react";

interface Vendor {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  specialties: string[];
  description: string;
}

interface RequestFormData {
  itemType: string;
  description: string;
  photos: FileList | null;
  pickupAddress: string;
  preferredDate: string;
}

const Upcycle: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState<RequestFormData>({
    itemType: "",
    description: "",
    photos: null,
    pickupAddress: "",
    preferredDate: "",
  });

  const vendors: Vendor[] = [
    {
      id: 1,
      name: "EcoArt Studios",
      image:
        "https://m.media-amazon.com/images/I/912F1y4WWnL._AC_UF1000,1000_QL80_.jpg",
      rating: 4.8,
      reviews: 156,
      location: "Jakarta, Indonesia",
      specialties: ["Plastic", "Glass", "Metal"],
      description:
        "Specializing in transforming plastic waste into beautiful home decor and functional art pieces.",
    },
    {
      id: 2,
      name: "Green Crafters Collective",
      image:
        "https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg",
      rating: 4.6,
      reviews: 98,
      location: "Bandung, Indonesia",
      specialties: ["Paper", "Textile", "Wood"],
      description:
        "A community of artisans turning textile waste and old furniture into renewed treasures.",
    },
    {
      id: 3,
      name: "Sustainable Solutions",
      image:
        "https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg",
      rating: 4.9,
      reviews: 212,
      location: "Surabaya, Indonesia",
      specialties: ["Electronics", "Plastic", "Metal"],
      description:
        "Expert in electronic waste recycling and creating innovative products from recycled materials.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setSelectedVendor(null);
    setFormData({
      itemType: "",
      description: "",
      photos: null,
      pickupAddress: "",
      preferredDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#2d4a29] mb-4">
            Custom Upcycling Service
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Give your unused items a second life! Connect with our trusted
            upcycling vendors who will transform your waste into beautiful,
            functional pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedVendor(vendor)}
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {vendor.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <Star className="fill-current" size={16} />
                    <span className="ml-1">{vendor.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{vendor.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {vendor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{vendor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Request Modal */}
        {selectedVendor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-black">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Request Upcycling Service
                  </h2>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Type
                    </label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                      value={formData.itemType}
                      onChange={(e) =>
                        setFormData({ ...formData, itemType: e.target.value })
                      }
                      required
                    >
                      <option value="">Select item type</option>
                      {selectedVendor.specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your item and how you'd like it to be transformed..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({ ...formData, photos: e.target.files })
                      }
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold p-2 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
                      value={formData.pickupAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pickupAddress: e.target.value,
                        })
                      }
                      placeholder="Enter your address for item pickup"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Pickup Date
                    </label>
                    <input
                      type="date"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredDate: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-300"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcycle;
