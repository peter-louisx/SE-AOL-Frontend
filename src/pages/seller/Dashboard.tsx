import React from 'react';
import { useAppContext } from '../../context/AppContext';
import MetricCard from '../../components/seller/MetricCard';
import SalesChart from '../../components/seller/SalesChart';
import ActionButton from '../../components/seller/ActionButton';
import { DollarSign, ShoppingBag, Package, Plus, Eye } from 'lucide-react';
import { mockSalesData } from '../../data/mockData';

const SDashboard: React.FC = () => {
  const { orders } = useAppContext();
  
  // Calculate total sales from orders
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const formattedSales = `Rp${totalSales.toLocaleString('id-ID')}`;
  
  // Count pending orders
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-left">My Dashboard</h1>
      
      {/* Main metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Sales" 
          value={formattedSales} 
          icon={DollarSign} 
        />
        <MetricCard 
          title="Total Orders" 
          value={orders.length} 
          icon={ShoppingBag} 
        />
        <MetricCard 
          title="Pending Orders" 
          value={pendingOrders} 
          icon={Package} 
        />
      </div>
      
      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ActionButton 
          icon={Plus} 
          label="Add New Product" 
          to="/products" 
        />
        <ActionButton 
          icon={Eye} 
          label="View Orders" 
          to="/orders" 
        />
      </div>
      
      {/* Sales chart */}
      <SalesChart data={mockSalesData} />
    </div>
  );
};

export default SDashboard;