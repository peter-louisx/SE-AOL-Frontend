import React from 'react';
import { RecycleIcon, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <RecycleIcon className="h-6 w-6" />
              <span className="font-bold text-xl">Trashure</span>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              A community dedicated to environmental sustainability through creative recycling, upcycling, 
              and waste reduction solutions for a cleaner, greener planet.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Blog</h3>
            <ul className="space-y-2 text-green-100">
              <li><a href="#" className="hover:text-white transition-colors">Latest Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recycling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Upcycling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Featured Projects</h3>
            <ul className="space-y-2 text-green-100">
              <li><a href="#" className="hover:text-white transition-colors">Community Gardens</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beach Cleanups</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Composting Workshops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DIY Tutorials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-green-200 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-200 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-200 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-200 transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
            <p className="text-green-100 text-sm">
              Sign up for our newsletter to get the latest updates on sustainable living.
            </p>
          </div>
        </div>
        
        <div className="border-t border-green-700 pt-6 text-center text-sm text-green-200">
          <p>© 2025 Trashure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;