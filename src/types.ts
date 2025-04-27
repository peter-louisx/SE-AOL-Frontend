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
    status: 'new' | 'in_progress' | 'shipped' | 'completed' | 'cancelled';
    totalAmount: number;
    createdAt: Date;
    responseDeadline: Date;
    shippingDeadline?: Date;
    estimatedArrival?: Date;
    actualArrival?: Date;
    shippingAddress: Address;
    receiptNumber?: string;
    trackingHistory?: TrackingEvent[];
  }
  
  export interface TrackingEvent {
    status: string;
    location: string;
    timestamp: Date;
    description: string;
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