import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import AuctionPage from "./pages/Auction";
import Profile from "./pages/Profile";
import SellerProfile from "./pages/SellerProfile";
import SellerLogin from "./pages/SellerLogin";
import BidderLogin from "./pages/BidderLogin";
import BidderRegister from "./pages/BidderRegister";
import SellerRegister from "./pages/SellerRegister";
import CreateProduct from "./Components/CreateProduct"; 
import Dashboard from "./pages/Dashboard";// Already imported, just verifying
import { useState } from "react";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { authenticated: false, role: null };
  });

  const ProtectedRoute = ({ element, allowedRole }) => {
    if (!user.authenticated) {
      return <Navigate to={allowedRole === "seller" ? "/seller/login" : "/bidder/login"} replace />;
    }
    if (allowedRole && user.role !== allowedRole) {
      return <Navigate to="/" replace />;
    }
    return element;
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auctions" element={<AuctionPage user={user} />} />
        <Route path="/bidder/login" element={<BidderLogin setUser={setUser} />} />
        <Route path="/seller/login" element={<SellerLogin setUser={setUser} />} />
        <Route path="/bidder/register" element={<BidderRegister setUser={setUser} />} />
        <Route path="/seller/register" element={<SellerRegister setUser={setUser} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile user={user} />} />} />
        <Route
          path="/sellerprofile"
          element={<ProtectedRoute element={<SellerProfile user={user} />} allowedRole="seller" />}
        />
        <Route
          path="/seller/create-product"
          element={<ProtectedRoute element={<CreateProduct user={user} />} allowedRole="seller" />}
        />
         <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;