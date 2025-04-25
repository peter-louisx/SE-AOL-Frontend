import React from "react";
import { Gift, Award, CreditCard } from "lucide-react";

const RewardsSection: React.FC = () => {
  return (
    <section className="mb-12 bg-[#4B6F44] text-white">
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Shop Smart, Earn Rewards!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center bg-[#3d5a37] p-6 rounded-lg">
            <Gift size={32} className="mb-3" />
            <h3 className="font-bold mb-2">Get points on every purchase</h3>
            <p className="text-sm text-center">
              Earn 1 point for every dollar spent. Redeem points for discounts.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-[#3d5a37] p-6 rounded-lg">
            <Award size={32} className="mb-3" />
            <h3 className="font-bold mb-2">Members-only promotions</h3>
            <p className="text-sm">
              Exclusive deals, early access to sales, and special events.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-[#3d5a37] p-6 rounded-lg">
            <CreditCard size={32} className="mb-3" />
            <h3 className="font-bold mb-2">Free shipping on orders $49+</h3>
            <p className="text-sm">
              Members receive complimentary shipping on qualifying orders.
            </p>
          </div>
        </div>

        <div className="mt-8 ">
          <button className="bg-white text-[#4B6F44] hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors transform hover:scale-105 duration-300">
            Join Now - It's Free!
          </button>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
