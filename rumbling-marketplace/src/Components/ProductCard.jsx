import { motion } from "framer-motion";

const ProductCard = ({ title, description, features, currentBid, image }) => {
  return (
    <motion.div 
      className="bg-gray-800 rounded-xl shadow-lg p-4 text-white hover:shadow-purple-500 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <img src={image} alt={title} className="w-full h-40 object-contain rounded-lg" />

      {/* Product Details */}
      <h2 className="text-lg font-bold mt-3">{title}</h2>
      <p className="text-sm text-gray-300 mt-1 truncate">{description}</p>
      <p className="text-xs text-purple-400 mt-1">{features}</p>

      {/* Current Bid */}
      <p className="text-lg font-semibold text-green-400 mt-2">Current Bid: {currentBid}</p>

      {/* Bid Button */}
      <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition">
        Place Bid
      </button>
    </motion.div>
  );
};

export default ProductCard;


