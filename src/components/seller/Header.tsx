import React from "react";
import { Menu, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { sellerProfile } = useAppContext();

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

        <div className="ml-auto text-black">
          <Link to="/seller/account">
            <div className="flex items-center bg-gray-100 rounded py-4 px-6 hover:bg-gray-200 transition-colors">
              <Store size={18} className="text-[#3B5249] mr-2" />
              <span className="text-sm font-medium">{sellerProfile.name}</span>
            </div>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#3B5249] text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/seller/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A3C33]"
            >
              Dashboard
            </Link>
            <Link
              to="/seller/products"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A3C33]"
            >
              Products
            </Link>
            <Link
              to="/seller/orders"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A3C33]"
            >
              Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
