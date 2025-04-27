import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BidderRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/bidder/register", {
        username,
        email,
        password,
      });
      navigate("/bidder/login"); // Redirect to login after registration
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Bidder Registration</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default BidderRegister;