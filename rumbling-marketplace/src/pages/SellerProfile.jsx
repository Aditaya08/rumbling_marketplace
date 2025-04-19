import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { jwtDecode } from "jwt-decode";

function SellerProfile({ user }) { // Added user prop
  const [seller, setSeller] = useState({
    _id: "",
    username: "",
    email: "",
    role: "seller",
    totalSales: 0,
    totalRevenue: "$0",
  });

  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please log in");

        const decoded = jwtDecode(token);
        setSeller({
          _id: decoded.id,
          username: decoded.username || "Unknown",
          email: decoded.email || "Unknown",
          role: "seller",
          totalSales: 0,
          totalRevenue: "$0",
        });

        const productsResponse = await fetch("http://localhost:5000/api/products", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
        }

        const productsData = await productsResponse.json();
        setSellerProducts(productsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the product from state
      setSellerProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 text-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 text-white flex items-center justify-center">
        <div className="text-2xl font-bold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="relative w-full p-[3px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg mb-8">
          <div className="bg-gray-800 p-6 rounded-xl transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Seller Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              <div className="space-y-3">
                <p>
                  <span className="font-semibold text-purple-300">Username:</span> {seller.username}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Email:</span> {seller.email}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Role:</span> {seller.role}
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold text-purple-300">Total Sales:</span> {seller.totalSales}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Total Revenue:</span> {seller.totalRevenue}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seller's Auction Listings */}
        <h3 className="text-2xl font-semibold mt-8 mb-6 text-pink-300">Active Listings</h3>

        {sellerProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-xl">You don't have any active listings yet.</p>
            <p className="mt-2">Create your first auction to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {sellerProducts.map((product) => (
              <div key={product._id} className="relative">
                <ProductCard
                  {...product}
                  userRole={seller.role}
                  userId={seller._id}
                />
                <button
                  onClick={() => handleDelete(product._id)}
                  className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 hover:scale-105 transition-all font-semibold"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Listing Button */}
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all font-bold"
            onClick={() => (window.location.href = "/seller/create-product")}
          >
            + Add New Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;