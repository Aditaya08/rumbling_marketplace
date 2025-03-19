import React, { useState } from "react";

function SellerProfile() {
  const [seller] = useState({
    username: "SellerPro",
    email: "sellerpro@example.com",
    role: "seller",
    totalSales: 15,
    totalRevenue: "$10,500",
    listings: [
      { item: "Luxury Watch", price: "$1500" },
      { item: "Crypto Punk NFT", price: "$3500" },
      { item: "Classic Car Model", price: "$5000" },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 text-white flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg p-[3px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
        {/* Inner Card */}
        <div className="bg-gray-800 p-6 rounded-xl transition-all duration-300 hover:shadow-2xl">
          {/* Seller Info */}
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Seller Profile
          </h2>
          <div className="space-y-3 text-lg">
            <p>
              <span className="font-semibold text-purple-300">Username:</span> {seller.username}
            </p>
            <p>
              <span className="font-semibold text-purple-300">Email:</span> {seller.email}
            </p>
            <p>
              <span className="font-semibold text-purple-300">Role:</span> {seller.role}
            </p>
            <p>
              <span className="font-semibold text-purple-300">Total Sales:</span> {seller.totalSales}
            </p>
            <p>
              <span className="font-semibold text-purple-300">Total Revenue:</span> {seller.totalRevenue}
            </p>
          </div>

          {/* Seller's Auction Listings */}
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-pink-300">Active Listings</h3>
          <div className="space-y-3">
            {seller.listings.map((listing, index) => (
              <div
                key={index}
                className="p-4 bg-gray-700 rounded-lg shadow-md flex justify-between items-center transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-600"
              >
                <span className="text-white">{listing.item}</span>
                <span className="font-semibold text-green-400">{listing.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;