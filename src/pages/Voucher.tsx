import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, ShoppingBag, Ticket } from 'lucide-react';

interface Voucher {
  id: number;
  title: string;
  min_spend: number;
  valid_until: string;
}

export default function Voucher() {
  const [user, setUser] = useState<{ name: string; profile?: string } | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loadingVouchers, setLoadingVouchers] = useState(true);
  const navigate = useNavigate();

  // Fetch authenticated user
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setUser({ name: data.name, profile: data.profile });
      })
      .catch(() => {
        localStorage.removeItem('auth_token');
        navigate('/login');
      });
  }, [navigate]);

  // Fetch vouchers
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    fetch('http://localhost:8000/api/vouchers', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then((data: Voucher[]) => setVouchers(data))
      .catch(err => console.error('Failed to fetch vouchers:', err))
      .finally(() => setLoadingVouchers(false));
  }, []);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile…</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-3 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <img
              src={
                user.profile
                  ? `http://localhost:8000/storage/public/${user.profile}`
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">Premium Member</p>
            </div>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/account')}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <UserIcon className="w-5 h-5" /> My Account
            </button>
            <button
              onClick={() => navigate('/order')}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <ShoppingBag className="w-5 h-5" /> My Orders
            </button>
            <button
              disabled
              className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] bg-opacity-10 rounded-lg"
            >
              <Ticket className="w-5 h-5" /> My Vouchers
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="md:col-span-9">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-black">My Vouchers</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loadingVouchers ? (
                <p className="text-gray-500">Loading vouchers...</p>
              ) : vouchers.length > 0 ? (
                vouchers.map(voucher => (
                  <div key={voucher.id} className="bg-[#F4F9F0] rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#40513B] mb-2">
                      {voucher.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Minimum Spend Rp{voucher.min_spend.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Valid until {new Date(voucher.valid_until).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No vouchers available.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}