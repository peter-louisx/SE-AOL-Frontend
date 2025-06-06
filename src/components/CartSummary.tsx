import React, { useState } from "react";
import { useCart } from "../context/CartContext";

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { getTotalPrice, selectedItems } = useCart();
  const [voucher, setVoucher] = useState("");

  const totalPrice = getTotalPrice();
  const hasSelectedItems = selectedItems.length > 0;

  const handleCheckout = () => {
    if (!hasSelectedItems) return;
    onCheckout();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm text-black">
      <h2 className="text-lg font-medium mb-4">Summary</h2>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Total:</span>
        <span className="font-semibold text-gray-900">
          {hasSelectedItems ? `Rp${totalPrice.toLocaleString()}` : "Rp0"}
        </span>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="Voucher code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-400">&gt;</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={!hasSelectedItems}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          hasSelectedItems
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
