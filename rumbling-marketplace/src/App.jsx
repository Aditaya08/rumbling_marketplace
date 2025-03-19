import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import AuctionPage from "./pages/Auction";
import Profile from "./pages/Profile";
import SellerProfile from "./pages/SellerProfile";
import Auth from "./pages/Auth"; // Assuming you'll add the Auth component here
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    authenticated: false, // Changed 'Authenticated' to 'authenticated' (lowercase convention)
    role: "seller", // Default role, could be null if not authenticated
  });

  // Protected route component to handle auth and role-based access
  const ProtectedRoute = ({ element, allowedRole }) => {
    if (!user.authenticated) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRole && user.role !== allowedRole) {
      return <Navigate to="/" replace />; // Redirect to home if role doesn't match
    }
    return element;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<AuctionPage />} />
        <Route path="/login" element={<Auth setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/sellerprofile"
          element={<ProtectedRoute element={<SellerProfile />} allowedRole="seller" />}
        />
      </Routes>
    </Router>
  );
}

export default App;