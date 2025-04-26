import React from 'react';
import { NavLink } from 'react-router-dom';
import { Recycle, Package, ShoppingBag, LayoutDashboard } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#40513B] text-white hidden md:flex flex-col h-screen">
      <div className="p-4 flex items-center gap-2">
        <Recycle size={28} className="text-green-300" />
        <span className="text-xl font-bold tracking-wider">TRASHURE</span>
      </div>
      
      <nav className="flex-1 pt-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive ? 'bg-[#609966] border-l-4 border-[#EDF1D6]' : 'hover:bg-[#609966]'
            }`
          }
        >
          <LayoutDashboard className="mr-3" size={20} />
          Dashboard
        </NavLink>
        
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive ? 'bg-[#609966] border-l-4 border-[#EDF1D6]' : 'hover:bg-[#609966]'
            }`
          }
        >
          <Package className="mr-3" size={20} />
          Products
        </NavLink>
        
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive ? 'bg-[#609966] border-l-4 border-[#EDF1D6]' : 'hover:bg-[#609966]'
            }`
          }
        >
          <ShoppingBag className="mr-3" size={20} />
          Orders
        </NavLink>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-2">
          <Recycle size={24} className="text-green-300" />
          <span className="text-lg font-semibold">Trashure</span>
        </div>
        <p className="text-xs mt-2 text-gray-300">
          A sustainable e-commerce platform connecting eco-conscious buyers with high-quality, upcycled, and ethically sourced products.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;