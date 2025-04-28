import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SendOrderModalProps {
  orderId: string;
  onClose: () => void;
  onSend: (orderId: string, receiptNumber: string) => void;
}

const SendOrderModal: React.FC<SendOrderModalProps> = ({
  orderId,
  onClose,
  onSend,
}) => {
  const [receiptNumber, setReceiptNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptNumber.trim()) {
      setError('Receipt number is required');
      return;
    }
    onSend(orderId, receiptNumber);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Send Order</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="receiptNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Receipt Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="receiptNumber"
                value={receiptNumber}
                onChange={(e) => {
                  setReceiptNumber(e.target.value);
                  setError('');
                }}
                className={`w-full rounded-lg border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-[#3B5249] px-4 py-2`}
                placeholder="Enter receipt number"
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#3B5249] hover:bg-[#2A3C33] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Send Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendOrderModal;