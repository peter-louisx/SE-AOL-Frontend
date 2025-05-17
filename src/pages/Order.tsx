import { User, ShoppingBag, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Order() {
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
                <a href="/account">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </button>
                </a>
                <a href="/order">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] bg-opacity-10 rounded-lg cursor-pointer">
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </button>
                </a>
                <a href="/voucher">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Ticket className="w-5 h-5" />
                  <span>My Vouchers</span>
                </button>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-black">My Orders</h2>
              
              {/* Order Status Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="px-6 py-2 bg-[#9DC08B] text-white rounded-full">
                  All
                </button>
                <button className="px-6 py-2 border border-[#9DC08B] text-[#9DC08B] rounded-full hover:bg-[#9DC08B] hover:bg-opacity-5 hover:text-white">
                  On Going
                </button>
                <button className="px-6 py-2 border border-[#9DC08B] text-[#9DC08B] rounded-full hover:bg-[#9DC08B] hover:bg-opacity-5 hover:text-white">
                  Completed
                </button>
                <button className="px-6 py-2 border border-[#9DC08B] text-[#9DC08B] rounded-full hover:bg-[#9DC08B] hover:bg-opacity-5 hover:text-white">
                  Returned
                </button>
                <button className="px-6 py-2 border border-[#9DC08B] text-[#9DC08B] rounded-full hover:bg-[#9DC08B] hover:bg-opacity-5 hover:text-white">
                  Cancelled
                </button>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1 rounded-full text-sm ${
                          index === 0 ? 'bg-yellow-400 text-white' : 'bg-[#9DC08B] text-white'
                        }`}>
                          {index === 0 ? 'On Going' : 'Completed'}
                        </span>
                        <span className="text-gray-500">23 February 2025</span>
                      </div>
                      <span className="text-gray-500">ORD/23022025/123456789</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <img
                        src="https://images.pexels.com/photos/14011035/pexels-photo-14011035.jpeg"
                        alt="Bamboo Bowl and Spoon"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-black">Bamboo Bowl and Spoon</h3>
                        <p className="text-gray-500">Quantity: 2</p>
                        <p className="text-gray-500">Price: Rp50.000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 mb-2">Total:</p>
                        <p className="font-semibold text-black">Rp200.000</p>
                        {index === 0 && (
                          <button className="mt-2 px-4 py-1 border border-[#9DC08B] text-[#9DC08B] rounded-lg hover:bg-[#9DC08B] hover:bg-opacity-5">
                            Check Status
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8 text-black">
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#9DC08B] text-white">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-50">2</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-50">3</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-50">4</button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-50">5</button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}