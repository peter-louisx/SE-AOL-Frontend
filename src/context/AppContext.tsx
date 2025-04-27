import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Product, Order } from '../types';
import { mockProducts, mockOrders } from '../data/mockData';
import { addMinutes } from 'date-fns';

interface AppContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProductStatus: (id: string, status: string) => void;
  updateOrderStatus: (id: string, status: 'cancelled' | 'new' | 'in_progress' | 'shipped' | 'completed', receiptNumber?: string) => void;
  acceptOrder: (orderId: string) => void;
  sendOrder: (orderId: string, receiptNumber: string) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Auto-cancel orders that exceed response deadline
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setOrders(prevOrders => 
  //       prevOrders.map(order => {
  //         if (order.status === 'new' && new Date() > new Date(order.responseDeadline)) {
  //           return { ...order, status: 'cancelled' };
  //         }
  //         if (order.status === 'in_progress' && order.shippingDeadline && new Date() > new Date(order.shippingDeadline)) {
  //           return { ...order, status: 'cancelled' };
  //         }
  //         return order;
  //       })
  //     );
  //   }, 60000); // Check every minute

  //   return () => clearInterval(interval);
  // }, []);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev =>
      prev.filter(product => product.id !== id)
    );
  };

  const updateProductStatus = (id: string, status: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, status } : product
      )
    );
  };

  const updateOrderStatus = (id: string, status: 'cancelled' | 'new' | 'in_progress' | 'shipped' | 'completed', receiptNumber?: string) => {
      setOrders(prev =>
        prev.map(order =>
          order.id === id
            ? {
                ...order,
                status,
                ...(receiptNumber && { receiptNumber }),
                ...(status === 'shipped' && {
                  estimatedArrival: addMinutes(new Date(), 24 * 60 * 7), // 7 days from now
                }),
              }
            : order
        )
      );
    };

  const acceptOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: 'in_progress',
              shippingDeadline: addMinutes(new Date(), 24 * 60 * 7), // 7 days to ship
            }
          : order
      )
    );
  };

  const sendOrder = (orderId: string, receiptNumber: string) => {
    updateOrderStatus(orderId, 'shipped', receiptNumber);
  };

  const completeOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: 'completed',
              actualArrival: new Date(),
            }
          : order
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
  };

  const value = {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStatus,
    updateOrderStatus,
    acceptOrder,
    sendOrder,
    completeOrder,
    cancelOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};