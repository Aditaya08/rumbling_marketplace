import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    if (!isLogin && !formData.username) {
      setError("Username is required for signup.");
      return;
    }

    const role = isLogin ? "bidder" : "seller";
    setUser({
      authenticated: true,
      role: role,
    });
    navigate(role === "seller" ? "/sellerprofile" : "/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-cube cube-1"></div>
        <div className="floating-cube cube-2"></div>
        <div className="floating-cube cube-3"></div>
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md p-[4px] rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-2xl">
        <div className="bg-gray-800/90 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-purple-300 font-semibold mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
                  placeholder="Enter username"
                />
              </div>
            )}
            <div>
              <label className="block text-purple-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-purple-300 font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-semibold hover:bg-gradient-to-l transition-all duration-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-300">
            {isLogin ? "Need an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 ml-2 cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;