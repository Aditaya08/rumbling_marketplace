import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    basePrice: "",
    bidTimer: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please log in");

      // Format bidTimer as ISO string (e.g., "2025-04-03T12:00:00Z")
      const formattedData = {
        ...formData,
        basePrice: parseFloat(formData.basePrice), // Ensure number
        bidTimer: new Date(formData.bidTimer).toISOString(), // Convert to ISO
      };

      const response = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to create product");
      }

      const data = await response.json();
      setSuccess(data.msg);
      setFormData({ title: "", description: "", image: "", basePrice: "", bidTimer: "", category: "" }); // Reset form
      setTimeout(() => navigate("/seller-profile"), 2000); // Redirect after 2s
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-800 text-white p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full p-[3px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create New Product
          </h2>

          {loading && (
            <div className="text-center text-xl font-bold">Creating product...</div>
          )}
          {error && (
            <div className="text-center text-red-500 text-lg mb-4">{error}</div>
          )}
          {success && (
            <div className="text-center text-green-400 text-lg mb-4">{success}</div>
          )}

          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-purple-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 font-semibold mb-1">Base Price ($)</label>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 font-semibold mb-1">Bid End Time</label>
                <input
                  type="datetime-local"
                  name="bidTimer"
                  value={formData.bidTimer}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-purple-300 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all font-bold disabled:opacity-50"
                  disabled={loading}
                >
                  Create Product
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;