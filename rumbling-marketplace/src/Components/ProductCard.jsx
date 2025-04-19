const ProductCard = ({ 
  title, 
  description, 
  image, 
  currentBid, 
  bidTimer, 
  category,
  seller,
  _id, // MongoDB document ID
  userRole, // Current user's role
  userId   // Current user's ID
}) => {
  
  const isSeller = userRole === 'seller';
  const isProductOwner = userId === seller;
  
  // Function to format remaining time
  const formatRemainingTime = () => {
    if (!bidTimer) return "No timer set";
    
    const now = new Date();
    const end = new Date(bidTimer);
    const timeLeft = end - now;
    
    if (timeLeft <= 0) return "Auction Ended";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Define features based on category if not provided
  const getFeatures = () => {
    // You can customize this based on your categories
    switch(category) {
      case 'electronics':
        return ['High Quality', 'Authentic', 'Warranty Available'];
      case 'collectibles':
        return ['Limited Edition', 'Mint Condition', 'Certified Authentic'];
      case 'art':
        return ['Original Piece', 'Certificate of Authenticity', 'Direct from Artist'];
      default:
        return ['Quality Item', 'Verified Seller', 'Secure Transaction'];
    }
  };

  const features = getFeatures();

  return (
    <div className="relative flex flex-col gap-4 p-4 w-80 bg-gradient-to-br from-black via-gray-900 to-purple-800 rounded-xl shadow-xl transition-transform hover:scale-105">
      {/* Background border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 via-transparent to-purple-500 opacity-10 blur-md"></div>

      {/* Product Image */}
      <img
        src={image || "https://via.placeholder.com/300"}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Title & Description */}
      <div>
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      {/* Features List */}
      <ul className="flex flex-col gap-2 text-sm text-white">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Price, Timer & CTA Button - Conditional based on user role */}
      <div className="flex flex-col gap-2">
        {/* Show auction details for sellers who own this product */}
        {isSeller && isProductOwner ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Current Bid:</span>
              <span className="text-green-400 text-lg font-semibold">${currentBid}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Auction Ends:</span>
              <span className="text-purple-300 text-md">{formatRemainingTime()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Category:</span>
              <span className="text-purple-300 text-md capitalize">{category}</span>
            </div>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Edit Auction
            </button>
          </>
        ) : (
          <>
            {/* Show bidding options for bidders */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white text-sm">Current Bid:</div>
                <div className="text-white text-lg font-semibold">${currentBid}</div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm">Time Left:</div>
                <div className="text-purple-300 text-md">{formatRemainingTime()}</div>
              </div>
            </div>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Place Bid
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;