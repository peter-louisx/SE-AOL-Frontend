import React, { useState } from "react";
import { ArrowLeft, MapPin, Edit3 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import axios from "../api/axios";

type CheckoutProps = {
  onSuccess: () => void;
};

const Checkout: React.FC<CheckoutProps> = ({ onSuccess }) => {
  const { cartItems, selectedItems, getTotalPrice } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("bri");
  const [selectedDelivery, setSelectedDelivery] = useState("economy");
  const [voucher, setVoucher] = useState("");

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );
  const subtotal = getTotalPrice();
  const shippingFee = 1000;
  const serviceFee = 2000;

  const paymentMethods = [
    {
      id: "bri",
      name: "BRI Virtual Account",
      icon: "🏦",
      color: "bg-blue-500",
    },
    { id: "gopay", name: "GoPay", icon: "💚", color: "bg-green-500" },
    {
      id: "bca",
      name: "BCA Virtual Account",
      icon: "🏛️",
      color: "bg-blue-600",
    },
    { id: "dana", name: "Dana", icon: "💙", color: "bg-blue-400" },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      icon: "🏦",
      color: "bg-yellow-500",
    },
    { id: "ovo", name: "Ovo", icon: "💜", color: "bg-purple-500" },
    {
      id: "bni",
      name: "BNI Virtual Account",
      icon: "🏦",
      color: "bg-orange-500",
    },
    { id: "shopeepay", name: "ShopeePay", icon: "🛒", color: "bg-orange-600" },
  ];

  const deliveryOptions = [
    {
      id: "economy",
      name: "Economy",
      price: "Rp3.000 | 3-7 days",
      priceValue: 3000,
      selected: true,
    },
    {
      id: "regular",
      name: "Regular",
      price: "Rp5.000 | 2-3 days",
      priceValue: 5000,
      selected: false,
    },
    {
      id: "instant",
      name: "Instant",
      price: "Rp8.000 | 1-2 days",
      priceValue: 8000,
      selected: false,
    },
  ];

  const deviveryFee =
    deliveryOptions.find((option) => option.id === selectedDelivery)
      ?.priceValue || 0;
  const totalPrice = subtotal + shippingFee + serviceFee + deviveryFee;

  const handlePayNow = async () => {
    await axios
      .post("/checkout", {
        delivery_option: selectedDelivery,
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = response.data.invoice_url;
        } else {
          toast.error("Payment failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Payment error:", error);
        toast.error("Payment failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Delivery Address
                </h2>
                <button className="flex items-center text-[#609966] hover:text-green-700 text-sm font-medium">
                  <Edit3 size={14} className="mr-1" />
                  Change Address
                </button>
              </div>

              <div className="flex items-start">
                <div className="bg-[#9DC08B] p-2 rounded-full mr-3 mt-1">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="bg-[#9DC08B] text-white text-xs px-2 py-1 rounded-full mr-2">
                      Home
                    </span>
                    <span className="font-medium text-gray-900">
                      Lionel Andres Messi
                    </span>
                    <span className="text-gray-500 ml-2">+62 123 456 789</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Jalan Kemang Raya Selatan Raya No. 67 Kemang Raya, Kemang
                    Selatan, Luas, Kota Jakarta, Argentina 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center p-3 border-2 rounded-lg transition-all ${
                        selectedPayment === method.id
                          ? "border-[#40513B80] bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${method.color} flex items-center justify-center text-white text-sm mr-3`}
                      >
                        {method.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {method.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Delivery
              </h2>

              <div className="space-y-3 flex flex-col gap-2">
                {deliveryOptions.map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedDelivery === option.id}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="sr-only "
                    />
                    <div
                      className={`flex items-center justify-between p-3 border-2 rounded-lg transition-all ${
                        selectedDelivery === option.id
                          ? "border-[#40513B80] bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            selectedDelivery === option.id
                              ? "border-[#40513B80] bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedDelivery === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">
                          {option.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {option.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Item
              </h2>

              <div className="space-y-4">
                {selectedCartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          Price: {item.currency}
                          {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Summary
              </h2>

              {/* Plant a Tree Option */}
              <div className="flex items-center justify-between mb-4 p-3 bg-[#EDF1D6] rounded-lg text-black">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#EDF1D6] rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">🌱</span>
                  </div>
                  <span className="text-sm font-medium text-black">
                    Plant a Tree
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-green-600  rounded focus:ring-green-500"
                  defaultChecked
                />
              </div>

              {/* Voucher */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3  bg-[#EDF1D6] rounded-lg focus:ring-green-500 focus:border-green-500 text-black"
                    placeholder="Use Voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">&gt;</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Price</span>
                  <span className="text-gray-900">
                    Rp{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="text-gray-900">
                    Rp{shippingFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-900">
                    Rp{serviceFee.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">
                    Rp{deviveryFee.toLocaleString()}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total Pay</span>
                    <span className="text-gray-900">
                      Rp{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handlePayNow}
                  className="w-full bg-[#609966] text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
