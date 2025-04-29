import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/seller/Sidebar";
import { AppProvider } from "../../context/AppContext";
import Header from "../../components/seller/Header";

const SellerLayout: React.FC = () => {
  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </AppProvider>
  );
};

export default SellerLayout;
