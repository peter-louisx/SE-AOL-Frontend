import React from 'react';
import { Menu, Store } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
        
        <div className="ml-auto flex items-center">
          <div className="flex items-center bg-gray-100 rounded py-4 px-6">
            <Store size={18} className="text-[#3B5249] mr-2" />
            <span className="text-sm font-medium">Gacor Store</span>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#3B5249] text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A3C33]"
            >
              Dashboard
            </a>
            <a
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A3C33]"
            >
              Products
            </a>
            <a
              href="/orders"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A3C33]"
            >
              Orders
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;