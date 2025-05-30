import React from "react";
import CartHeader from "../components/CartHeader";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import {
  useCart,
  CartItem as CartItemType,
  CartProvider,
} from "../context/CartContext";

const CartContent = () => {
  const { cartItems } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-center mb-8 text-black">
        My Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <CartHeader />

          <div className="divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item: CartItemType) => (
                <CartItem key={item.id} item={item} />
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
};

export default CartPage;
