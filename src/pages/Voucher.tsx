import { User, ShoppingBag, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('http://localhost:8000/api/vouchers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        const data = await res.json();
        setVouchers(data);
      } catch (err) {
        console.error('Failed to fetch vouchers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

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
                {loading ? (
                  <p className="text-gray-500">Loading vouchers...</p>
                ) : vouchers.length > 0 ? (
                  vouchers.map((voucher: any) => (
                    <div key={voucher.id} className="bg-[#F4F9F0] rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#40513B] mb-2">{voucher.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">Minimum Spend Rp{voucher.min_spend}</p>
                      <p className="text-sm text-gray-500">Valid until {voucher.valid_until}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No vouchers available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}