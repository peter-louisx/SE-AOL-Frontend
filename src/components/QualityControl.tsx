import React from "react";

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center border rounded overflow-hidden">
      <button
        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8"
        onClick={onDecrease}
      >
        −
      </button>
      <div className="w-8 text-center">
        <input
          type="text"
          className="w-full text-center focus:outline-none"
          value={quantity}
          readOnly
        />
      </div>
      <button
        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
