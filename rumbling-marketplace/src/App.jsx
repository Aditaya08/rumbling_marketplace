import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from './pages/Home'
import AuctionPage from "./pages/Auction"
import Profile from "./pages/Profile"
import { useState } from "react"
import SellerProfile from "./pages/SellerProfile"

function App() {
  const[user, setUser] = useState({Authenticated: false,
    role: "seller"
  })


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<AuctionPage />} />

        if (!user.Authenticated) {
          <Route path = "/login" element = {<Profile />} />
          
        } else if(user.role == "seller"){
          <Route path = "/sellerprofile" element = {<SellerProfile />} />
        } else {
        <Route path = "/profile" element = {<Profile />} />
}


      </Routes>



    </Router>
  )
}

export default App
