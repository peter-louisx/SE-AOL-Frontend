import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingBag, Ticket, Recycle, Trash2 } from "lucide-react";
import axios from "../api/axios";
import { toast } from "react-toastify";

// --- Interfaces ---
interface RecycleRequest {
  id: number;
  status: string;
  request_date: string;
  notes?: string;
  total_payment: number;
  image_url: string;
  code?: string;
}

const STATUS_OPTIONS = [
  "All",
  "On Review",
  "Accepted",
  "Returned",
  "Cancelled",
] as const;

type StatusFilter = (typeof STATUS_OPTIONS)[number];

export default function UpcycleRequests() {
  const [user, setUser] = useState<{ name: string; profile?: string } | null>(
    null
  );
  const [requests, setRequests] = useState<RecycleRequest[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

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
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  // Fetch recycle requests
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    axios
      .get("/recycle-requests")
      .then((res) => setRequests(res.data))
      .catch(console.error)
      .finally(() => setLoadingRequests(false));
  }, []);

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
  const filtered = requests.filter((r) =>
    filter === "All" ? true : r.status === filter
  );

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
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
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
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] hover:bg-gray-50 rounded-lg cursor-pointer">
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

        {/* Requests List */}
        <section className="md:col-span-9 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-black">
              My Recycle Requests
            </h2>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
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

            {/* Requests */}
            {loadingRequests ? (
              <Skeleton />
            ) : filtered.length === 0 ? (
              <p className="text-gray-500">No recycle requests to display.</p>
            ) : (
              filtered.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-1 rounded-full text-sm ${
                          request.status === "On Review"
                            ? "bg-yellow-400 text-white"
                            : request.status === "Accepted"
                            ? "bg-green-500 text-white"
                            : request.status === "Returned"
                            ? "bg-blue-400 text-white"
                            : request.status === "Cancelled"
                            ? "bg-red-400 text-white"
                            : "bg-[#9DC08B] text-white"
                        }`}
                      >
                        {request.status}
                      </span>
                      <span className="text-gray-500">
                        {new Date(request.request_date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {request.code ?? `REC/${request.id}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <img
                      src={request.image_url}
                      alt={`Recycle request ${request.id}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      {request.notes && (
                        <p className="text-gray-700 mb-2">
                          <span className="font-semibold">Notes:</span>{" "}
                          {request.notes}
                        </p>
                      )}
                    </div>

                    {request.status !== "On Review" && (
                      <div className="text-right">
                        <p className="text-gray-500 mb-2">Total Payment:</p>
                        <p className="font-semibold text-black">
                          Rp{request.total_payment}
                        </p>
                        <button
                          className="mt-2 px-4 py-1 border border-[#9DC08B] text-[#9DC08B] rounded-lg hover:bg-[#9DC08B] hover:bg-opacity-5"
                          onClick={() =>
                            navigate(`/upcycle-checkout/${request.id}`)
                          }
                        >
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
