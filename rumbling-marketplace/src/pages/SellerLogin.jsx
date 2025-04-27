import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerLogin = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    setError("Processing...");
    try {
      const res = await axios.post("http://localhost:5000/auth/seller/login", {
        email: formData.email,
        password: formData.password,
      });
      const userData = {
        authenticated: true,
        role: "seller",
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email,
      };
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); // Update parent state
      setError("Successfully logged in! Redirecting...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/sellerprofile");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-cube cube-1"></div>
        <div className="floating-cube cube-2"></div>
        <div className="floating-cube cube-3"></div>
      </div>
      <div className="relative z-10 w-full max-w-md p-[4px] rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-2xl">
        <div className="bg-gray-800/90 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Seller Login
          </h2>
          {error && (
            <p className="text-center mb-4 flex items-center justify-center">
              {error === "Processing..." ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <span className={error.includes("Success") ? "text-green-400" : "text-red-400"}>
                  {error}
                </span>
              )}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;