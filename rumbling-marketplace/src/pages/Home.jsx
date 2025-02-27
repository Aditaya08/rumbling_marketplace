import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen py-8 text-white px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <section className="text-center mt-16 md:mt-24 px-4">
        <NavLink to="/">
          <motion.h1
            className="pb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-500 cursor-pointer"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            Buy & Sell Anything. NFTs & Real Products!
          </motion.h1>
        </NavLink>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          The ultimate decentralized marketplace where you can bid, buy, and sell both NFTs and real-world products securely.
        </p>
        <NavLink to = "/auctions">
        <motion.button
          className="mt-6 bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl text-lg shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          Explore Marketplace
        </motion.button>
        </NavLink>
      </section>

      {/* Featured Listings */}
      <section className="mt-16 md:mt-24 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Featured Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {["NFT Art", "Gaming Console", "Digital Collectible"].map((item, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg md:text-xl font-semibold">{item}</h3>
              <p className="text-gray-400">Best price available now</p>
              <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                View Item
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-16 md:mt-24 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {["NFTs", "Electronics", "Gaming", "Fashion", "Art"].map((category) => (
            <motion.div
              key={category}
              className="bg-gray-700 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg shadow-md cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              {category}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us? */}
      <section className="mt-16 md:mt-24 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Why Choose Rumbling Marketplace?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[
            "Secure Blockchain Transactions",
            "AI-Powered Fraud Detection",
            "Seamless NFT & Product Listings",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg md:text-xl font-semibold">{feature}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 py-6 bg-gray-900 text-center">
        <p className="text-gray-400">© 2024 Rumbling Marketplace. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
