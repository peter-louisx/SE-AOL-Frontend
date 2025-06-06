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
    <div className="min-h-screen bg-gradient-to-br from-[#eaf4e2] via-[#f3f7f2] to-[#d2e3c8] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d4a29] mb-4 tracking-tight">
            Upcycle Hub
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Give your unused items a second life! Connect with our trusted
            upcycling vendors who will transform your waste into beautiful,
            functional pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-[#e0eedd]"
              onClick={() => setSelectedVendor(vendor)}
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-7">
                <h3 className="text-2xl font-bold text-[#40513B] mb-2">
                  {vendor.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <Star className="fill-current" size={18} />
                    <span className="ml-1 font-semibold">{vendor.rating}</span>
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
                      className="bg-[#EDF1D6] text-[#40513B] text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-base">{vendor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Request Modal */}
        {selectedVendor && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 text-black">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0eedd]">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#40513B]">
                    Request Upcycling Service
                  </h2>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="text-gray-400 hover:text-[#609966] transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <label className="block text-sm font-semibold text-[#40513B] mb-2">
                      Item Type
                    </label>
                    <select
                      className="w-full border-[#b7d3b0] rounded-lg shadow-sm focus:ring-[#609966] focus:border-[#609966] p-3"
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
                    <label className="block text-sm font-semibold text-[#40513B] mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full border-[#b7d3b0] rounded-lg shadow-sm focus:ring-[#609966] focus:border-[#609966] p-3"
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
                    <label className="block text-sm font-semibold text-[#40513B] mb-2">
                      Photos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({ ...formData, photos: e.target.files })
                      }
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold p-2 file:bg-[#EDF1D6] file:text-[#40513B] hover:file:bg-[#d2e3c8] cursor-pointer hover:file:cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#40513B] mb-2">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      className="w-full border-[#b7d3b0] rounded-lg shadow-sm focus:ring-[#609966] focus:border-[#609966] p-3"
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
                    <label className="block text-sm font-semibold text-[#40513B] mb-2">
                      Preferred Pickup Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border-[#b7d3b0] rounded-lg shadow-sm focus:ring-[#609966] focus:border-[#609966]"
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
                    className="w-full bg-[#609966] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-[#40513B] transition-colors duration-300 shadow"
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
