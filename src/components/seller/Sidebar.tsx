import React from "react";
import { NavLink } from "react-router-dom";
import {
  Recycle,
  Package,
  ShoppingBag,
  LayoutDashboard,
  User,
  Wallet,
  LogOut,
} from "lucide-react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-[#40513B] text-white hidden md:flex flex-col h-screen">
      <div className="p-4 flex items-center gap-2">
        <Recycle size={28} className="text-green-300" />
        <span className="text-xl font-bold tracking-wider">TRASHURE</span>
      </div>

      <nav className="flex-1 pt-8">
        <NavLink
          to="/seller/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive
                ? "bg-[#609966] border-l-4 border-[#EDF1D6]"
                : "hover:bg-[#609966]"
            }`
          }
        >
          <LayoutDashboard className="mr-3" size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/seller/products"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive
                ? "bg-[#609966] border-l-4 border-[#EDF1D6]"
                : "hover:bg-[#609966]"
            }`
          }
        >
          <Package className="mr-3" size={20} />
          Products
        </NavLink>

        <NavLink
          to="/seller/orders"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive
                ? "bg-[#609966] border-l-4 border-[#EDF1D6]"
                : "hover:bg-[#609966]"
            }`
          }
        >
          <ShoppingBag className="mr-3" size={20} />
          Orders
        </NavLink>

        <div className="border-t border-[#2A3C33] my-4"></div>

        <NavLink
          to="/seller/account"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive
                ? "bg-[#2A3C33] border-l-4 border-green-300"
                : "hover:bg-[#2A3C33]"
            }`
          }
        >
          <User className="mr-3" size={20} />
          My Account
        </NavLink>

        <NavLink
          to="/seller/withdrawal"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive
                ? "bg-[#2A3C33] border-l-4 border-green-300"
                : "hover:bg-[#2A3C33]"
            }`
          }
        >
          <Wallet className="mr-3" size={20} />
          Withdrawal
        </NavLink>

        <NavLink
          to="/seller/withdrawal"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-lg transition-colors ${
              isActive
                ? "bg-[#2A3C33] border-l-4 border-green-300"
                : "hover:bg-[#2A3C33]"
            }`
          }
          onClick={async () => {
            await axios
              .post("/logout")
              .then(() => {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("role");
                toast.success("Logged out successfully");
                //time out for 0.5 seconds
                setTimeout(() => {
                  navigate("/login");
                  window.location.reload();
                }, 500);
              })
              .catch((error) => {
                console.error("Logout error:", error);
              });
          }}
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </NavLink>
      </nav>

      <div className="p-4 mt-auto">
        <div className="flex items-center gap-2">
          <Recycle size={24} className="text-green-300" />
          <span className="text-lg font-semibold">Trashure</span>
        </div>
        <p className="text-xs mt-2 text-gray-300">
          A sustainable e-commerce platform connecting eco-conscious buyers with
          high-quality, upcycled, and ethically sourced products.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
