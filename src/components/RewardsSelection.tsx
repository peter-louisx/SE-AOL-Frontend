import React from "react";
<<<<<<< Updated upstream
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
=======
import { Leaf, Trophy, Gift } from "lucide-react";

const RewardsSection: React.FC = () => {
  return (
    <section className="mb-12 rounded-xl border-4  bg-gradient-to-r to-[#40513B] from-[#609963] text-white">
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold mb-2 text-left">
          Shop Smart, Earn Rewards!
        </h2>
        <p className="mb-6 text-left text-sm font-medium">
          Turn your shopping into a sustainable journey! Complete eco-friendly
          challenges and unlock exclusive rewards.
        </p>
        <div className="flex flex-col justify-between md:flex-row md:space-x-8 space-y-6 md:space-y-0 mb-8">
          <div className="flex items-start space-x-3">
            <Leaf size={24} className="mt-1" />
            <div>
              <div className="font-bold">Earn GreenPoints</div>
              <div className="text-xs">
>>>>>>> Stashed changes
                Get points for every sustainable purchase
              </div>
            </div>
          </div>
<<<<<<< Updated upstream
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
=======
          <div className="flex items-start space-x-3">
            <Trophy size={24} className="mt-1" />
            <div>
              <div className="font-bold">Complete Challenges</div>
              <div className="text-xs">
                Participate in missions like "Plastic-Free Warrior"
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Gift size={24} className="mt-1" />
            <div>
              <div className="font-bold">Claim Rewards</div>
              <div className="text-xs">
>>>>>>> Stashed changes
                Redeem discounts, exclusive products, and more!
              </div>
            </div>
          </div>
        </div>
<<<<<<< Updated upstream
        <div className="flex justify-start">
          <Link to="/green-game">
            <button className="bg-white text-[#40513B] font-bold py-3 px-10 rounded-full shadow-md hover:bg-gray-100 transition-all duration-200">
              Join Challenge
            </button>
          </Link>
        </div>
=======
        <button className="bg-white text-[#4B6F44] hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-md">
          Join Challenge
        </button>
>>>>>>> Stashed changes
      </div>
    </section>
  );
};

export default RewardsSection;
