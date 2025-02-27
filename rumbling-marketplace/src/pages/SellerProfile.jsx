import React, { useState } from "react";


function SellerProfile() {
    const[seller] = useState({
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
    })
    return(
        <div className="min-h-screen bg-gradient-to-r from-slate-900 to-zinc-100 text-white flex flex-col items-center pt-52">
        <div className="relative p-[3px] rounded-lg bg-gradient-to-r from-purple-500 to-pink-400">
          {/* Inner Card with Content */}
          <div className="w-full max-w-md bg-gradient-to-r from-purple-200 to-pink-200 p-6 rounded-lg shadow-lg text-black text-xl font-light">
            {/* Seller Info */}
            <h2 className="text-2xl font-semibold text-center mb-4">Seller Profile</h2>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Username:</span> {seller.username}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span> {seller.email}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Role:</span> {seller.role}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Total Sales:</span> {seller.totalSales}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Total Revenue:</span> {seller.totalRevenue}
              </p>
            </div>
  
            {/* Seller's Auction Listings */}
            <h3 className="text-xl font-semibold mt-6 mb-3">Active Listings</h3>
            <div className="space-y-2 overflow-x-auto">
              {seller.listings.map((listing, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-700 rounded-lg shadow-md flex justify-between"
                >
                  <span>{listing.item}</span>
                  <span className="font-semibold text-green-400">{listing.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

export default SellerProfile