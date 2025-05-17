import { User, ShoppingBag, Ticket } from 'lucide-react';

export default function Voucher() {
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
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <ShoppingBag className="w-5 h-5" />
                  <span>My Orders</span>
                </button>
                </a>
                <a href="/voucher">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] bg-opacity-10 rounded-lg cursor-pointer">
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
              <h2 className="text-xl font-semibold mb-6 text-black">My Vouchers</h2>
              
              {/* Vouchers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Purchase Voucher */}
                <div className="bg-[#F4F9F0] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#40513B] mb-2">15% Off For Your First Purchase</h3>
                  <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp500.000</p>
                  <p className="text-sm text-gray-500">Valid until 31 August 2026</p>
                </div>

                {/* New Customer Voucher */}
                <div className="bg-[#F4F9F0] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#40513B] mb-2">5% Off For New Customer</h3>
                  <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp0</p>
                  <p className="text-sm text-gray-500">Valid until 31 August 2026</p>
                </div>

                {/* Fixed Amount Discount */}
                <div className="bg-[#F4F9F0] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#40513B] mb-2">Rp50.000 Discount</h3>
                  <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp250.000</p>
                  <p className="text-sm text-gray-500">Valid until 31 August 2026</p>
                </div>

                {/* Percentage Discount */}
                <div className="bg-[#F4F9F0] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#40513B] mb-2">50% Discount</h3>
                  <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp2.500.000</p>
                  <p className="text-sm text-gray-500">Valid until 31 August 2026</p>
                </div>

                {/* Free Shipping No Minimum */}
                <div className="bg-[#F4F9F0] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#40513B] mb-2">Free Shipping</h3>
                  <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp0</p>
                  <p className="text-sm text-gray-500">Valid until 31 August 2026</p>
                </div>

                {/* Free Shipping with Minimum */}
                <div className="bg-[#F4F9F0] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#40513B] mb-2">Free Shipping</h3>
                  <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp200.000</p>
                  <p className="text-sm text-gray-500">Valid until 31 August 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}