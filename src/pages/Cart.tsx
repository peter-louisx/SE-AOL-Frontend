import React, { useState } from "react";
import CartHeader from "../components/CartHeader";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart, CartProvider } from "../context/CartContext";
import Checkout from "../components/Checkout";
import CheckoutSuccess from "../components/CheckoutSuccess";

interface CartPageProps {
  onCheckout: () => void;
}

const Cart: React.FC<CartPageProps> = ({ onCheckout }) => {
  const { cartItems, loading } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-center mb-8">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <CartHeader />

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="py-8 text-center text-gray-500">
                <div className="flex flex-col gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="animate-pulse flex items-center gap-4 py-4"
                    >
                      <div className="bg-gray-200 rounded w-16 h-16" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="h-6 w-12 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => <CartItem key={item.id} item={item} />)
            ) : (
              <div className="py-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartSummary onCheckout={onCheckout} />
        </div>
      </div>
    </div>
  );
};

const CartPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "cart" | "checkout" | "success"
  >("cart");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <CartProvider>
      {currentPage === "cart" && (
        <Cart onCheckout={() => setCurrentPage("checkout")} />
      )}
      {currentPage === "checkout" && (
        <Checkout onSuccess={() => setCurrentPage("success")} />
      )}
      {currentPage === "success" && <CheckoutSuccess />}
    </CartProvider>
  );
};

export default CartPage;
