import React from "react";

export default function CheckoutSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen gap-12 font-montserrat">
      {/* Illustration */}
      <div className="flex flex-col items-center">
        {/* People and boxes illustration as image */}
        <img
          src="/successcheckout.png"
          alt="Order Success Illustration"
          className="w-[520px] h-[400px] object-contain"
        />
      </div>
      {/* Text and buttons */}
      <div className="text-black">
        <div className="font-bold text-3xl mb-6 font-montserrat">
          Your order is confirmed,
          <br />
          Thank You for Shopping!
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 border border-[#4B7A78] rounded-md bg-white text-[#4B7A78] font-medium cursor-pointer transition hover:bg-[#f0fdfa]"
            onClick={() => (window.location.href = "/orders")}
          >
            My Orders
          </button>
          <button
            className="px-4 py-2 rounded-md bg-[#4B7A78] text-white font-medium cursor-pointer transition hover:bg-[#37605e]"
            onClick={() => (window.location.href = "/shop")}
          >
            Shop Again
          </button>
        </div>
      </div>
    </div>
  );
}
