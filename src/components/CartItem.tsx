import React from "react";
import { useCart, CartItem as CardTypeItem } from "../context/CartContext";
import QuantityControl from "./QualityControl";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  item: CardTypeItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { selectItem, selectedItems, removeItem, updateQuantity } = useCart();

  const handleSelectItem = () => {
    selectItem(item.id);
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="mr-4">
          <input
            type="checkbox"
            className="appearance-none border checked:bg-[#609966] checked:text-white h-5 w-5 text-white rounded border-gray-300 focus:ring-green-500 "
            checked={selectedItems.includes(item.id)}
            onChange={handleSelectItem}
          />
        </div>
        <div className="flex flex-1 items-center">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="ml-4 flex-1">
            <div>
              <p className="text-xs text-gray-500">{item.brand}</p>
              <h3 className="text-base font-medium text-gray-900">
                {item.name}
              </h3>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-600">
                Price:{" "}
                <span className="font-medium">
                  {item.currency}
                  {item.price.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRemoveItem}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            <QuantityControl
              quantity={item.quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
