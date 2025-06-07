import React from "react";
import { useCart } from "../context/CartContext";

const CartHeader: React.FC = () => {
  const {
    selectAllItems,
    deselectAllItems,
    isAllSelected,
    removeSelectedItems,
    selectedItems,
  } = useCart();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      selectAllItems();
    } else {
      deselectAllItems();
    }
  };

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="appearance-none border checked:bg-[#609966] h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
            checked={isAllSelected()}
            onChange={handleSelectAll}
          />
          <span className="ml-2 text-sm text-gray-700">Select All</span>
        </label>
      </div>
      <button
        onClick={removeSelectedItems}
        disabled={selectedItems.length === 0}
        className={`text-sm ${
          selectedItems.length === 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-[#609966] hover:text-green-700"
        }`}
      >
        Remove
      </button>
    </div>
  );
};

export default CartHeader;
