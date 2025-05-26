import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  ShoppingBag,
  Ticket,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface Order {
  id: number;
  order_status: string;
  order_date: string;
  order_code?: string;
  total_pay: number;
  product: Product;
}

const STATUS_OPTIONS = ['All', 'On Going', 'Completed', 'Returned', 'Cancelled'] as const;
type StatusFilter = typeof STATUS_OPTIONS[number];

export default function Order() {
  const [user, setUser] = useState<{ name: string; profile?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const navigate = useNavigate();

  // Fetch current user
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');

    fetch('http://localhost:8000/api/user', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setUser({ name: data.name, profile: data.profile }))
      .catch(() => {
        localStorage.removeItem('auth_token');
        navigate('/login');
      });
  }, [navigate]);

  // Fetch orders
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    fetch('http://localhost:8000/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((data: Order[]) => setOrders(data))
      .catch(console.error);
  }, []);

  if (!user) return <div>Loading profile...</div>;

  // Filter & paginate
  const filtered = orders.filter(o =>
    filter === 'All' ? true : o.order_status === filter
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
              disabled
              className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] bg-opacity-10 rounded-lg"
            >
              <ShoppingBag className="w-5 h-5" /> My Orders
            </button>
            <button
              onClick={() => navigate('/voucher')}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Ticket className="w-5 h-5" /> My Vouchers
            </button>
          </nav>
        </aside>

        {/* Orders List */}
        <section className="md:col-span-9 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-black">My Orders</h2>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {STATUS_OPTIONS.map(status => (
                <button
                  key={status}
                  onClick={() => { setFilter(status); setPage(1); }}
                  className={`px-6 py-2 rounded-full ${
                    filter === status
                      ? 'bg-[#9DC08B] text-white'
                      : 'border border-[#9DC08B] text-[#9DC08B] hover:bg-[#9DC08B] hover:bg-opacity-5 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Orders */}
            {paginated.length === 0 ? (
              <p className="text-gray-500">No orders to display.</p>
            ) : (
              paginated.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-1 rounded-full text-sm ${
                          order.order_status === 'On Going'
                            ? 'bg-yellow-400 text-white'
                            : 'bg-[#9DC08B] text-white'
                        }`}
                      >
                        {order.order_status}
                      </span>
                      <span className="text-gray-500">
                        {new Date(order.order_date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {order.order_code ?? `ORD/${order.id}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <img
                      src={order.product.image_url}
                      alt={order.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-black">
                        {order.product.name}
                      </h3>
                      <p className="text-gray-500">Quantity: 1</p>
                      <p className="text-gray-500">Price: Rp{order.product.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 mb-2">Total:</p>
                      <p className="font-semibold text-black">
                        Rp{order.total_pay}
                      </p>
                      {order.order_status === 'On Going' && (
                        <button className="mt-2 px-4 py-1 border border-[#9DC08B] text-[#9DC08B] rounded-lg hover:bg-[#9DC08B] hover:bg-opacity-5">
                          Check Status
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 text-black">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-lg ${
                      page === i + 1 ? 'bg-[#9DC08B] text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}