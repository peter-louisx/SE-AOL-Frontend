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
      description: "Get exclusive Trashure merchandise",
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
    <div className="min-h-screen">
      <div className="container mx-auto px-8 py-8">
        {/* Points Overview */}
        <div
          className="rounded-4xl shadow-md p-0 mb-8 flex items-stretch"
          style={{
            background: "linear-gradient(90deg, #EDF1D6 0%, #E4ECD7 100%)",
            minHeight: 220,
          }}
        >
          <div className="flex flex-col justify-center px-12 py-10 w-full md:w-1/2">
            <h2 className="text-xl md:text-2xl text-[#40513B] mb-2 font-medium">
              My GreenPoints
            </h2>
            <div className="text-6xl md:text-7xl font-extrabold text-[#40513B] mb-6 tracking-tight">
              6.789
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center w-1/2 bg-transparent">
            <img
              src="./src/assets/image.png"
              className="object-contain h-full max-h-120"
              style={{ marginRight: "2rem" }}
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-4xl mb-8 mt-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-2xl font-bold text-black mb-2 md:mb-0">
              This Month's Top Eco-Warriors
            </h2>
            <span className="text-base text-gray-700 text-right">
              You’re currently ranked{" "}
              <span className="font-bold">5th</span> out of 196.890 warriors.
            </span>
          </div>
          <div className="overflow-x-auto">
            <div
              className="rounded-3xl"
              style={{
                border: "3px solid #b7d3b0",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <table className="w-full text-black text-left">
                <thead>
                  <tr>
                    <th
                      className="py-3 px-6 text-[#444] font-bold bg-white border-b border-[#b7d3b0]"
                      style={{
                        borderRight: "1px solid #b7d3b0",
                      }}
                    >
                      Rank
                    </th>
                    <th
                      className="py-3 px-6 text-[#444] font-bold bg-white border-b border-[#b7d3b0]"
                      style={{
                        borderRight: "1px solid #b7d3b0",
                      }}
                    >
                      Username
                    </th>
                    <th className="py-3 px-6 text-[#444] font-bold text-right bg-white border-b border-[#b7d3b0]">
                      GreenPoints
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, idx) => (
                    <tr
                      key={user.rank}
                      style={{
                        borderBottom:
                          idx === leaderboard.length - 1
                            ? "none"
                            : "1px solid #b7d3b0",
                        background: "#fff",
                      }}
                    >
                      <td
                        className="py-3 px-6 font-medium"
                        style={{
                          color:
                            user.rank === 1
                              ? "#F4B400"
                              : user.rank === 2
                              ? "#888"
                              : user.rank === 3
                              ? "#A0521D"
                              : "#444",
                          fontWeight: user.rank <= 3 ? 700 : 400,
                          borderRight: "1px solid #b7d3b0",
                        }}
                      >
                        {user.rank}
                      </td>
                      <td
                        className="py-3 px-6"
                        style={{
                          borderRight: "1px solid #b7d3b0",
                        }}
                      >
                        {user.username}
                      </td>
                      <td className="py-3 px-6 text-right">
                        {user.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-4">
            Note: The top 3 warriors each month will receive exclusive Trashure
            merchandise.
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-[#9DC08B] p-8 rounded-4xl mt-20 mb-8">
          <h2 className="text-2xl font-bold mb-8">
            Redeem Your GreenPoints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-[#EDF1D6] rounded-2xl shadow-md p-6 text-left text-black"
              >
                <h3 className="font-bold text-lg mb-2">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {reward.points} GreenPoints
                  </span>
                  <button className="bg-[#609966] text-white px-4 py-2 rounded-lg hover:bg-[#40513B] transition-colors">
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <h2 className="text-2xl font-bold text-[#2d4a29] mb-4 mt-20">
          Join Eco-Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EDF1D6] rounded-lg text-[#609966]">
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
                      className="bg-[#609966] h-2 rounded-full"
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
                    <span className="font-medium text-[#609966]">
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
