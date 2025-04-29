import { NavLink } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser({ authenticated: false, role: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Also clear token for consistency
  };

  const startStreamlitApp = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/start_streamlit_app", {
        method: "POST",
      });
      const data = await response.json();
      alert(data.message || "Streamlit app started!");
    } catch (error) {
      console.error("Error starting Streamlit app:", error);
      alert("Failed to start Streamlit app.");
    }
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
            before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
            before:bg-white before:origin-left before:scale-x-0 
            hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
            hover:translate-y-1 hover:text-gray-300 relative 
            ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/auctions"
          className={({ isActive }) =>
            `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
            before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
            before:bg-white before:origin-left before:scale-x-0 
            hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
            hover:translate-y-1 hover:text-gray-300 relative 
            ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
          }
        >
          Auctions
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
            before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
            before:bg-white before:origin-left before:scale-x-0 
            hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
            hover:translate-y-1 hover:text-gray-300 relative 
            ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <button
          onClick={startStreamlitApp}
          className="text-white text-lg font-semibold font-mono tracking-wider hover:text-gray-300"
        >
          Start Dashboard App
        </button>
      </div>

      <div className="space-x-6">
        {user.authenticated ? (
          <>
            {user.role === "bidder" && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
                  before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
                  before:bg-white before:origin-left before:scale-x-0 
                  hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
                  hover:translate-y-1 hover:text-gray-300 relative 
                  ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
                }
              >
                My Profile
              </NavLink>
            )}
            {user.role === "seller" && (
              <NavLink
                to="/sellerprofile"
                className={({ isActive }) =>
                  `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
                  before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
                  before:bg-white before:origin-left before:scale-x-0 
                  hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
                  hover:translate-y-1 hover:text-gray-300 relative 
                  ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
                }
              >
                Seller Profile
              </NavLink>
            )}
            <button
              onClick={handleLogout}
              className="text-white text-lg font-semibold font-mono tracking-wider hover:text-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/bidder/login"
              className={({ isActive }) =>
                `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
                before:bg-white before:origin-left before:scale-x-0 
                hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
                hover:translate-y-1 hover:text-gray-300 relative 
                ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
              }
            >
              Bidder Login
            </NavLink>
            <NavLink
              to="/seller/login"
              className={({ isActive }) =>
                `text-white text-lg font-semibold font-mono tracking-wider transition-transform duration-300 
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] 
                before:bg-white before:origin-left before:scale-x-0 
                hover:before:scale-x-100 hover:before:transition-transform before:duration-300 
                hover:translate-y-1 hover:text-gray-300 relative 
                ${isActive ? "text-purple-300 before:scale-x-100" : ""}`
              }
            >
              Seller Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;