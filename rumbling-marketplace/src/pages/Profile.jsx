import { useState } from "react";

const Profile = () => {
  const [user] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    role: "bidder",
    biddingHistory: [
      { item: "Rare NFT", price: "$500" },
      { item: "Vintage Watch", price: "$1200" },
    ],
  });

  return (
    <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-lg p-[4px] rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-2xl animate-gradient-shift">
        {/* Inner Card */}
        <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:shadow-inner hover:bg-gray-800/95">
          {/* Profile Header */}
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse-slow">
            Profile
          </h2>

          {/* User Info */}
          <div className="space-y-3 text-lg">
            <p>
              <span className="font-semibold text-blue-300">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold text-blue-300">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold text-blue-300">Role:</span> {user.role}
            </p>
          </div>

          {/* Bidding History */}
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-cyan-300">Bidding History</h3>
          <div className="space-y-3">
            {user.biddingHistory.map((bid, index) => (
              <div
                key={index}
                className="p-4 bg-gray-700/80 rounded-lg shadow-md flex justify-between items-center transition-all duration-200 hover:scale-[1.02] hover:bg-gray-600/90 hover:shadow-lg"
              >
                <span className="text-white">{bid.item}</span>
                <span className="font-semibold text-green-400">{bid.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;