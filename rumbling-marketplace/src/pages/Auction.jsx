import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../Components/ProductCard";
import axios from "axios"; // Add axios for cleaner requests

const AuctionPage = ({ user }) => { // Add user prop for auth state
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctionItems = async () => {
      if (!user?.authenticated) {
        setError("Please log in to view your auction listings");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Assuming token is stored here
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuctionItems(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || err.message || "Failed to fetch auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionItems();
  }, [user]);

  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col items-center p-6">
      {/* Page Title */}
      <motion.h1
        className="text-3xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Auction Listings
      </motion.h1>

      {/* Loading & Error Handling */}
      {loading && <p className="text-white">Loading auctions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Auction Grid */}
      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {auctionItems.map((item) => (
            <ProductCard
              key={item._id} // Use _id from MongoDB
              title={item.title}
              description={item.description}
              features={`Category: ${item.category} | Time Left: ${getTimeLeft(item.bidTimer)}`}
              currentBid={`$${item.currentBid}`}
              image={item.image}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

// Helper function to calculate time left
const getTimeLeft = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  if (diff <= 0) return "Ended";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export default AuctionPage;