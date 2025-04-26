import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, className = '' }) => {
  return (
    <div className={`bg-[#EDF1D6] rounded-lg p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-col mb-3">
          <Icon size={36} className="text-[#609966]" />
          <h3 className="text-gray-600 font-medium text-left pt-1">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-800 text-left">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;