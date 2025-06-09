import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import {
  Clock,
  FileText,
  Truck,
  CheckCircle,
  Search,
  Eye,
  FileCheck,
} from "lucide-react";
import { format } from "date-fns";
import OrderInvoice from "../../components/seller/OrderInvoice";
import OrderTrackingModal from "../../components/seller/OrderTrackingModal";
import SendOrderModal from "../../components/seller/SendOrderModal";
import { Order } from "../../types";

const SOrders: React.FC = () => {
  const { orders, acceptOrder, sendOrder, completeOrder } = useAppContext();

  const [activeTab, setActiveTab] = useState<
    "new" | "in_progress" | "shipped" | "completed"
  >("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = order.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  const handleTrack = (orderId: string) => {
    setShowTrackingModal(true);
    setSelectedOrder(orderId);
  };

  const handleSend = (orderId: string) => {
    setShowSendModal(true);
    setSelectedOrder(orderId);
  };

  const handleSendConfirm = (orderId: string, receiptNumber: string) => {
    sendOrder(orderId, receiptNumber);
    setShowSendModal(false);
  };

  const renderOrderCard = (order: Order) => (
    <div key={order.id} className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                order.status === "new"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "shipped"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {order.status === "new"
                ? "New"
                : order.status === "in_progress"
                ? "In Progress"
                : order.status === "shipped"
                ? "Shipped"
                : "Completed"}
            </span>
            <span className="text-sm text-gray-600">{order.id}</span>
          </div>
          <h3 className="font-medium text-black">{order.customerName}</h3>
        </div>

        {(order.status === "new" || order.status === "in_progress") && (
          <div className="flex items-center text-yellow-600">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">
              {order.status === "new"
                ? `Response by: ${format(
                    new Date(order.responseDeadline),
                    "dd MMM, HH:mm"
                  )}`
                : `Ship by: ${format(
                    new Date(order.shippingDeadline!),
                    "dd MMM, HH:mm"
                  )}`}
            </span>
          </div>
        )}

        {order.status === "shipped" && order.estimatedArrival && (
          <div className="flex items-center text-purple-600">
            <Truck size={16} className="mr-1" />
            <span className="text-sm">
              Estimated:{" "}
              {format(new Date(order.estimatedArrival), "dd MMM, HH:mm")}
            </span>
          </div>
        )}

        {order.status === "completed" && order.actualArrival && (
          <div className="flex items-center text-green-600">
            <CheckCircle size={16} className="mr-1" />
            <span className="text-sm">
              Delivered:{" "}
              {format(new Date(order.actualArrival), "dd MMM, HH:mm")}
            </span>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <p>Order Date: {format(new Date(order.createdAt), "dd MMM yyyy")}</p>
        <p>
          Total:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(order.totalAmount)}
        </p>
        <p>
          Items:{" "}
          {order.products.map((p) => `${p.quantity}x ${p.name}`).join(", ")}
        </p>
        {order.receiptNumber && <p>Receipt Number: {order.receiptNumber}</p>}
      </div>

      <div className="flex justify-end gap-2">
        {order.status === "new" && (
          <>
            <Link
              to={`/seller/orders/${order.id}`}
              className="flex items-center gap-1 text-[#3B5249] hover:text-[#2A3C33] px-3 py-1"
            >
              <Eye size={18} />
              <span>View Detail</span>
            </Link>
            <button
              onClick={() => acceptOrder(order.id)}
              className="bg-[#609966] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#40513B] transition-colors"
            >
              Accept
            </button>
          </>
        )}

        {order.status === "in_progress" && (
          <>
            <Link
              to={`/seller/orders/${order.id}`}
              className="flex items-center gap-1 text-[#3B5249] hover:text-[#2A3C33] px-3 py-1"
            >
              <Eye size={18} />
              <span>View Detail</span>
            </Link>
            <div className="flex items-center gap-1 text-[#3B5249] hover:text-[#2A3C33] px-3 py-1 cursor-pointer">
              <OrderInvoice order={order} />
            </div>
            <button
              onClick={() => handleSend(order.id)}
              className="bg-[#609966] text-white px-4 py-1 rounded hover:bg-[#40513B] transition-colors cursor-pointer"
            >
              Send
            </button>
          </>
        )}

        {order.status === "shipped" && (
          <>
            <Link
              to={`/seller/orders/${order.id}`}
              className="flex items-center gap-1 text-[#3B5249] hover:text-[#2A3C33] px-3 py-1"
            >
              <Eye size={18} />
              <span>View Detail</span>
            </Link>
            <button
              onClick={() => handleTrack(order.id)}
              className="flex items-center gap-1 text-[#3B5249] hover:text-[#2A3C33] px-3 py-1 cursor-pointer"
            >
              <Truck size={18} />
              <span>Track</span>
            </button>
            <button
              onClick={() => completeOrder(order.id)}
              className="bg-[#609966] text-white px-4 py-1 rounded hover:bg-[#40513B] transition-colors cursor-pointer"
            >
              Mark as Delivered
            </button>
          </>
        )}

        {order.status === "completed" && (
          <Link
            to={`/seller/orders/${order.id}`}
            className="flex items-center gap-1 text-[#40513B] hover:text-[#2A3C33] px-3 py-1"
          >
            <Eye size={18} />
            <span>View Detail</span>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3B5249] focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === "new"
                ? "bg-[#609966] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            New
          </button>
          <button
            onClick={() => setActiveTab("in_progress")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === "in_progress"
                ? "bg-[#609966] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab("shipped")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === "shipped"
                ? "bg-[#609966] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === "completed"
                ? "bg-[#609966] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No orders found in this category.</p>
          </div>
        ) : (
          filteredOrders.map((order) => renderOrderCard(order))
        )}
      </div>

      {showTrackingModal && selectedOrder && (
        <OrderTrackingModal
          trackingEvents={
            orders.find((o) => o.id === selectedOrder)?.trackingHistory || []
          }
          onClose={() => {
            setShowTrackingModal(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {showSendModal && selectedOrder && (
        <SendOrderModal
          orderId={selectedOrder}
          onClose={() => {
            setShowSendModal(false);
            setSelectedOrder(null);
          }}
          onSend={handleSendConfirm}
        />
      )}
    </div>
  );
};

export default SOrders;
