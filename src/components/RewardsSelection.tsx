import React from "react";
import { Gift, Award, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const RewardsSection: React.FC = () => {
  return (
    <section className="mb-12 bg-gradient-to-br from-[#609966] to-[#40513B] text-white rounded-2xl p-4 md:p-8 m-4">
      <div className="container mx-auto px-2 py-2">
        <h2 className="text-3xl font-bold mb-4 text-left">
          Shop Smart, Earn Rewards!
        </h2>
        <p className="text-base mb-8 text-left font-small">
          Turn your shopping into a sustainable journey! Complete eco-friendly
          challenges and unlock exclusive rewards.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Earn GreenPoints */}
          <div className="flex items-start gap-4">
            <Leaf size={32} className="mt-1" />
            <div>
              <div className="font-bold text-base mb-1 flex items-center gap-2">
                Earn GreenPoints
              </div>
              <div className="text-sm font-small">
                Get points for every sustainable purchase
              </div>
            </div>
          </div>
          {/* Complete Challenges */}
          <div className="flex items-start gap-4">
            <Award size={32} className="mt-1" />
            <div>
              <div className="font-bold text-base mb-1 flex items-center gap-2">
                Complete Challenges
              </div>
              <div className="text-sm font-small">
                Participate in missions like &quot;Plastic-Free Warrior&quot;
              </div>
            </div>
          </div>
          {/* Claim Rewards */}
          <div className="flex items-start gap-4">
            <Gift size={32} className="mt-1" />
            <div>
              <div className="font-bold text-base mb-1 flex items-center gap-2">
                Claim Rewards
              </div>
              <div className="text-sm font-small">
                Redeem discounts, exclusive products, and more!
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <Link to="/green-game">
            <button className="bg-white text-[#40513B] font-bold py-3 px-10 rounded-full shadow-md hover:bg-gray-100 transition-all duration-200">
              Join Challenge
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
