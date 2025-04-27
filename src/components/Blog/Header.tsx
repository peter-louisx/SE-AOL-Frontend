import React, { useState } from 'react';
import { RecycleIcon, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <RecycleIcon className="h-6 w-6" />
          <span className="font-bold text-xl">TRASHURE</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-green-200 transition-colors">Home</a>
          <a href="#" className="hover:text-green-200 transition-colors font-medium">Blog</a>
          <a href="#" className="hover:text-green-200 transition-colors">About Us</a>
          <a href="#" className="hover:text-green-200 transition-colors">Contact</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-800 pb-4 px-4">
          <nav className="flex flex-col space-y-3">
            <a href="#" className="hover:text-green-200 transition-colors py-2 border-b border-green-700">Home</a>
            <a href="#" className="hover:text-green-200 transition-colors py-2 border-b border-green-700 font-medium">Blog</a>
            <a href="#" className="hover:text-green-200 transition-colors py-2 border-b border-green-700">About Us</a>
            <a href="#" className="hover:text-green-200 transition-colors py-2">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;