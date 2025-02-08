const ProductCard = ({ title, description, features, price, image }) => {
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
  
        {/* Price & CTA Button */}
        <div className="flex justify-between items-center">
          <span className="text-white text-lg font-semibold">${price}</span>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
            Buy Now
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;