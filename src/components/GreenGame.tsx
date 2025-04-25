import React from "react";
import { Trophy, Leaf, Globe, Zap } from "lucide-react";

const GreenGame: React.FC = () => {
  const challenges = [
    {
      id: 1,
      title: "Plastic-Free Champion",
      description: "Buy 5 plastic-free products",
      points: 500,
      icon: <Leaf className="w-6 h-6" />,
      progress: 3,
      total: 5,
    },
    {
      id: 2,
      title: "Green Shopper Streak",
      description: "Make 3 eco-friendly purchases 3 months in a row",
      points: 550,
      icon: <Globe className="w-6 h-6" />,
      progress: 2,
      total: 3,
    },
    {
      id: 3,
      title: "Earth Month Hero",
      description: "Spend Rp500,000 on sustainable products during Earth Month",
      points: 750,
      icon: <Trophy className="w-6 h-6" />,
      progress: 0,
      total: 500000,
    },
    {
      id: 4,
      title: "Eco Rookie",
      description: "First sustainable purchase",
      points: 250,
      icon: <Zap className="w-6 h-6" />,
      progress: 0,
      total: 1,
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "Rp50,000 Voucher",
      points: 5000,
      description: "Minimum Spend Rp200,000",
    },
    {
      id: 2,
      title: "Free Shipping",
      points: 2000,
      description: "Minimum Spend Rp150,000",
    },
    {
      id: 3,
      title: "Exclusive Merchandise",
      points: 7500,
      description: "Get exclusive TreeStore merchandise",
    },
  ];

  const leaderboard = [
    { rank: 1, username: "PapaEarthSouth", points: 12451 },
    { rank: 2, username: "MrsGreenSaver", points: 11240 },
    { rank: 3, username: "EarthWarrior1994", points: 9180 },
    { rank: 4, username: "SustainableJoy", points: 7123 },
    { rank: 5, username: "GreenNinja", points: 6289 },
  ];

  return (
    <div className="min-h-screen bg-[#f3f7f2]">
      <div className="container mx-auto px-4 py-8">
        {/* Points Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-600 mb-1">My GreenPoints</h2>
              <div className="text-4xl font-bold text-[#2d4a29]">6,789</div>
            </div>
            <div className="flex gap-4">
              {[1, 2, 3].map((bag) => (
                <div
                  key={bag}
                  className={`w-16 h-16 rounded-lg ${
                    bag === 1
                      ? "bg-green-100"
                      : bag === 2
                      ? "bg-blue-100"
                      : "bg-amber-100"
                  } flex items-center justify-center`}
                >
                  <img
                    src={`https://via.placeholder.com/40x40/${
                      bag === 1 ? "4B6F44" : bag === 2 ? "4B6F88" : "8B6F44"
                    }/FFFFFF`}
                    alt={`Achievement ${bag}`}
                    className="w-10 h-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-[#2d4a29] mb-4">
            This Month's Top Eco-Warriors
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-black text-left">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-gray-600">Rank</th>
                  <th className="pb-3 text-gray-600">Username</th>
                  <th className="pb-3 text-gray-600 text-right">GreenPoints</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr
                    key={user.rank}
                    className="border-b last:border-0 border-gray-200"
                  >
                    <td className="py-3 font-medium">{user.rank}</td>
                    <td className="py-3">{user.username}</td>
                    <td className="py-3 text-right">
                      {user.points.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rewards */}
        <h2 className="text-xl font-bold text-[#2d4a29] mb-4">
          Redeem Your GreenPoints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-lg shadow-md p-6 text-left text-black"
            >
              <h3 className="font-bold text-lg mb-2">{reward.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {reward.points} Points
                </span>
                <button className="bg-[#4B6F44] text-white px-4 py-2 rounded-md hover:bg-[#3d5a37] transition-colors">
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Challenges */}
        <h2 className="text-xl font-bold text-[#2d4a29] mb-4">
          Join Eco-Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1 text-black">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {challenge.description}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (challenge.progress / challenge.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {challenge.progress} / {challenge.total}
                    </span>
                    <span className="font-medium text-green-600">
                      {challenge.points} GreenPoints
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreenGame;
