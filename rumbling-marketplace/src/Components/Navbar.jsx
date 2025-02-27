import { useState } from "react";
import { NavLink } from "react-router-dom";

const pages = ["Home", "Auctions", "Profile"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black to-purple-800 p-4 rounded-b-2xl shadow-lg">
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wider font-mono">
          Rumbling Marketplace
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
  {pages.map((text, idx) => (
    <NavLink
      key={idx}
      to={`/${text.toLowerCase()}`}
      className={({ isActive }) =>
        `relative text-white text-lg font-semibold font-mono tracking-wider 
        overflow-hidden transition-transform duration-300 
        before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
        before:bg-white before:origin-left before:scale-x-0 
        hover:before:scale-x-100 
        hover:before:transition-transform before:duration-300 
        hover:translate-y-1 hover:text-gray-300 
        ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
      }
    >
      {text}
    </NavLink>
  ))}
</div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black bg-opacity-90 rounded-b-2xl shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-4">
            {pages.map((text, idx) => (
              <NavLink
                key={idx}
                to={text.toLowerCase()}
                className={({ isActive }) =>
                  `text-white text-lg font-semibold font-mono tracking-wider 
                  transition-transform duration-300 hover:text-gray-300 
                  ${isActive ? "text-purple-300" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {text}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
