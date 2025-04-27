import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, MapPin, Package, Truck, Clock } from 'lucide-react';
import { format } from 'date-fns';
import OrderInvoice from '../../components/seller/OrderInvoice';

const SOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useAppContext();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
          <Link
            to="/orders"
            className="text-[#3B5249] hover:text-[#2A3C33] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link
          to="/orders"
          className="text-[#3B5249] hover:text-[#2A3C33]"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Order Information</h2>
                <p className="text-gray-600">Order ID: {order.id}</p>
                <p className="text-gray-600">
                  Order Date: {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'new' ? 'bg-blue-100 text-blue-800' :
                order.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            {order.status === 'new' && (
              <div className="flex items-center text-yellow-600 mt-2">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">
                  Response Deadline: {format(new Date(order.responseDeadline), "PPp")}
                </span>
              </div>
            )}

            {order.status === 'in_progress' && order.shippingDeadline && (
              <div className="flex items-center text-yellow-600 mt-2">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">
                  Shipping Deadline: {format(new Date(order.shippingDeadline), "PPp")}
                </span>
              </div>
            )}

            {order.receiptNumber && (
              <div className="flex items-center text-gray-600 mt-2">
                <Package size={16} className="mr-1" />
                <span className="text-sm">Receipt Number: {order.receiptNumber}</span>
              </div>
            )}

            {order.estimatedArrival && (
              <div className="flex items-center text-gray-600 mt-2">
                <Truck size={16} className="mr-1" />
                <span className="text-sm">
                  Estimated Arrival: {format(new Date(order.estimatedArrival), "PPp")}
                </span>
              </div>
            )}

            <div className="mt-4">
              <OrderInvoice order={order} />
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="space-y-4">
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Package size={24} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(product.price * product.quantity)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(product.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <p className="text-gray-600">Total Amount:</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(order.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Customer and Shipping Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="space-y-2">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-gray-600">Customer ID: {order.customerId}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="flex items-start gap-2">
              <MapPin className="flex-shrink-0 text-gray-400 mt-1" size={20} />
              <div>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {order.trackingHistory && order.trackingHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Tracking History</h2>
              <div className="space-y-6">
                {order.trackingHistory.map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${
                      index !== order.trackingHistory!.length - 1
                        ? 'border-l-2 border-green-500 pb-6 ml-[11px]'
                        : ''
                    }`}
                  >
                    <div
                      className={`rounded-full p-1 ${
                        index === 0
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-500'
                      } -ml-[13px]`}
                    >
                      <Package size={16} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-gray-900">{event.status}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
                          {format(new Date(event.timestamp), 'PPp')}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOrderDetail;