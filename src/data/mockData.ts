import { Product, Order, SalesData } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Recycled Cotton Tote Bag',
    description: 'Handcrafted tote bag made from 100% recycled cotton.',
    price: 593835, // 35.99 * 16500
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
    price: 412335, // 24.99 * 16500
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
    price: 1484835, // 89.99 * 16500
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
    price: 989835, // 59.99 * 16500
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
    price: 494835, // 29.99 * 16500
    stock: 56,
    image: 'https://images.pexels.com/photos/6714941/pexels-photo-6714941.jpeg',
    status: 'active',
    category: 'Accessories',
    sustainabilityLabels: ['Biodegradable', 'Plastic-Free', 'Renewable Materials'],
    createdAt: new Date('2024-03-20'),
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-1',
    customerName: 'Emma Johnson',
    products: [
      {
        id: 'ITEM-1',
        productId: '1',
        name: 'Recycled Cotton Tote Bag',
        price: 593835, // 35.99 * 16500
        quantity: 2,
      },
      {
        id: 'ITEM-2',
        productId: '2',
        name: 'Bamboo Utensil Set',
        price: 412335, // 24.99 * 16500
        quantity: 1,
      },
    ],
    status: 'delivered',
    totalAmount: 1601005, // (593835 * 2) + 412335
    createdAt: new Date('2024-04-10'),
    shippingAddress: {
      street: '123 Green St',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA',
    },
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-2',
    customerName: 'Michael Chen',
    products: [
      {
        id: 'ITEM-3',
        productId: '3',
        name: 'Upcycled Denim Jacket',
        price: 1484835, // 89.99 * 16500
        quantity: 1,
      },
    ],
    status: 'processing',
    totalAmount: 1484835, // 1484835
    createdAt: new Date('2024-04-15'),
    shippingAddress: {
      street: '456 Eco Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA',
    },
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-3',
    customerName: 'Sophia Rodriguez',
    products: [
      {
        id: 'ITEM-4',
        productId: '4',
        name: 'Solar-Powered Phone Charger',
        price: 989835, // 59.99 * 16500
        quantity: 1,
      },
      {
        id: 'ITEM-5',
        productId: '5',
        name: 'Compostable Phone Case',
        price: 494835, // 29.99 * 16500
        quantity: 1,
      },
    ],
    status: 'pending',
    totalAmount: 1484670, // 989835 + 494835
    createdAt: new Date('2024-04-18'),
    shippingAddress: {
      street: '789 Sustainable Blvd',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
  },
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
