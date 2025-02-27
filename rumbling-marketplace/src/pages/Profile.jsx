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
    <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]  text-white flex flex-col items-center pt-52">
      <div className="relative p-[3px] rounded-lg bg-gradient-to-r from-blue-500 to-black">
        {/* Inner Card with Content */}
        <div className="w-full max-w-md bg-gradient-to-r from-blue-200 to-cyan-200 p-6 rounded-lg shadow-lg text-black text-xl font-light">
          {/* User Info */}
          <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>

          {/* Bidding History */}
          <h3 className="text-xl font-semibold mt-6 mb-3">Bidding History</h3>
          <div className="space-y-2 overflow-x-auto">
            {user.biddingHistory.map((bid, index) => (
              <div
                key={index}
                className="p-3 bg-gray-700 rounded-lg shadow-md flex justify-between"
              >
                <span>{bid.item}</span>
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
