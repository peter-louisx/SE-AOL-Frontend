import React from 'react';
import { Instagram, BookIcon as TiktokIcon, Youtube, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3B5249] text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Trashure</h3>
            <p className="text-sm text-gray-300">
              Trashure is a sustainable e-commerce platform connecting eco-conscious buyers with 
              high-quality, upcycled, and ethically sourced products. As a third-party marketplace, we
              make it easy to discover and support brands that prioritize sustainability. Every purchase
              helps reduce waste and protect the planet, because small choices make a big difference!
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Accepted Payments</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Visa', 'Mastercard', 'PayPal', 'Stripe', 'OVO', 'GoPay', 'DANA', 'BCA'].map((payment) => (
                <div key={payment} className="bg-white/10 rounded p-2 text-xs text-center">
                  {payment}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-300 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © 2025 Trashure. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;