import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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

interface CartContextType {
  cartItems: CartItem[];
  selectedItems: string[];
  loading: boolean;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Update selected items when cart items change
  useEffect(() => {
    setSelectedItems((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id))
    );
  }, [cartItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/carts");
        setLoading(false);
        setCartItems(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error("Error fetching cart items");
        }
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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

  const removeItem = async (id: string) => {
    await axios
      .delete(`/delete-cart/${id}`)
      .then(() => {
        toast.success("Item removed from cart");
        setCartItems(cartItems.filter((item) => item.id !== id));
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error("Error removing item from cart");
        }
      });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    await axios
      .put(`/update-cart-quantity/${id}`, { quantity })
      .then(() => {
        toast.success("Cart item updated successfully");
        setCartItems(
          cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error("Error updating cart item");
        }
      });
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
        loading,
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
