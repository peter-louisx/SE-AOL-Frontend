import { PenSquare, Trash2, User, ShoppingBag, Ticket } from 'lucide-react';

export default function CustomerAccount() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">Goat Messi</h2>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] bg-opacity-10 rounded-lg">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Ticket className="w-5 h-5" />
                  <span>My Vouchers</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="text-xl font-semibold mb-6 text-black">Personal Profile</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9DC08B] focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue=""
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9DC08B] focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue=""
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9DC08B] focus:border-transparent text-black"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#9DC08B] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Save
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-black">Address</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#9DC08B] bg-opacity-10 text-white rounded-md text-sm">
                        Home
                      </span>
                      <span className="text-gray-700">Lionel Andres Messi | +62 123 456 789</span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Jalan Kemana Aja Yang Penting Berdua, RT.001/RW.001,
                      <br />
                      Kecamatan Lupa, Kota Mainan, Argentina 12345
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-600 hover:text-[#9DC08B]">
                        <PenSquare className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-[#9DC08B] text-[#9DC08B] py-3 rounded-lg hover:bg-[#9DC08B] hover:bg-opacity-5 transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
              />
              <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Choose Image
              </button>
              <p className="text-sm text-gray-500 mt-2">Max. 10 MB (*.JPG, *.PNG)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}