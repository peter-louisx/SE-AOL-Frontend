import React, { useEffect, useState } from "react";
import { Search, ShoppingBag, User, Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { AxiosError } from "axios";
import cn from "classnames";

interface Profile {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Menu toggled");
    setIsMenuOpen((prev) => !prev);
  };

  const { isAuthenticated } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/user");
        setProfile(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to fetch profile"
          );
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="bg-[#4B6F44] text-white   top-0 sticky z-50 w-full ">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className={cn(
              "fixed z-50 inset-0  bg-[#3d5a37]  w-72 h-full flex flex-col p-6 transform transition-transform duration-300 ease-in-out",
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
            style={{
              boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex items-center mb-8">
              <button
                className="mr-4"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              <img
                src="/logo.png"
                className="h-8 w-8 mr-2"
                alt="Trashure logo"
              />
              <span className="text-2xl font-bold tracking-wide text-white">
                TRASHURE
              </span>
            </div>
            <nav className="flex flex-col space-y-6 text-white text-xl font-semibold">
              <Link to="/products" onClick={toggleMenu}>
                Shop
              </Link>
              <Link to="/blog" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/green-game" onClick={toggleMenu}>
                Green Game
              </Link>
              <Link to="/upcycle" onClick={toggleMenu}>
                Upcycle
              </Link>
              <Link to="/about" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="/contact" onClick={toggleMenu}>
                Contact
              </Link>
            </nav>
          </div>
          {/* Overlay background */}

          <div className="flex items-center">
            {/* Sidebar for mobile and desktop */}
            <button
              className="mr-2 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
            {/* Sidebar overlay */}

            <Link to="/" className="flex items-center space-x-1 ml-5">
              <span className="text-2xl font-bold tracking-wide text-white flex items-center">
                <img
                  src="/logo.png"
                  className="h-10 w-10 mr-2"
                  alt="Trashure logo"
                />
                Trashure
              </span>
            </Link>
          </div>

          {/* Search on desktop */}
          <div className="mx-8 ">
            <Link
              to="/products"
              className="text-sm hover:text-green-200 transition-colors"
            >
              Categories
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for sustainable products..."
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 text-gray-300 focus:ring-green-500 bg-[#609906] placeholder-white"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-green-200 transition-colors"
              >
                <User size={20} />
                <span className="text-sm">Login</span>
              </Link>
            ) : (
              <Link
                to="/account"
                className="flex items-center space-x-1 hover:text-green-200 transition-colors"
              >
                <User size={20} />
                <span className="text-sm">{profile?.name || "Account"}</span>
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="flex items-center space-x-1 hover:text-green-200 transition-colors"
              >
                <span className="text-sm">
                  <ShoppingCart size={25} className="inline mr-1" />
                </span>
              </Link>
            )}
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
            {isAuthenticated && (
              <Link
                to="/cart"
                className="text-white py-2 hover:bg-[#4B6F44] px-2 rounded transition-colors flex items-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Cart</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
