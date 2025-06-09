import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Recycle,
  Trash2,
} from "lucide-react";
import axios from "../api/axios";
import { toast } from "react-toastify";

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

const STATUS_OPTIONS = [
  "All",
  "On Going",
  "Completed",
  "Returned",
  "Cancelled",
] as const;
type StatusFilter = (typeof STATUS_OPTIONS)[number];

export default function Order() {
  const [user, setUser] = useState<{ name: string; profile?: string } | null>(
    null
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [page, setPage] = useState(1);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const PAGE_SIZE = 5;
  const navigate = useNavigate();

  // Fetch current user
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }
    setLoadingUser(true);
    axios
      .get("/user")
      .then((res) =>
        setUser({ name: res.data.name, profile: res.data.profile })
      )
      .catch(() => {
        localStorage.removeItem("auth_token");
        navigate("/login");
      })
      .finally(() => setLoadingUser(false));
  }, [navigate]);

  const handleLogout = async () => {
    await axios
      .post("/logout")
      .then(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        toast.success("Logged out successfully");
        //time out for 0.5 seconds
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  // Fetch orders
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    setLoadingOrders(true);
    axios
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoadingOrders(false));
  }, []);

  // Fill with dummy orders if empty
  useEffect(() => {
    if (orders.length === 0) {
      setOrders([
        {
          id: 1,
          order_status: "On Going",
          order_date: new Date().toISOString(),
          order_code: "ORD/001",
          total_pay: 15000,
          product: {
            id: 101,
            name: "Eco Tote Bag",
            price: 9000,
            image_url:
              "https://www.intelligentchange.com/cdn/shop/products/4X5-WebRes-Intelligent-Change-Tote-Bags-1_301b012d-03b9-4917-96ff-e911c5783d56.jpg?v=1671127106&width=1120",
          },
        },
        {
          id: 2,
          order_status: "Completed",
          order_date: new Date(Date.now() - 86400000).toISOString(),
          order_code: "ORD/002",
          total_pay: 95000,
          product: {
            id: 102,
            name: "Upcycled Wallet",
            price: 95000,
            image_url:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          },
        },
        {
          id: 3,
          order_status: "Returned",
          order_date: new Date(Date.now() - 2 * 86400000).toISOString(),
          order_code: "ORD/003",
          total_pay: 50000,
          product: {
            id: 103,
            name: "Recycled Notebook",
            price: 50000,
            image_url:
              "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
          },
        },
        {
          id: 4,
          order_status: "Cancelled",
          order_date: new Date(Date.now() - 3 * 86400000).toISOString(),
          order_code: "ORD/004",
          total_pay: 200000,
          product: {
            id: 104,
            name: "Eco Bottle",
            price: 200000,
            image_url:
              "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
          },
        },
      ]);
    }
  }, [orders, setOrders]);

  // Skeleton component
  const Skeleton = () => (
    <div className="animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(PAGE_SIZE)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
              </div>
              <div className="h-4 w-16 bg-gray-100 rounded" />
            </div>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-3 w-24 bg-gray-100 rounded" />
              </div>
              <div className="text-right space-y-2">
                <div className="h-3 w-12 bg-gray-100 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-100 rounded mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Filter & paginate
  const filtered = orders.filter((o) =>
    filter === "All" ? true : o.order_status === filter
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}

        {loadingUser ? (
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded-lg" />
                <div className="h-10 bg-gray-100 rounded-lg" />
                <div className="h-10 bg-gray-100 rounded-lg" />
                <div className="h-10 bg-gray-100 rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <img
                  src={
                    user?.profile
                      ? `http://localhost:8000/storage/public/${user.profile}`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {user?.name || "Guest"}
                  </h2>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
              </div>
              <nav className="space-y-2">
                <a href="/account">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600  bg-opacity-10 rounded-lg cursor-pointer">
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </button>
                </a>
                <a href="/order">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] hover:bg-gray-50 rounded-lg cursor-pointer">
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
                <a href="/upcycle-requests">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Recycle className="w-5 h-5" />
                    <span>Upcycle Requests</span>
                  </button>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Orders List */}
        <section className="md:col-span-9 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-black">My Orders</h2>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    setPage(1);
                  }}
                  className={`px-6 py-2 rounded-full ${
                    filter === status
                      ? "bg-[#9DC08B] text-white"
                      : "border border-[#9DC08B] text-[#9DC08B] hover:bg-[#9DC08B] hover:bg-opacity-5 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Orders */}
            {loadingOrders ? (
              <Skeleton />
            ) : paginated.length === 0 ? (
              <p className="text-gray-500">No orders to display.</p>
            ) : (
              paginated.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-1 rounded-full text-sm ${
                          order.order_status === "On Going"
                            ? "bg-yellow-400 text-white"
                            : "bg-[#9DC08B] text-white"
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
                      <p className="text-gray-500">
                        Price: Rp{order.product.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 mb-2">Total:</p>
                      <p className="font-semibold text-black">
                        Rp{order.total_pay}
                      </p>
                      {order.order_status === "On Going" && (
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
            {!loadingOrders && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 text-black">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
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
                      page === i + 1
                        ? "bg-[#9DC08B] text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
