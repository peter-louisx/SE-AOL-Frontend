import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3d5a37] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">🌳 TreeStore</span>
            </div>
            <p className="text-sm mb-4">
              Your premier destination for nature-inspired products. We're
              committed to sustainability and bringing the beauty of nature into
              your home.
            </p>
            <div className="flex items-center space-x-1 text-sm mb-2">
              <Phone size={16} />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1 text-sm mb-2">
              <Mail size={16} />
              <span>support@treestore.com</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <MapPin size={16} />
              <span>123 Nature Lane, Forestville, CA</span>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  On Sale
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Account & Help */}
          <div>
            <h3 className="font-bold mb-4">Account & Help</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4B6F44] mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TreeStore. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
