import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: typeof LucideIcon;
  label: string;
  to: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, to }) => {
  return (
    <Link 
      to={to}
      className="bg-[#EDF1D6] rounded-lg p-6 transition-all duration-300 hover:shadow-md flex items-center gap-3"
    >
      <Icon size={36} className="text-[#609966]" />
      <span className="text-lg font-medium text-gray-800">{label}</span>
    </Link>
  );
};

export default ActionButton;