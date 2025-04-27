import React from 'react';
import { X, Package, MapPin, Clock } from 'lucide-react';
import { TrackingEvent } from '../../types';
import { format } from 'date-fns';

interface OrderTrackingModalProps {
  trackingEvents: TrackingEvent[];
  onClose: () => void;
}

const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  trackingEvents,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Tracking Information</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {trackingEvents.map((event, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  index !== trackingEvents.length - 1
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
      </div>
    </div>
  );
};

export default OrderTrackingModal;