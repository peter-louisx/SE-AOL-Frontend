import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Bamboo Bowl and Spoon",
    description: "Eco-friendly bamboo bowl and spoon set",
    brand: "Bambu Home",
    price: 50000,
    currency: "Rp",
    quantity: 1,
    image:
      "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    name: "Bamboo Bowl and Spoon",
    description: "Eco-friendly bamboo bowl and spoon set",
    brand: "Bambu Home",
    price: 50000,
    currency: "Rp",
    quantity: 1,
    image:
      "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    name: "Bamboo Bowl and Spoon",
    description: "Eco-friendly bamboo bowl and spoon set",
    brand: "Bambu Home",
    price: 50000,
    currency: "Rp",
    quantity: 1,
    image:
      "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    name: "Bamboo Bowl and Spoon",
    description: "Eco-friendly bamboo bowl and spoon set",
    brand: "Bambu Home",
    price: 50000,
    currency: "Rp",
    quantity: 1,
    image:
      "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

interface CartContextType {
  cartItems: CartItem[];
  selectedItems: string[];
  selectItem: (id: string) => void;
  selectAllItems: () => void;
  deselectAllItems: () => void;
  removeSelectedItems: () => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  isAllSelected: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Update selected items when cart items change
  useEffect(() => {
    setSelectedItems((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id))
    );
  }, [cartItems]);

  const selectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectAllItems = () => {
    setSelectedItems(cartItems.map((item) => item.id));
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const isAllSelected = () => {
    return cartItems.length > 0 && selectedItems.length === cartItems.length;
  };

  const removeSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        selectItem,
        selectAllItems,
        deselectAllItems,
        removeSelectedItems,
        removeItem,
        updateQuantity,
        getTotalPrice,
        isAllSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
