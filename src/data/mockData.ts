import { Product, Order, SalesData, TrackingEvent } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Recycled Cotton Tote Bag',
    description: 'Handcrafted tote bag made from 100% recycled cotton.',
    price: 593835, 
    stock: 45,
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    status: 'active',
    category: 'Accessories',
    sustainabilityLabels: ['Biodegradable', 'Plastic-Free', 'Renewable Materials'],
    createdAt: new Date('2023-11-15'),
  },
  {
    id: '2',
    name: 'Bamboo Utensil Set',
    description: 'Reusable bamboo utensil set with carrying case.',
    price: 412335,
    stock: 78,
    image: 'https://images.pexels.com/photos/6249501/pexels-photo-6249501.jpeg',
    status: 'active',
    category: 'Zero-Waste Essentials',
    sustainabilityLabels: ['Biodegradable', 'Plastic-Free', 'Renewable Materials'],
    createdAt: new Date('2023-12-01'),
  },
  {
    id: '3',
    name: 'Upcycled Denim Jacket',
    description: 'Unique jacket made from upcycled denim materials.',
    price: 1484835, 
    stock: 12,
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
    status: 'active',
    category: 'Clothing and Apparel',
    sustainabilityLabels: ['Biodegradable', 'Plastic-Free', 'Renewable Materials'],
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '4',
    name: 'Solar-Powered Phone Charger',
    description: 'Portable solar panel for charging devices on the go.',
    price: 989835, 
    stock: 23,
    image: 'https://images.pexels.com/photos/6636336/pexels-photo-6636336.jpeg',
    status: 'active',
    category: 'Home & Living',
    sustainabilityLabels: ['Biodegradable', 'Plastic-Free', 'Renewable Materials'],
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    name: 'Compostable Phone Case',
    description: 'Biodegradable phone case made from plant-based materials.',
    price: 494835,
    stock: 56,
    image: 'https://images.pexels.com/photos/6714941/pexels-photo-6714941.jpeg',
    status: 'active',
    category: 'Accessories',
    sustainabilityLabels: ['Biodegradable', 'Plastic-Free', 'Renewable Materials'],
    createdAt: new Date('2024-03-20'),
  },
];

const mockTrackingEvents: TrackingEvent[] = [
  {
    status: 'Order Picked Up',
    location: 'Jakarta Warehouse',
    timestamp: new Date('2024-04-12T10:00:00'),
    description: 'Package has been picked up by courier',
  },
  {
    status: 'In Transit',
    location: 'Jakarta Sorting Center',
    timestamp: new Date('2024-04-15T14:30:00'),
    description: 'Package is being processed at sorting facility',
  },
  {
    status: 'Out for Delivery',
    location: 'Bandung Local Hub',
    timestamp: new Date('2024-04-20T08:00:00'),
    description: 'Package is out for delivery',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-23022025-12345789',
    customerId: 'CUST-1',
    customerName: 'Filbert Naldo Wijaya',
    products: [
      {
        id: 'ITEM-1',
        productId: '1',
        name: 'Coconut Bowl and Spoon',
        price: 100000,
        quantity: 2,
      }
    ],
    status: 'new',
    totalAmount: 100000,
    createdAt: new Date('2024-04-23'),
    responseDeadline: new Date('2024-04-30T23:59:00'),
    shippingAddress: {
      street: 'Jl. Merdeka No. 123',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zipCode: '12345',
      country: 'Indonesia',
    }
  },
  {
    id: 'ORD-23022025-12345790',
    customerId: 'CUST-2',
    customerName: 'Bernard Santosa',
    products: [
      {
        id: 'ITEM-2',
        productId: '2',
        name: 'Coconut Bowl and Spoon',
        price: 100000,
        quantity: 2,
      }
    ],
    status: 'in_progress',
    totalAmount: 100000,
    createdAt: new Date('2024-04-19'),
    responseDeadline: new Date('2024-04-26T23:59:00'),
    shippingDeadline: new Date('2024-05-03T23:59:00'),
    shippingAddress: {
      street: 'Jl. Sendirian No. 11',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zipCode: '12345',
      country: 'Indonesia',
    }
  },
  {
    id: 'ORD-23022025-12345791',
    customerId: 'CUST-3',
    customerName: 'Peter',
    products: [
      {
        id: 'ITEM-3',
        productId: '3',
        name: 'Coconut Bowl and Spoon',
        price: 100000,
        quantity: 2,
      }
    ],
    status: 'shipped',
    totalAmount: 100000,
    createdAt: new Date('2024-04-01'),
    responseDeadline: new Date('2024-04-08T23:59:00'),
    shippingDeadline: new Date('2024-04-15T23:59:00'),
    estimatedArrival: new Date('2024-04-28T23:59:00'),
    receiptNumber: 'TRK987654321',
    trackingHistory: mockTrackingEvents,
    shippingAddress: {
      street: 'Jl. Menyala No. 99',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zipCode: '12345',
      country: 'Indonesia',
    }
  },
  {
    id: 'ORD-23022025-12345792',
    customerId: 'CUST-4',
    customerName: 'Jason Oakley',
    products: [
      {
        id: 'ITEM-4',
        productId: '4',
        name: 'Coconut Bowl and Spoon',
        price: 100000,
        quantity: 2,
      }
    ],
    status: 'completed',
    totalAmount: 100000,
    createdAt: new Date('2024-04-01'),
    responseDeadline: new Date('2024-04-08T23:59:00'),
    shippingDeadline: new Date('2024-04-15T23:59:00'),
    estimatedArrival: new Date('2024-04-24T23:59:00'),
    actualArrival: new Date('2024-04-22T14:30:00'),
    receiptNumber: 'TRK987654321',
    trackingHistory: mockTrackingEvents,
    shippingAddress: {
      street: 'Jl. Bersama No. 45',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zipCode: '12345',
      country: 'Indonesia',
    }
  }
];

export const mockSalesData: SalesData[] = [
  { month: 'January', amount: 80600000 },
  { month: 'February', amount: 94550000 },
  { month: 'March', amount: 131750000 },
  { month: 'April', amount: 142600000 },
  { month: 'May', amount: 186000000 },
  { month: 'June', amount: 248000000 },
  { month: 'July', amount: 302250000 },
  { month: 'August', amount: 220100000 },
  { month: 'September', amount: 170500000 },
  { month: 'October', amount: 209250000 },
  { month: 'November', amount: 161200000 },
  { month: 'December', amount: 151900000 },
];
