import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../Components/ProductCard";

const AuctionPage = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch auctions");

        const data = await response.json();
        setAuctionItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionItems();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col items-center p-6">
      {/* Navigation */}
      <nav className="mb-6 flex justify-center space-x-6">
        {["Home", "Auctions", "Profile"].map((name, index) => (
          <NavLink key={index} to={`/${name.toLowerCase()}`} className="text-white hover:text-purple-400">
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Page Title */}
      <motion.h1 
        className="text-3xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Live Auctions
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
              key={item.id}
              title={item.title}
              description={item.description}
              features={`Category: ${item.category}`}
              currentBid={`$${item.price}`}
              image={item.image}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AuctionPage;
