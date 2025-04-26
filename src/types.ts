export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    status: string;
    category: string;
    sustainabilityLabels: string[];
    createdAt: Date;
  }
  
  export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    products: OrderProduct[];
    status: string;
    totalAmount: number;
    createdAt: Date;
    shippingAddress: Address;
  }
  
  export interface OrderProduct {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface SalesData {
    month: string;
    amount: number;
  }

  export const SustainabilityLabels = [
    "Biodegradable",
    "Plastic-Free",
    "Renewable Materials",
    "Low Carbon Footprint",
    "100% Recycled Materials",
    "Upcycled Materials",
    "Energy Efficient",
    "Cruelty-Free",
    "Zero Waste Packaging"
  ];