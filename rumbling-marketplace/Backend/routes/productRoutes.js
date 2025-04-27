const express = require("express");
const Product = require("../models/Product.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify JWT and role
const auth = (role) => (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    if (role && decoded.role !== role) return res.status(403).json({ msg: "Access denied" });
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid", error: err.message });
  }
};

// Test route to confirm loading
router.get("/test", (req, res) => {
  res.json({ msg: "Product routes are working" });
});

// Get all products for the logged-in seller
router.get("/", auth("seller"), async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Create a product (seller only)
router.post("/create", auth("seller"), async (req, res) => {
  try {
    const { title, description, image, basePrice, bidTimer, category } = req.body;
    const product = new Product({
      title,
      description,
      image,
      currentBid: basePrice || 0,
      bidTimer: new Date(bidTimer),
      seller: req.user.id,
      category,
    });
    await product.save();
    res.json({ msg: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.delete("/:id", auth("seller"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Ensure only the seller can delete their own product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;