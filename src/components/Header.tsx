import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#4B6F44] text-white   top-0 sticky z-50 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-2xl font-bold tracking-wide">
              🌳 TreeStore
            </span>
          </Link>

          {/* Search on desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search our catalog..."
                className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 bg-white focus:ring-green-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-sm hover:text-green-200 transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/products"
              className="text-sm hover:text-green-200 transition-colors"
            >
              Deals
            </Link>
            <Link
              to="/green-game"
              className="text-sm hover:text-green-200 transition-colors"
            >
              Green Game
            </Link>
            <Link
              to="/account"
              className="flex items-center space-x-1 hover:text-green-200 transition-colors"
            >
              <User size={20} />
              <span className="text-sm">Account</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-green-200 transition-colors"
            >
              <ShoppingBag size={20} />
              <span className="text-sm">Cart (0)</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search on mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search our catalog..."
              className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#3d5a37] py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link
              to="/products"
              className="text-white py-2 hover:bg-[#4B6F44] px-2 rounded transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/products"
              className="text-white py-2 hover:bg-[#4B6F44] px-2 rounded transition-colors"
            >
              Deals
            </Link>
            <Link
              to="/green-game"
              className="text-white py-2 hover:bg-[#4B6F44] px-2 rounded transition-colors"
            >
              Green Game
            </Link>
            <Link
              to="/account"
              className="text-white py-2 hover:bg-[#4B6F44] px-2 rounded transition-colors flex items-center space-x-2"
            >
              <User size={20} />
              <span>Account</span>
            </Link>
            <Link
              to="/cart"
              className="text-white py-2 hover:bg-[#4B6F44] px-2 rounded transition-colors flex items-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Cart (0)</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
